<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 *
 */

namespace Piwik\Plugins\TagManager;

use Piwik\Plugins\TagManager\Template\Tag\MatomoTag;
use Piwik\Plugins\TagManager\Template\Variable\MatomoConfigurationVariable;
use Piwik\Plugins\TagManager\Updates\NewVariableParameterMigrator;
use Piwik\Updater;
use Piwik\Updates as PiwikUpdates;

/**
 * Update for version 4.12.4-b1.
 */
class Updates_4_12_4_b3 extends PiwikUpdates
{
    public function doUpdate(Updater $updater)
    {
        $migrator = new NewTagParameterMigrator(MatomoTag::ID, 'customUrlRef');
        $migrator->migrate();
    }
}
