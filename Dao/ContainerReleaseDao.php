<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */
namespace Piwik\Plugins\TagManager\Dao;

use Piwik\Common;
use Piwik\Db;
use Piwik\DbHelper;
use Piwik\Plugins\TagManager\Model\Environment;

class ContainerReleaseDao extends BaseDao implements TagManagerDao
{
    protected $table = 'tagmanager_container_release';

    public function install()
    {
        DbHelper::createTable($this->table, "
                  `idcontainerrelease` BIGINT NOT NULL AUTO_INCREMENT,
                  `idcontainer` VARCHAR(8) NOT NULL,
                  `idcontainerversion` BIGINT UNSIGNED NOT NULL,
                  `idsite` int(11) UNSIGNED NOT NULL,
                  `status` VARCHAR(10) NOT NULL,
                  `environment` VARCHAR(" . Environment::MAX_LENGTH . ") NOT NULL,
                  `release_login` VARCHAR(100) NOT NULL,
                  `release_date` DATETIME NOT NULL,
                  `deleted_date` DATETIME NULL,
                  PRIMARY KEY(`idcontainerrelease`), KEY(`idsite`, `idcontainer`)");
    }

    public function releaseVersion($idSite, $idContainer, $idContainerVersion, $environment, $releaseLogin, $releaseDate)
    {
        $this->deleteAllVersionsForRelease($idSite, $idContainer, $environment, $releaseDate);

        $status = self::STATUS_ACTIVE;
        $values = array(
            'idcontainer' => $idContainer,
            'idcontainerversion' => $idContainerVersion,
            'idsite' => $idSite,
            'status' => $status,
            'environment' => $environment,
            'release_date' => $releaseDate,
            'release_login' => $releaseLogin
        );

        return $this->insertRecord($values);
    }

    /**
     * @return array
     */
    public function getAllReleases()
    {
        $table = $this->tablePrefixed;
        $releases = Db::fetchAll("SELECT * FROM $table" . ' ORDER BY idcontainerrelease ASC');

        return $this->enrichReleases($releases);
    }

    /**
     * @return array
     */
    public function getAllReleasedContainers()
    {
        $table = $this->tablePrefixed;
        $containerTable = Common::prefixTable('tagmanager_container');

        $sql = "SELECT crd.idcontainer, crd.idsite 
                FROM $table crd 
                LEFT JOIN $containerTable conr ON crd.idcontainer = conr.idcontainer 
                WHERE conr.`status` = ? and crd.`status` = ? group by crd.idsite, crd.idcontainer";

        $containers = Db::fetchAll($sql, array(self::STATUS_ACTIVE, self::STATUS_ACTIVE));

        return $containers;
    }

    /**
     * @param int $idSite
     * @param int $idContainer
     * @return array
     */
    public function getReleasesOfContainer($idSite, $idContainer)
    {
        $table = $this->tablePrefixed;
        $releases = Db::fetchAll("SELECT * FROM $table WHERE `status` = ? and idsite = ? and idcontainer = ? ORDER BY release_date ASC", array(self::STATUS_ACTIVE, $idSite, $idContainer));

        return $this->enrichReleases($releases);
    }

    /**
     * @param int $idSite
     * @param int $idContainer
     * @param int $idContainerVersion
     * @return array
     */
    public function getReleasesForContainerVersion($idSite, $idContainer, $idContainerVersion)
    {
        $table = $this->tablePrefixed;
        $bind = array(self::STATUS_ACTIVE, $idSite, $idContainer, $idContainerVersion);
        $releases = Db::fetchAll("SELECT * FROM $table WHERE `status` = ? and idsite = ? and idcontainer = ? and idcontainerversion = ? ORDER BY release_date ASC", $bind);

        return $this->enrichReleases($releases);
    }

    /**
     * @param int $idSite
     * @param int $idContainer
     * @param string $environment
     * @return array
     */
    public function getReleaseForContainerVersion($idSite, $idContainer, $environment)
    {
        $table = $this->tablePrefixed;
        $bind = array(self::STATUS_ACTIVE, $idSite, $idContainer, $environment);
        $release = Db::fetchRow("SELECT * FROM $table WHERE `status` = ? and idsite = ? and idcontainer = ? and environment = ?", $bind);

        return $this->enrichRelease($release);
    }

    /**
     * @param int $idSite
     * @param string $deletedDate
     */
    public function deleteAllVersionsForSite($idSite, $deletedDate)
    {
        $table = $this->tablePrefixed;

        $query = "UPDATE $table SET status = ?, deleted_date = ? WHERE idsite = ? and status != ?";
        $bind = array(self::STATUS_DELETED, $deletedDate, $idSite, self::STATUS_DELETED);

        Db::query($query, $bind);
    }

    /**
     * @param int $idSite
     * @param string $deletedDate
     */
    public function deleteAllVersionsForRelease($idSite, $idContainer, $environment, $deletedDate)
    {
        $query = sprintf("UPDATE %s SET status = ?, deleted_date = ? WHERE idsite = ? and idcontainer = ? and environment = ? and status != ?", $this->tablePrefixed);
        $bind = array(self::STATUS_DELETED, $deletedDate, $idSite, $idContainer, $environment, self::STATUS_DELETED);
        Db::query($query, $bind);
    }

    public function deleteNoLongerExistingEnvironmentReleases($availableEnvironments, $deletedDate)
    {
        $availableEnvironments[] = Environment::ENVIRONMENT_LIVE; // we make sure they are set as we never want to remove them
        $availableEnvironments[] = Environment::ENVIRONMENT_PREVIEW;
        $availableEnvironments = array_values(array_unique($availableEnvironments));

        $values = Common::getSqlStringFieldsArray($availableEnvironments);

        $query = sprintf("UPDATE %s SET status = ?, deleted_date = ? WHERE status != ? and environment not in (%s)", $this->tablePrefixed, $values);

        $bind = array(self::STATUS_DELETED, $deletedDate, self::STATUS_DELETED);
        foreach ($availableEnvironments as $availableEnvironment) {
            $bind[] = $availableEnvironment;
        }

        $query = Db::query($query, $bind);
        return $query->rowCount();
    }

    private function enrichReleases($releases)
    {
        if (empty($releases)) {
            return array();
        }

        foreach ($releases as $index => $release) {
            $releases[$index] = $this->enrichRelease($release);
        }

        return $releases;
    }

    private function enrichRelease($release)
    {
        if (empty($release)) {
            return $release;
        }

        $release['idcontainerrelease'] = (int) $release['idcontainerrelease'];
        $release['idcontainerversion'] = (int) $release['idcontainerversion'];
        $release['idsite'] = (int) $release['idsite'];

        return $release;
    }
}

