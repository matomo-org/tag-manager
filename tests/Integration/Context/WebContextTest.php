<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\TagManager\tests\Integration\Context;

use Piwik\API\Request;
use Piwik\Container\StaticContainer;
use Piwik\Piwik;
use Piwik\Plugins\TagManager\Context\WebContext;
use Piwik\Plugins\TagManager\Model\Container;
use Piwik\Plugins\TagManager\Template\Variable\MatomoConfigurationVariable;
use Piwik\Plugins\TagManager\tests\Framework\TestCase\IntegrationTestCase;
use Piwik\Tests\Framework\Fixture;

/**
 * @group TagManager
 * @group WebContextx
 * @group WebContextTest
 * @group Plugins
 */
class WebContextTest extends IntegrationTestCase
{
    private $idSite;
    public function setUp(): void
    {
        parent::setUp();

        $this->idSite = Fixture::createWebsite('2014-01-01 02:03:04');
    }

    private function setupContainerWithRecursion($enablePreviewMode)
    {
        $idContainer = Request::processRequest(
            'TagManager.addContainer',
            [
                'idSite' => $this->idSite,
                'context' => WebContext::ID,
                'name' => 'test'
            ]
        );

        if ($enablePreviewMode) {
            Request::processRequest(
                'TagManager.enablePreviewMode',
                array(
                    'idSite' => $this->idSite,
                    'idContainer' => $idContainer,
                ),
                $default = []
            );
        }

        $containers = StaticContainer::get(Container::class);
        $containerVersion = $containers->getContainer($this->idSite, $idContainer);
        $idContainerVersion = null;
        if (!empty($containerVersion['draft']['idcontainerversion'])) {
            $idContainerVersion =  $containerVersion['draft']['idcontainerversion'];
        }
        Request::processRequest(
            'TagManager.addContainerVariable',
            array(
                'idSite' => $this->idSite,
                'idContainer' => $idContainer,
                'idContainerVersion' => $idContainerVersion,
                'type' => MatomoConfigurationVariable::ID,
                'name' => Piwik::translate('TagManager_MatomoConfigurationVariableName'),
                'parameters' => ['matomoUrl' => 'https://matomo.org{{Matomo Configuration}}']
            ),
            $default = []
        );

        return $idContainer;
    }

    public function test_detectsRecursion_whenPreviewModeEnabled()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('It seems an entity references itself or a recursion is caused in some other way. It may be related due to these entites: "Matomo Configuration"');

        $this->setupContainerWithRecursion($enablePreviewMode = true);
    }

    public function test_detectsRecursion_whenPreviewModeNotEnabled()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('It seems an entity references itself or a recursion is caused in some other way. It may be related due to these entites: "Matomo Configuration"');

        $this->setupContainerWithRecursion($enablePreviewMode = false);
    }

}
