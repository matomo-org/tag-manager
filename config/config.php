<?php

return array(
    'TagManagerContainerStorageDir' => function () {
        // the location where we store the generated javascript or json container files
        return '/js';
    },
    'TagManagerContainerWebDir' => function (\Piwik\Container\Container $c) {
        // the path under which the containers are available through the web. this may be different to the storage
        // path if using eg htaccess rewrites
        return $c->get('TagManagerContainerStorageDir');
    },
    'TagManagerContainerFilesPrefix' => function () {
        // the prefix for any container file
        return 'container_';
    },
    'TagManagerJSMinificationEnabled' => true,
    'TagManagerMaxContainerWeight' => function () {
        return \Piwik\Config::getInstance()->TagManager['max_container_size'] ?? \Piwik\Plugins\TagManager\Context\BaseContext::MAX_CONTAINER_WEIGHT;
    },
    'TagManagerMaxStoredReleaseWeight' => function () {
        return \Piwik\Config::getInstance()->TagManager['max_stored_release_size'] ?? \Piwik\Plugins\TagManager\Context\BaseContext::MAX_STORED_RELEASE_WEIGHT;
    },
    'fileintegrity.ignore' => Piwik\DI::add(array(
        Piwik\DI::get('fileintegrityIgnoreTagManager')
    )),
    'fileintegrityIgnoreTagManager' => function (\Piwik\Container\Container $c) {
        $start = trim($c->get('TagManagerContainerStorageDir'), '/');
        return $start . '/' . $c->get('TagManagerContainerFilesPrefix') . '*.js';
    },
    'diagnostics.required' => Piwik\DI::add(array(
        Piwik\DI::get('Piwik\Plugins\TagManager\Diagnostic\ContainerWriteAccess'),
    )),
    'Piwik\Plugins\TagManager\Model\Container\ContainerIdGenerator' => Piwik\DI::autowire('Piwik\Plugins\TagManager\Model\Container\RandomContainerIdGenerator'),
    'Piwik\Plugins\TagManager\Context\Storage\StorageInterface' => Piwik\DI::create('Piwik\Plugins\TagManager\Context\Storage\Filesystem'),
    'TagManager.MatomoTagEcommerceViewIsEcommerceViewHelpOnPremise' => Piwik\DI::string('TagManager_MatomoTagEcommerceViewIsEcommerceViewHelpOnPrem'),
);
