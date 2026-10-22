<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\TagManager\tests\Fixtures;

use Piwik\Plugins\TagManager\Template\Trigger\PageViewTrigger;
use Piwik\Plugins\TagManager\Template\Trigger\WindowLoadedTrigger;

/**
 * Adds a container with entities whose types the UI test disables in the config, so they become unavailable
 * the same way as types of a plugin that is no longer active.
 */
class TagManagerUnavailableTypesUiFixture extends TagManagerFixture
{
    public $idContainerUnavailableTypes = 'aaacont8';

    public function setUpContainers()
    {
        parent::setUpContainers();

        $idSite = $this->idSite5;
        $idContainer = $this->idContainerUnavailableTypes;
        $this->addContainer($idSite, $idContainer, 'Container with unavailable types');
        $idContainerVersion = $this->getContainerDraftVersion($idSite, $idContainer);

        $idPageView = $this->addContainerTrigger($idSite, $idContainer, $idContainerVersion, PageViewTrigger::ID, 'Page view', []);
        $idWindowLoaded = $this->addContainerTrigger($idSite, $idContainer, $idContainerVersion, WindowLoadedTrigger::ID, 'Unavailable trigger', []);
        $this->addContainerVariable($idSite, $idContainer, $idContainerVersion, 'Constant', 'Unavailable variable', ['constantValue' => 'foo']);

        $this->addContainerTag($idSite, $idContainer, $idContainerVersion, 'CustomImage', 'Available tag', [$idPageView], [$idWindowLoaded], ['customImageSrc' => 'https://example.com/a.png']);
        $this->addContainerTag($idSite, $idContainer, $idContainerVersion, 'PingdomRUM', 'Unavailable tag', [$idPageView], [], ['pingdomROMId' => 'abc']);
    }
}
