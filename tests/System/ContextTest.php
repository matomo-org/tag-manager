<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */
namespace Piwik\Plugins\TagManager\tests\System;

use Piwik\API\Request;
use Piwik\Container\StaticContainer;
use Piwik\Piwik;
use Piwik\Plugins\TagManager\Context\BaseContext;
use Piwik\Plugins\TagManager\Context\BaseContext\TemplateLocator;
use Piwik\Plugins\TagManager\Context\WebContext;
use Piwik\Plugins\TagManager\Model\Environment;
use Piwik\Plugins\TagManager\Model\Salt;
use Piwik\Plugins\TagManager\tests\Fixtures\TagManagerFixture;
use Piwik\Tests\Framework\TestCase\SystemTestCase;
use Piwik\Version;

class TestJavaScriptTagManagerLoader extends WebContext\JavaScriptTagManagerLoader {

    public function getJavaScriptContent()
    {
        return <<<CONTENT
        /*!! previewModeHook */
        var content = 'foobar';
        /*!! initContainerHook */        
CONTENT;
    }
}

class TestTemplateLocator extends TemplateLocator {

    public function getLoadedTemplates()
    {
        $templates = parent::getLoadedTemplates();
        $return = array();
        foreach ($templates as $methodName => $methodContent) {
            if ($methodName === 'CustomHtmlTag') {
                $return[$methodName] = $methodContent;
            } else {
                // for all except custom html we change the content so the tests won't fail each time we change a
                // template. we still keep the original content for CustomHTML to make sure it works.
                $return[$methodName] = 'function () { var x = 1; }';
            }
        }

        return $return;
    }

}

class TestContext extends WebContext{
    public function parameterToVariableJs($value, $container)
    {
        return parent::parameterToVariableJs($value, $container);
    }
}

/**
 * @group TagManager
 * @group ContextTest
 * @group Plugins
 */
class ContextTest extends SystemTestCase
{
    /**
     * @var TagManagerFixture
     */
    public static $fixture = null; // initialized below class definition

    public function setUp(): void
    {
        parent::setUp();
        BaseContext::removeAllFilesOfAllContainers();
    }

    /**
     * @param $in
     * @param $expected
     * @dataProvider getParameterToVariableJsProvider
     */
    public function test_parameterToVariableJs($expected, $in)
    {
        $container = $this->getContainer();
        $container['idcontainerversion'] = self::$fixture->idContainer1DraftVersion;
        $context = StaticContainer::get('Piwik\Plugins\TagManager\tests\System\TestContext');

        $multiVar = $context->parameterToVariableJs($in, $container);

        $this->assertEquals($expected, $multiVar);
    }

    public function getParameterToVariableJsProvider()
    {
        $tests = array();

        // ManyVariablesNoneExist
        $example = '<script>var seoMetaDescriptionIsTooLong = "";
var seoMetaDescriptionIsTooShort = "{{seoMetaDescriptionIsTooShort}}";
var seoMetaDescriptionIsMissing = "{{seoMeta}}{{seoMetaDescriptionIsTooShort}}";
var seoMetaDescriptionHelloWorld = "{{seoMetaDescriptionIsMissing}}";
</script>';
        $tests[] = array($example, $example);

        // OneVariableOnlyNotExists
        $tests[] = array('{{seoMetaDescriptionIsTooShort}}', '{{seoMetaDescriptionIsTooShort}}');
        $tests[] = array('{{seoMetaDescriptionIsTooShort}}foo', '{{seoMetaDescriptionIsTooShort}}foo');
        $tests[] = array('foo{{seoMetaDescriptionIsTooShort}}', 'foo{{seoMetaDescriptionIsTooShort}}');

        // ManyVariablesNoneExist
        $tests[] = array(array (
            'joinedVariable' =>
                array (
                    0 => '<script>var seoMetaDescriptionIsTooLong = "";
var seoMetaDescriptionIsTooShort = "',
                    1 =>
                        array (
                            'name' => 'PageUrl',
                            'type' => 'PageUrl',
                            'lookUpTable' =>
                                array (
                                ),
                            'defaultValue' => NULL,
                            'parameters' =>
                                array (
                                ),
                        ),
                    2 => '";
var seoMetaDescriptionIsMissing = "',
                    3 =>
                        array (
                            'name' => 'PagePath',
                            'type' => 'PagePath',
                            'lookUpTable' =>
                                array (
                                ),
                            'defaultValue' => NULL,
                            'parameters' =>
                                array (
                                ),
                        ),
                    4 =>
                        array (
                            'name' => 'PageUrl',
                            'type' => 'PageUrl',
                            'lookUpTable' =>
                                array (
                                ),
                            'defaultValue' => NULL,
                            'parameters' =>
                                array (
                                ),
                        ),
                    5 => '";
var seoMetaDescriptionHelloWorld = "',
                    6 =>
                        array (
                            'name' => 'Referrer',
                            'type' => 'Referrer',
                            'lookUpTable' =>
                                array (
                                ),
                            'defaultValue' => NULL,
                            'parameters' =>
                                array (
                                ),
                        ),
                    7 => '";
</script>')), '<script>var seoMetaDescriptionIsTooLong = "";
var seoMetaDescriptionIsTooShort = "{{PageUrl}}";
var seoMetaDescriptionIsMissing = "{{PagePath}}{{PageUrl}}";
var seoMetaDescriptionHelloWorld = "{{Referrer}}";
</script>');

        // OneVariableExists
        $tests[] = array(array (
            'name' => 'PageUrl',
            'type' => 'PageUrl',
            'lookUpTable' =>
                array (
                ),
            'defaultValue' => NULL,
            'parameters' =>
                array (
                ),
        ), '{{PageUrl}}');
        $tests[] = array(array (
            'joinedVariable' =>
                array (
                    0 =>
                        array (
                            'name' => 'PageUrl',
                            'type' => 'PageUrl',
                            'lookUpTable' =>
                                array (
                                ),
                            'defaultValue' => NULL,
                            'parameters' =>
                                array (
                                ),
                        ),
                    1 => 'foo',
                ),
        ), '{{PageUrl}}foo');
        $tests[] = array(array (
            'joinedVariable' =>
                array (
                    'äöuü - 3434 ',
                        array (
                            'name' => 'PageUrl',
                            'type' => 'PageUrl',
                            'lookUpTable' =>
                                array (
                                ),
                            'defaultValue' => NULL,
                            'parameters' =>
                                array (
                                ),
                        ),
                    'foo',
                ),
        ), 'äöuü - 3434 {{PageUrl}}foo');
        $tests[] = array(array (
            'joinedVariable' =>
                array (
                    0 => 'foo',
                    1 =>
                        array (
                            'name' => 'PageUrl',
                            'type' => 'PageUrl',
                            'lookUpTable' =>
                                array (
                                ),
                            'defaultValue' => NULL,
                            'parameters' =>
                                array (
                                ),
                        ),
                ),
        ), 'foo{{PageUrl}}');

        // ManyVariablesSomeExist
        $tests[] = array(array (
            'joinedVariable' =>
                array (
                    0 => '<script>var seoMetaDescriptionIsTooLong = "";
var seoMetaDescriptionIsTooShort = "',
                    1 => '{{FooBar}}',
                    2 => '";
var seoMetaDescriptionIsMissing = "',
                    3 => '{{NotExisting}}',
                    4 =>
                        array (
                            'name' => 'PageUrl',
                            'type' => 'PageUrl',
                            'lookUpTable' =>
                                array (
                                ),
                            'defaultValue' => NULL,
                            'parameters' =>
                                array (
                                ),
                        ),
                    5 => '";
var seoMetaDescriptionHelloWorld = "',
                    6 =>
                        array (
                            'name' => 'Referrer',
                            'type' => 'Referrer',
                            'lookUpTable' =>
                                array (
                                ),
                            'defaultValue' => NULL,
                            'parameters' =>
                                array (
                                ),
                        ),
                    7 => '";
</script>',
                )), '<script>var seoMetaDescriptionIsTooLong = "";
var seoMetaDescriptionIsTooShort = "{{FooBar}}";
var seoMetaDescriptionIsMissing = "{{NotExisting}}{{PageUrl}}";
var seoMetaDescriptionHelloWorld = "{{Referrer}}";
</script>');

        // only some text
        $tests[] = array('hello world this is me', 'hello world this is me');
        // one opening but no closing
        $tests[] = array('hello world this{{is me', 'hello world this{{is me');
        $tests[] = array('{{hello world this is me', '{{hello world this is me');
        $tests[] = array('hello world this is me{{', 'hello world this is me{{');
        // one closing but no opening
        $tests[] = array('hello world this}}is me', 'hello world this}}is me');
        $tests[] = array('}}hello world thisis me', '}}hello world thisis me');
        $tests[] = array('hello world thisis me}}', 'hello world thisis me}}');

        // one opening and spare closing/opening
        $tests[] = array(array (
            'name' => 'PageUrl',
            'type' => 'PageUrl',
            'lookUpTable' =>
                array (
                ),
            'defaultValue' => NULL,
            'parameters' =>
                array (
                ),
        ), '{{PageUrl}}');
        $tests[] = array(array('joinedVariable' => array('{{', array (
            'name' => 'PageUrl',
            'type' => 'PageUrl',
            'lookUpTable' =>
                array (
                ),
            'defaultValue' => NULL,
            'parameters' =>
                array (
                ),
        ))), '{{{{PageUrl}}');
        $tests[] = array(array('joinedVariable' => array('{{notExisting', array (
            'name' => 'PageUrl',
            'type' => 'PageUrl',
            'lookUpTable' =>
                array (
                ),
            'defaultValue' => NULL,
            'parameters' =>
                array (
                ),
        ))), '{{notExisting{{PageUrl}}');
        $tests[] = array(array (
            'joinedVariable' =>
                array (
                    0 =>
                        array (
                            'name' => 'PageUrl',
                            'type' => 'PageUrl',
                            'lookUpTable' =>
                                array (
                                ),
                            'defaultValue' => NULL,
                            'parameters' =>
                                array (
                                ),
                        ),
                    1 => '}}',
                ),
        ), '{{PageUrl}}}}');

        return $tests;
    }

    public function test_generate_web()
    {
        if (version_compare(Version::VERSION, '3.8.0', '<')) {
            $this->markTestSkipped();
        }

        Piwik::addAction('Controller.TagManager.debug.end', function (&$result, $parameters) {
            $this->assertNotEmpty($result);
            self::assertStringContainsString('<html', $result);
            $result = 'debughtml';
        });
        $container = $this->getContainer();
        $context = $this->makeWebContext();
        $generated = $context->generate($container);

        $this->assertResponse('context_webcontext_generate', $generated);
    }

    public function test_generate_android()
    {
        $container = $this->getContainer();
        $context = StaticContainer::get('Piwik\Plugins\TagManager\Context\AndroidContext');
        $generated = $context->generate($container);

        $this->assertResponse('context_androidcontext_generate', $generated);
    }

    public function test_generate_ios()
    {
        $container = $this->getContainer();
        $context = StaticContainer::get('Piwik\Plugins\TagManager\Context\iOSContext');
        $generated = $context->generate($container);

        $this->assertResponse('context_ioscontext_generate', $generated);
    }

    private function getContainer()
    {
        return Request::processRequest('TagManager.getContainer', array(
            'idContainer' => self::$fixture->idContainer1,
            'idSite' => self::$fixture->idSite2,
        ));
    }

    private function assertResponse($testId, $content)
    {
        $expectedFile = PIWIK_DOCUMENT_ROOT . '/plugins/TagManager/tests/System/expected/' . $testId . '.text';
        $processedFile = str_replace('/expected/', '/processed/', $expectedFile);
        $content = var_export($content, 1);

        file_put_contents($processedFile, $content);

        $this->assertStringEqualsFile($expectedFile, $content);
    }

    public function test_removeAllContainerFiles_doesNotFail()
    {
        $count = BaseContext::removeAllContainerFiles(self::$fixture->idContainer1);
        $this->assertSame(0, $count);
    }

    public function test_removeAllContainerFiles_doesNotDeleteTooManyFiles()
    {
        $this->createDummyContainerFile('f243K34k');
        $this->createDummyContainerFile('a443Km4W');
        $this->createDummyContainerFile('a443Km4W_foobar');

        $count = BaseContext::removeAllContainerFiles('f243K34k');
        $this->assertSame(1, $count);

        $count = BaseContext::removeAllContainerFiles('a443Km4W');
        $this->assertSame(2, $count);

        $count = BaseContext::removeAllContainerFiles('a443Km4W');
        $this->assertSame(0, $count);
    }

    public function test_removeAllContainerFiles_nofilematches()
    {
        $count = BaseContext::removeAllContainerFiles('foobar234343');
        $this->assertSame(0, $count);
    }

    public function test_removeAllContainerFiles_invalidInput()
    {
        $count = BaseContext::removeAllContainerFiles('foo');
        $this->assertNull($count);
    }

    public function test_removeAllFilesOfAllContainers_doesNotFail()
    {
        $count = BaseContext::removeAllFilesOfAllContainers();
        $this->assertSame(0, $count);
    }

    public function test_removeAllFilesOfAllContainers_doesNotNotDeleteTooManyFiles()
    {
        $this->createDummyContainerFile('f243K34k');
        $this->createDummyContainerFile('a443Km4W');
        $this->createDummyContainerFile('a443Km4W_foobar');
        $count = BaseContext::removeAllFilesOfAllContainers();
        $this->assertSame(3, $count);
    }

    public function test_getJsTargetPath()
    {
        $context = $this->makeWebContext();
        $path = $context->getJsTargetPath(1, 'abcDefGh', 'dev', '2014-01-02 03:04:05');
        $this->assertSame('/js/container_abcDefGh_dev_c9cc31f4470c277fc928fa2c.js', $path);
        $envParts = explode('_', $path);
        $this->assertCount(4, $envParts);
        $this->assertSame('dev', $envParts[2], 'getJsTargetPath was changed and the middle part is no longer the environment. Likely the method removeNoLongerExistingEnvironments() needs to be adjusted');

        // different hash for staging
        $path = $context->getJsTargetPath(1, 'abcDefGh', 'staging', '2014-01-02 03:04:05');
        $this->assertSame('/js/container_abcDefGh_staging_4cbe911772ea788bfa8fe681.js', $path);

        // different hash for different creation date
        $path = $context->getJsTargetPath(1, 'abcDefGh', 'staging', '2014-01-02 04:04:05');
        $this->assertSame('/js/container_abcDefGh_staging_52382bdf94b3047d7e5fa73c.js', $path);

        $path = $context->getJsTargetPath(1, 'abcDefGh', Environment::ENVIRONMENT_PREVIEW, '2014-01-02 03:04:05');
        $this->assertSame('/js/container_abcDefGh_preview.js', $path);

        $path = $context->getJsTargetPath(1, 'abcDefGh', Environment::ENVIRONMENT_LIVE, '2014-01-02 03:04:05');
        $this->assertSame('/js/container_abcDefGh.js', $path);
    }

    public function test_getWebInstallInstructions_differentWebDirectory()
    {
        StaticContainer::getContainer()->set('TagManagerContainerWebDir', '/foobar');
        $container = $this->getContainer();
        $instructions = $this->makeWebContext()->getInstallInstructions($container, Environment::ENVIRONMENT_LIVE);
        self::assertStringContainsString('tests/PHPUnit/proxy/foobar/container_aaacont1.js\';', $instructions[0]['embedCode']);
    }

    public function test_getWebInstallInstructionsReact()
    {
        StaticContainer::getContainer()->set('TagManagerContainerWebDir', '/foobar');
        $container = $this->getContainer();
        $instructions = $this->makeWebContext()->getInstallInstructionsReact($container, Environment::ENVIRONMENT_LIVE);
        self::assertStringContainsString("import React from 'react'", $instructions[0]['embedCode']);
    }

    public function test_removeNoLongerExistingEnvironments()
    {
        $context = $this->makeWebContext();
        $path = array();
        $path[] = $context->getJsTargetPath(1, 'abcDefGh', Environment::ENVIRONMENT_LIVE, '2014-01-02 03:04:05');
        $path[] = $context->getJsTargetPath(1, 'abcDefGh', 'dev', '2014-01-02 03:04:05');
        $path[] = $context->getJsTargetPath(1, 'abcDefGh', Environment::ENVIRONMENT_PREVIEW, '2014-01-02 03:04:05');
        $path[] = $context->getJsTargetPath(1, 'abcDefGh', 'staging', '2014-01-02 03:04:05');
        $path[] = $context->getJsTargetPath(1, 'abcDefGh', 'baz', '2014-01-02 03:04:05');
        
        foreach ($path as $file) {
            $this->writeFile(PIWIK_DOCUMENT_ROOT . $file, ' ');
        }

        $removed = BaseContext::removeNoLongerExistingEnvironments(array(
            Environment::ENVIRONMENT_LIVE, 'staging'
        ));
        sort($removed);
        $this->assertEquals(array('baz', 'dev'), $removed);
    }

    private function createDummyContainerFile($idContainer)
    {
        $this->writeFile(PIWIK_DOCUMENT_ROOT . StaticContainer::get('TagManagerContainerStorageDir') . '/' . sprintf('%s%s*.js', StaticContainer::get('TagManagerContainerFilesPrefix'), $idContainer), 'test');
    }

    private function writeFile($file, $content)
    {
        $storage = StaticContainer::get('Piwik\Plugins\TagManager\Context\Storage\StorageInterface');
        $storage->save($file, $content);
    }

    /**
     * @return \Piwik\Plugins\TagManager\Context\WebContext
     */
    private function makeWebContext()
    {
        return StaticContainer::getContainer()->make('Piwik\Plugins\TagManager\Context\WebContext', array(
            'javaScriptTagManagerLoader' => new TestJavaScriptTagManagerLoader()
        ));
    }

    public static function getOutputPrefix()
    {
        return '';
    }

    public static function getPathToTestDirectory()
    {
        return dirname(__FILE__);
    }

    public static function provideContainerConfigBeforeClass()
    {
        return array(
            'Piwik\Plugins\TagManager\Context\BaseContext\TemplateLocator' => function () {
                return StaticContainer::getContainer()->make('Piwik\Plugins\TagManager\tests\System\TestTemplateLocator');
            },
            'Piwik\Plugins\TagManager\Model\Salt' => function () {
                return new Salt(sha1('foobar'));
            },
            'TagManagerJSMinificationEnabled' => true
        );
    }
}

ContextTest::$fixture = new TagManagerFixture();