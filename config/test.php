<?php

use Matomo\Dependencies\DI;

return array(
    'Piwik\Plugins\TagManager\Context\Storage\StorageInterface' => DI\autowire('Piwik\Plugins\TagManager\Context\Storage\Memory'),
    'Piwik\Plugins\TagManager\Model\Container\ContainerIdGenerator' => DI\decorate(function ($previous) {

        $testGenerateFixedId = \Piwik\Container\StaticContainer::get('test.vars.testGenerateFixedId');
        if (!empty($testGenerateFixedId)) {
            return new \Piwik\Plugins\TagManager\Model\Container\FixedIdGenerator();
        }

        return $previous;
    }),
    'observers.global' => DI\add(array(
        array('AssetManager.getStylesheetFiles', DI\value(function (&$stylesheets) {
            $useOverrideCss = \Piwik\Container\StaticContainer::get('test.vars.useOverrideCss');
            if ($useOverrideCss) {
                $stylesheets[] = 'plugins/TagManager/tests/resources/uitest-override.css';
            }
        })),
    )),
    'TagManagerJSMinificationEnabled' => false,
);
