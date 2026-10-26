<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 *
 */

namespace Piwik\Plugins\TagManager;

use Piwik\Updater;
use Piwik\Updater\Migration;
use Piwik\Updater\Migration\Factory as MigrationFactory;
use Piwik\Updates as PiwikUpdates;

class Updates_6_0_0_b8 extends PiwikUpdates
{
    /**
     * @var MigrationFactory
     */
    private $migration;

    public function __construct(MigrationFactory $factory)
    {
        $this->migration = $factory;
    }

    /**
     * @return Migration[]
     */
    public function getMigrations(Updater $updater)
    {
        return [
            $this->migration->db->addColumn(
                'tagmanager_container_version',
                'created_by',
                'VARCHAR(100) NULL DEFAULT NULL',
                'created_date'
            ),
        ];
    }

    public function doUpdate(Updater $updater): void
    {
        $updater->executeMigrations(__FILE__, $this->getMigrations($updater));
    }
}
