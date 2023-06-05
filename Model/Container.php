<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */
namespace Piwik\Plugins\TagManager\Model;

use Piwik\Container\StaticContainer;
use Piwik\Piwik;
use Piwik\Plugins\TagManager\Context\BaseContext;
use Piwik\Plugins\TagManager\Dao\ContainerReleaseDao;
use Piwik\Plugins\TagManager\Dao\ContainersDao;
use Piwik\Plugins\TagManager\Context\ContextProvider;
use Piwik\Plugins\TagManager\Dao\ContainerVersionsDao;
use Exception;
use Piwik\Plugins\TagManager\Input\Description;
use Piwik\Plugins\TagManager\Input\IdSite;
use Piwik\Plugins\TagManager\Input\Name;
use Piwik\Plugins\TagManager\Model\Container\ContainerIdGenerator;


class Container extends BaseModel
{

    /**
     * @var ContainersDao
     */
    private $dao;

    /**
     * @var ContextProvider
     */
    private $contextProvider;

    /**
     * @var ContainerVersionsDao
     */
    private $versionsDao;

    /**
     * @var ContainerReleaseDao
     */
    private $releasesDao;

    /**
     * @var ContainerIdGenerator
     */
    private $containerIdGenerator;

    /**
     * @var Environment
     */
    private $environment;

    public function __construct(ContainersDao $containersDao, ContainerVersionsDao $containerVersionsDao, ContainerReleaseDao $containerPublishesDao, ContextProvider $contextProvider, ContainerIdGenerator $containerIdGenerator, Environment $environment)
    {
        $this->dao = $containersDao;
        $this->versionsDao = $containerVersionsDao;
        $this->releasesDao = $containerPublishesDao;
        $this->contextProvider = $contextProvider;
        $this->containerIdGenerator = $containerIdGenerator;
        $this->environment = $environment;
    }

    public function getNumContainersTotal()
    {
        return $this->dao->getNumContainersTotal();
    }

    public function getNumContainersInSite($idSite)
    {
        return $this->dao->getNumContainersInSite($idSite);
    }

    public function enablePreviewMode($idSite, $idContainer, $idContainerVersion, $releaseLogin)
    {
        $idContainerRelease = $this->publishVersion($idSite, $idContainer, $idContainerVersion, Environment::ENVIRONMENT_PREVIEW, $releaseLogin);
        $this->generateContainer($idSite, $idContainer);
        return $idContainerRelease;
    }

    public function disablePreviewMode($idSite, $idContainer)
    {
        $date = $this->getCurrentDateTime();
        $this->releasesDao->deleteAllVersionsForRelease($idSite, $idContainer, Environment::ENVIRONMENT_PREVIEW, $date);
        $this->generateContainer($idSite, $idContainer);
    }

    public function generateContainerIfHasPreviewRelease($idSite, $idContainer)
    {
        $container = $this->getContainer($idSite, $idContainer);

        if (!empty($container['releases'])) {
            foreach ($container['releases'] as $release) {
                if ($release['environment'] === Environment::ENVIRONMENT_PREVIEW) {

                    // we only want to regenerate the containers if it has a preview enabled
                    $context = $this->contextProvider->getContext($container['context']);
                    if ($context) {
                        return $context->generate($container);
                    }
                }
            }
        }
    }

    public function hasPreviewRelease($idSite, $idContainer)
    {
        $release = $this->releasesDao->getReleaseForContainerVersion($idSite, $idContainer, Environment::ENVIRONMENT_PREVIEW);

        return !empty($release);
    }

    public function generateContainer($idSite, $idContainer)
    {
        $container = $this->getContainer($idSite, $idContainer);

        if (!empty($container)) {
            $context = $this->contextProvider->getContext($container['context']);
            if ($context) {
                return $context->generate($container);
            }
        }
    }

    public function getContainerInstallInstructions($idSite, $idContainer, $environment, $jsFramework = '')
    {
        $this->checkContainerExists($idSite, $idContainer);
        $this->environment->checkIsValidEnvironment($environment);

        $container = $this->dao->getContainer($idSite, $idContainer);

        if (!empty($container)) {
            $context = $this->contextProvider->getContext($container['context']);
            if ($context) {
                if ($jsFramework === 'react') {
                    return $context->getInstallInstructionsReact($container, $environment);
                }
                return $context->getInstallInstructions($container, $environment);
            }
        }
    }

    private function validateContainer($idSite, $name, $description)
    {
        $site = new IdSite($idSite);
        $site->check();

        $name = new Name($name);
        $name->check();

        $description = new Description($description);
        $description->check();
    }

    public function addContainer($idSite, $context, $name, $description)
    {
        $this->validateContainer($idSite, $name, $description);
        $this->contextProvider->checkIsValidContext($context);

        $createdDate = $this->getCurrentDateTime();

        $idContainer = $this->containerIdGenerator->generateId();

        $this->dao->createContainer($idSite, $idContainer, $context, $name, $description, $createdDate);

        $this->versionsDao->createDraftVersion($idSite, $idContainer, $createdDate);

        $this->generateContainer($idSite, $idContainer);

        return $idContainer;
    }

    public function updateContainer($idSite, $idContainer, $name, $description)
    {
        $this->validateContainer($idSite, $name, $description);

        $columns = array(
            'name' => $name,
            'description' => $description
        );
        $this->updateContainerColumns($idSite, $idContainer, $columns);
        $this->generateContainer($idSite, $idContainer);
    }

    public function checkContainerExists($idSite, $idContainer)
    {
        $container = $this->dao->getContainer($idSite, $idContainer);

        if (empty($container)) {
            throw new Exception(Piwik::translate('TagManager_ErrorContainerDoesNotExist', $idContainer));
        }
    }

    public function getContainers($idSite)
    {
        $containers = $this->dao->getContainersForSite($idSite);
        return $this->enrichContainers($containers);
    }

    public function deleteContainer($idSite, $idContainer)
    {
        $deletedDate = $this->getCurrentDateTime();
        $this->dao->deleteContainer($idSite, $idContainer, $deletedDate);

        // we remove them to no longer expose any information to any user/visitor, as a Matomo user would assume the
        // data has been removed
        BaseContext::removeAllContainerFiles($idContainer);
    }

    public function getContainer($idSite, $idContainer)
    {
        $container = $this->dao->getContainer($idSite, $idContainer);

        return $this->enrichContainer($container);
    }

    public function checkContainerVersionExists($idSite, $idContainer, $idContainerVersion)
    {
        $this->checkContainerExists($idSite, $idContainer);

        $version = $this->versionsDao->getVersion($idSite, $idContainer, $idContainerVersion);

        if (empty($version)) {
            throw new Exception(Piwik::translate('TagManager_ErrorContainerVersionDoesNotExist'));
        }
    }

    public function createContainerVersion($idSite, $idContainer, $idContainerVersion, $name, $description)
    {
        $this->checkContainerVersionExists($idSite, $idContainer, $idContainerVersion);
        $this->validateContainerVersion($idSite, $name, $description);
        $createdDate = $this->getCurrentDateTime();

        // create a new version
        $newIdContainerVersion = $this->versionsDao->createVersion($idSite, $idContainer, $name, $description, $createdDate);

        // we need to use staticContainer and not in constructor as they would require each other in the constructor and result in a loop
        $export = $this->getExport();
        $exported = $export->exportContainerVersion($idSite, $idContainer, $idContainerVersion);
        $import = StaticContainer::get('Piwik\Plugins\TagManager\API\Import');
        $import->importContainerVersion($exported, $idSite, $idContainer, $newIdContainerVersion);

        return $newIdContainerVersion;
    }

    public function updateContainerVersion($idSite, $idContainer, $idContainerVersion, $name, $description)
    {
        $this->validateContainerVersion($idSite, $name, $description);

        $columns = array(
            'name' => $name,
            'description' => $description,
            'updated_date' => $this->getCurrentDateTime()
        );
        $this->versionsDao->updateContainerColumns($idSite, $idContainer, $idContainerVersion, $columns);
        $this->generateContainer($idSite, $idContainer);
    }

    public function deleteContainerVersion($idSite, $idContainer, $idContainerVersion)
    {
        $version = $this->getContainerVersion($idSite, $idContainer, $idContainerVersion);
        if (!empty($version)) {
            if (empty($version['revision'])) {
                throw new Exception(Piwik::translate('TagManager_ErrorVersionCannotBeDeleted', Piwik::translate('TagManager_Draft')));
            }
            if (!empty($version['releases'])) {
                throw new Exception(Piwik::translate('TagManager_ErrorVersionCannotBeDeletedAsPublished'));
            }
            $this->versionsDao->deleteVersion($idSite, $idContainerVersion, $this->getCurrentDateTime());
        }
    }

    /**
     * @param $idSite
     * @param $idContainer
     * @param $idContainerVersion
     * @return array|bool
     */
    public function getContainerVersion($idSite, $idContainer, $idContainerVersion)
    {
        $version = $this->versionsDao->getVersion($idSite, $idContainer, $idContainerVersion);

        return $this->enrichContainerVersion($version);
    }

    public function getContainerVersions($idSite, $idContainer)
    {
        $versions = $this->versionsDao->getVersionsOfContainer($idSite, $idContainer);

        return $this->enrichContainerVersions($versions);
    }

    public function checkContainerReleaseExists($idSite, $idContainer, $environment)
    {
        $this->checkContainerExists($idSite, $idContainer);

        $release = $this->releasesDao->getReleaseForContainerVersion($idSite, $idContainer, $environment);

        if (empty($release)) {
            throw new Exception(Piwik::translate('TagManager_ErrorContainerReleaseDoesNotExist'));
        }
    }

    public function publishVersion($idSite, $idContainer, $idContainerVersion, $environment, $releaseLogin)
    {
        $this->checkContainerVersionExists($idSite, $idContainer, $idContainerVersion);
        // there is on purpose no validation for environment name as it may be used with eg preview etc.

        $publishDate = $this->getCurrentDateTime();
        $idContainerRelease = $this->releasesDao->releaseVersion($idSite, $idContainer, $idContainerVersion, $environment, $releaseLogin, $publishDate);
        $this->generateContainer($idSite, $idContainer);
        return $idContainerRelease;
    }

    private function validateContainerVersion($idSite, $versionName, $versionDescription)
    {
        $site = new IdSite($idSite);
        $site->check();

        $name = new Name($versionName);
        $name->check();

        $description = new Description($versionDescription);
        $description->check();
    }

    public function getAllReleasedContainers()
    {
        $containers = $this->releasesDao->getAllReleasedContainers();
        foreach ($containers as $index => $container) {
            $containers[$index]['idsite'] = (int) $container['idsite'];
        }
        return $containers;
    }

    public function getActiveContainersInfo()
    {
        $containers = $this->dao->getActiveContainersInfo();
        foreach ($containers as $index => $container) {
            $containers[$index]['idsite'] = (int) $container['idsite'];
        }
        return $containers;
    }

    private function updateContainerColumns($idSite, $idContainer, $columns)
    {
        if (!isset($columns['updated_date'])) {
            $columns['updated_date'] = $this->getCurrentDateTime();
        }
        $this->dao->updateContainerColumns($idSite, $idContainer, $columns);
    }

    /**
     * @return \Piwik\Plugins\TagManager\API\Export
     */
    private function getExport()
    {
        return StaticContainer::get('Piwik\Plugins\TagManager\API\Export');
    }

    private function enrichContainers($containers)
    {
        if (empty($containers)) {
            return array();
        }

        foreach ($containers as $index => $container) {
            $containers[$index] = $this->enrichContainer($container);
        }

        return $containers;
    }

    private function enrichContainer($container)
    {
        if (empty($container)) {
            return $container;
        }

        $container['created_date_pretty'] = $this->formatDate($container['created_date'], $container['idsite']);
        $container['updated_date_pretty'] = $this->formatDate($container['updated_date'], $container['idsite']);
        unset($container['deleted_date']);
        $container['versions'] = $this->versionsDao->getVersionsOfContainer($container['idsite'], $container['idcontainer']);
        $container['versions'] = $this->enrichContainerVersions($container['versions'], false);
        $container['releases'] = $this->releasesDao->getReleasesOfContainer($container['idsite'], $container['idcontainer']);
        $container['releases'] = $this->enrichContainerReleases($container['releases']);
        $container['draft'] = $this->versionsDao->getDraftVersion($container['idsite'], $container['idcontainer']);
        $container['draft'] = $this->enrichContainerVersion($container['draft'], false);
        $container = $this->mixinSetVersionsAndReleases($container);

        return $container;
    }

    private function mixinSetVersionsAndReleases($container)
    {
        foreach ($container['versions'] as $index => $version) {
            $container['versions'][$index]['environments'] = array();
        }

        foreach ($container['releases'] as &$release) {
            $release['version_name'] = '';
            foreach ($container['versions'] as &$version) {
                if ($release['idcontainerversion'] === $version['idcontainerversion']) {
                    $release['version_name'] = $version['name'];
                    $version['environments'][] = $release['environment'];
                }
            }
        }
        return $container;
    }

    private function enrichContainerVersions($containerVersions, $fetchReleases = true)
    {
        if (empty($containerVersions)) {
            return array();
        }

        foreach ($containerVersions as $index => $containerVersion) {
            $containerVersions[$index] = $this->enrichContainerVersion($containerVersion, $fetchReleases);
        }

        return $containerVersions;
    }

    private function enrichContainerVersion($containerVersion, $fetchReleases = true)
    {
        if (empty($containerVersion)) {
            return $containerVersion;
        }

        $containerVersion['created_date_pretty'] = $this->formatDate($containerVersion['created_date'], $containerVersion['idsite']);
        $containerVersion['updated_date_pretty'] = $this->formatDate($containerVersion['updated_date'], $containerVersion['idsite']);
        unset($containerVersion['deleted_date']);
        if ($fetchReleases) {
            $containerVersion['releases'] = $this->releasesDao->getReleasesForContainerVersion($containerVersion['idsite'], $containerVersion['idcontainer'], $containerVersion['idcontainerversion']);
            $containerVersion['releases'] = $this->enrichContainerReleases($containerVersion['releases']);
        }

        return $containerVersion;
    }

    private function enrichContainerReleases($containerReleases)
    {
        if (empty($containerReleases)) {
            return array();
        }

        foreach ($containerReleases as $index => $containerRelease) {
            $containerReleases[$index] = $this->enrichContainerRelease($containerRelease);
        }

        return $containerReleases;
    }

    private function enrichContainerRelease($containerRelease)
    {
        if (empty($containerRelease)) {
            return $containerRelease;
        }

        $containerRelease['release_date_pretty'] = $this->formatDate($containerRelease['release_date'], $containerRelease['idsite']);
        unset($containerRelease['deleted_date']);

        return $containerRelease;
    }
}

