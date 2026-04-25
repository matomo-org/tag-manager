<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\TagManager\tests\Fixtures;

use Piwik\Plugins\TagManager\Template\Variable\MatomoConfigurationVariable;

class TagManagerTagUiFixture extends TagManagerFixture
{
    public function setUpContainers()
    {
        parent::setupContainers();

        $this->addContainerVariable(
            $this->idSite2,
            $this->idContainer1,
            $this->idContainer1DraftVersion,
            MatomoConfigurationVariable::ID,
            'MyMatomoConfigVar',
            ['matomoUrl' => 'https://matomo.org', 'idSite' => $this->idSite2]
        );
    }
}
