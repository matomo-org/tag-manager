<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 *
 */

namespace Piwik\Plugins\TagManager;

use Piwik\Plugins\TagManager\Template\Variable\MatomoConfigurationVariable;
use Piwik\Plugins\TagManager\UpdateHelper\NewVariableParameterMigrator;
use Piwik\Updater;
use Piwik\Updater\Migration;
use Piwik\Updater\Migration\Factory as MigrationFactory;
use Piwik\Updates as PiwikUpdates;

/**
 * Update for version 5.0.0-rc2.
 */
class Updates_5_0_0_rc2 extends PiwikUpdates
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
     * Return database migrations to be executed in this update.
     *
     * Database migrations should be defined here, instead of in `doUpdate()`, since this method is used
     * in the `core:update` command when displaying the queries an update will run. If you execute
     * migrations directly in `doUpdate()`, they won't be displayed to the user. Migrations will be executed in the
     * order as positioned in the returned array.
     *
     * @param Updater $updater
     * @return Migration\Db[]
     */
    public function getMigrations(Updater $updater)
    {
        return array(
        );
    }

    /**
     * Perform the incremental version update.
     *
     * This method should perform all updating logic. If you define queries in the `getMigrations()` method,
     * you must call {@link Updater::executeMigrations()} here.
     *
     * @param Updater $updater
     */
    public function doUpdate(Updater $updater)
    {
        $updater->executeMigrations(__FILE__, $this->getMigrations($updater));

        // Migrate the MatomoConfiguration type variables to all include the newly configured fields.
        $migrator = new NewVariableParameterMigrator(MatomoConfigurationVariable::ID, 'heartBeatTime', 15);
        $migrator->addField('referralCookieTimeOut', 182);
        $migrator->addField('sessionCookieTimeOut', 30);
        $migrator->addField('enableFileTracking', false);
        $migrator->addField('crossDomainLinkingTimeout', 180);
        $migrator->addField('cookieNamePrefix', 'pk');
        $migrator->addField('disablePerformanceTracking', false);
        $migrator->addField('trackingEndpointCustom', 'custom.php');
        $migrator->addField('jsEndpointCustom', 'custom.js');
        $migrator->addField('appendToTrackingUrl', '');
        $migrator->addField('forceRequestMethod', false);
        $migrator->addField('requestMethod', 'GET');
        $migrator->addField('requestContentType', 'application/x-www-form-urlencoded; charset=UTF-8');
        $migrator->addField('customRequestProcessing', '');
        $migrator->migrate();
    }
}
