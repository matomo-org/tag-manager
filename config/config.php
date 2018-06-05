<?php

return array(
    'TagManagerContainerFilesRelativePath' => function () {
        // the location where we store the generated javascript or json container files
        return '/js';
    },
    'TagManagerContainerFilesPrefix' => function () {
        // the prefix for any container file
        return 'container_';
    },
    'fileintegrity.ignore' => DI\add(array(
        DI\get('fileintegrityIgnoreTagManager')
    )),
    'fileintegrityIgnoreTagManager' => function (\Psr\Container\ContainerInterface $c) {
        $start = trim($c->get('TagManagerContainerFilesRelativePath'), '/');
        return $start . '/' . $c->get('TagManagerContainerFilesPrefix') . '*.js';
    },
    'diagnostics.required' => DI\add(array(
        DI\get('Piwik\Plugins\TagManager\Diagnostic\ContainerWriteAccess'),
    )),
    'Piwik\Plugins\TagManager\Model\Container\ContainerIdGenerator' => DI\object('Piwik\Plugins\TagManager\Model\Container\RandomContainerIdGenerator'),
    'Piwik\Plugins\TagManager\Context\Storage\StorageInterface' => DI\object('Piwik\Plugins\TagManager\Context\Storage\Filesystem'),
);
