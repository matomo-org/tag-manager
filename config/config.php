<?php

return array(
    'TagManagerContainerStorageDir' => function () {
        // the location where we store the generated javascript or json container files
        return '/js';
    },
    'TagManagerContainerWebDir' => function (\Psr\Container\ContainerInterface $c) {
        // the path under which the containers are available through the web. this may be different to the storage
        // path if using eg htaccess rewrites
        return $c->get('TagManagerContainerStorageDir');
    },
    'TagManagerContainerFilesPrefix' => function () {
        // the prefix for any container file
        return 'container_';
    },
    'TagManagerJSMinificationEnabled' => true,
    'fileintegrity.ignore' => Piwik\DI::add(array(
        Piwik\DI::get('fileintegrityIgnoreTagManager')
    )),
    'fileintegrityIgnoreTagManager' => function (\Psr\Container\ContainerInterface $c) {
        $start = trim($c->get('TagManagerContainerStorageDir'), '/');
        return $start . '/' . $c->get('TagManagerContainerFilesPrefix') . '*.js';
    },
    'diagnostics.required' => Piwik\DI::add(array(
        Piwik\DI::get('Piwik\Plugins\TagManager\Diagnostic\ContainerWriteAccess'),
    )),
    'Piwik\Plugins\TagManager\Model\Container\ContainerIdGenerator' => Piwik\DI::autowire('Piwik\Plugins\TagManager\Model\Container\RandomContainerIdGenerator'),
    'Piwik\Plugins\TagManager\Context\Storage\StorageInterface' => Piwik\DI::create('Piwik\Plugins\TagManager\Context\Storage\Filesystem'),
);
