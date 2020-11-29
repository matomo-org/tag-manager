<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */
namespace Piwik\Plugins\TagManager\Context;

use Piwik\Common;
use Piwik\Container\StaticContainer;
use Piwik\Piwik;
use Piwik\SettingsPiwik;

class AMPContext extends WebContext
{
    const ID = 'amp';

    public function getId()
    {
        return self::ID;
    }

    public function getName()
    {
        return 'AMP';
    }

    public function getOrder()
    {
        return 15;
    }

    public function generate($container)
    {
        return parent::generate($container);

        // HERE YOU COULD OTHERWISE GENERATE/CUSTOMISE THE OUTPUT.... EG SIMILAR TO WebContext::generate
        $filesCreated = array();
        foreach ($container['releases'] as $release) {
            $containerJs = $this->generatePublicContainer($container, $release);
            $path = $this->getJsTargetPath($container['idsite'], $container['idcontainer'], $release['environment'], $container['created_date']);

            $filesCreated[$path] = json_encode($containerJs);
            $this->storage->save(PIWIK_DOCUMENT_ROOT. $path, $filesCreated[$path]);
        }
        return $filesCreated;
    }

    public function getJsTargetPath($idSite, $idContainer, $environment, $containerCreatedDate)
    {
        return parent::getJsTargetPath($idSite, $idContainer, $environment, $containerCreatedDate) . '.json';
    }

    public function getInstallInstructions($container, $environment)
    {
        $path = $this->getWebPathForRelease($container['idsite'], $container['idcontainer'], $environment, $container['created_date']);

        $embedCode = <<<INST
<!-- Matomo Tag Manager -->
<script type="text/javascript">
var _mtm = window._mtm = window._mtm || [];
_mtm.push({'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start'});
var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
g.type='text/javascript'; g.async=true; g.src='$path'; s.parentNode.insertBefore(g,s);
</script>
<!-- End Matomo Tag Manager -->
INST;

        return [[
            'description' => Piwik::translate('TagManager_ContextWebInstallInstructions', array('"<head>"')),
            'embedCode' => $embedCode,
            'helpUrl' => 'https://developer.matomo.org/guides/tagmanager/embedding'
        ]];
    }


    private function getWebPathForRelease($idSite, $idContainer, $environment, $containerCreatedDate)
    {
        $domain = SettingsPiwik::getPiwikUrl();
        if (Common::stringEndsWith($domain, '/')) {
            $domain = Common::mb_substr($domain, 0, -1);
        }

        $path = $this->getJsTargetPath($idSite, $idContainer, $environment, $containerCreatedDate);

        $storagePath = StaticContainer::get('TagManagerContainerStorageDir') . '/';
        $webPath = StaticContainer::get('TagManagerContainerWebDir') . '/';
        $path = str_replace($storagePath, $webPath, $path);

        return $domain . $path;
    }
}
