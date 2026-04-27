<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\TagManager\tests\Fixtures;

class TagManagerNoTrackingFixture extends TagManagerFixture
{
    /**
     * Override the parent class because we don't want the site to have any tracked requests
     */
    public function setUp(): void
    {
        $this->setUpWebsite();
        $this->setUpContainers();

        // Keep this fixture aligned with TagManagerFixture so UI requests do not
        // get redirected to CoreUpdater when running the empty-site specs.
        self::updateDatabase();
    }
}
