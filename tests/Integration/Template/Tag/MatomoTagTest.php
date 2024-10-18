<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\TagManager\tests\Integration\Template\Tag;

use Piwik\API\Request;
use Piwik\Container\StaticContainer;
use Piwik\Plugins\TagManager\Context\WebContext;
use Piwik\Plugins\TagManager\TagManager;
use Piwik\Plugins\TagManager\Template\Tag\MatomoTag;
use Piwik\Plugins\TagManager\Template\Trigger\PageViewTrigger;
use Piwik\Plugins\TagManager\Template\Variable\MatomoConfigurationVariable;
use Piwik\Plugins\TagManager\tests\Framework\TestCase\IntegrationTestCase;
use Piwik\Tests\Framework\Fixture;

/**
 * @group TagManager
 * @group MatomoTag
 * @group MatomoTagTest
 * @group Plugins
 */
class MatomoTagTest extends IntegrationTestCase
{
    private $idSite;

    public function setUp(): void
    {
        parent::setUp();

        TagManager::$enableAutoContainerCreation = false;
        $this->idSite = Fixture::createWebsite('2014-01-02 03:04:05');
    }

    public function test_loadTemplate_getUnbundled()
    {
        $template = $this->createTag(false);
        $this->checkMatomoTagIsLoaded($template);

        // we must ensure this line exists as it will be replaced with tracker when bundled
        self::assertStringContainsString(MatomoTag::REPLACE_TRACKER_KEY, $template);
    }

    public function test_loadTemplate_getBundled()
    {
        $template = $this->createTag(true);

        $this->checkMatomoTagIsLoaded($template);

        // should have been replaced with Matomo code
        self::assertStringNotContainsString(MatomoTag::REPLACE_TRACKER_KEY, $template);
        // simple test to check tracker is included
        self::assertStringContainsString('loadMatomo', $template);
        self::assertStringContainsString('this.trackPageView=function(', $template);
        self::assertStringContainsString('findContentNodesWithinNode', $template);
    }

    private function checkMatomoTagIsLoaded($template)
    {
        self::assertStringContainsString('MatomoTag', $template);
        self::assertStringContainsString('loadMatomo', $template);
    }

    private function createTag($bundled)
    {
        $idContainer = Request::processRequest('TagManager.addContainer', array(
            'idSite' => $this->idSite,
            'name' => 'Foo', 'context' => WebContext::ID
        ));
        $container = Request::processRequest('TagManager.getContainer', array(
            'idSite' => $this->idSite,
            'idContainer' => $idContainer
        ));
        $draftVersion = $container['draft']['idcontainerversion'];
        $idTrigger = Request::processRequest('TagManager.addContainerTrigger', array(
            'idSite' => $this->idSite,
            'idContainer' => $idContainer,
            'idContainerVersion' => $draftVersion,
            'type' => PageViewTrigger::ID,
            'name' => 'MyTrigger'
        ));

        $variableName = 'MyConfig';
        $idVariable = Request::processRequest('TagManager.addContainerVariable', array(
            'idSite' => $this->idSite,
            'idContainer' => $idContainer,
            'idContainerVersion' => $draftVersion,
            'type' => MatomoConfigurationVariable::ID,
            'name' => $variableName,
            'parameters' => array(
                'bundleTracker' => (int) $bundled
            )
        ));

        Request::processRequest('TagManager.addContainerTag', array(
            'idSite' => $this->idSite,
            'idContainer' => $idContainer,
            'idContainerVersion' => $draftVersion,
            'type' => MatomoTag::ID,
            'name' => 'myTag',
            'fireTriggerIds' => array($idTrigger),
            'parameters' => array(
                MatomoTag::PARAM_MATOMO_CONFIG => '{{' . $variableName . '}}'
            )
        ));
        Request::processRequest('TagManager.enablePreviewMode', array(
            'idSite' => $this->idSite,
            'idContainer' => $idContainer
        ));

        $container = Request::processRequest('TagManager.getContainer', array(
            'idSite' => $this->idSite,
            'idContainer' => $idContainer
        ));

        $context = StaticContainer::get('Piwik\Plugins\TagManager\Context\WebContext');
        $content = $context->generate($container);

        foreach ($content as $file => $template) {
            // all other generated files would not contain the Matomo tag because no version was created
            if (strpos($file, 'preview') > 0) {
                return $template;
            }
        }
    }
}
