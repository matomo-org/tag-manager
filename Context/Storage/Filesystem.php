<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */
namespace Piwik\Plugins\TagManager\Context\Storage;

use Piwik\Piwik;

class Filesystem implements StorageInterface
{
    public function save($name, $data)
    {
        $content = null;

        if (file_exists($name)) {
            $content = @file_get_contents($name);
        }

        if (!isset($content) || $content !== $data) {
            // we only want to save the file when needed
            file_put_contents($name, $data);

            /**
             * Triggered so plugins can detect the changed file and for example sync it to other servers.
             */
            Piwik::postEvent('TagManager.containerFileChanged', array($name));
        }
    }

    public function delete($file)
    {
        \Piwik\Filesystem::deleteFileIfExists($file);

        /**
         * Triggered so plugins can detect the deleted file and for example sync it to other servers.
         */
        Piwik::postEvent('TagManager.containerFileDeleted', array($file));
    }

    public function find($sDir, $sPattern)
    {
        return \Piwik\Filesystem::globr($sDir, $sPattern);
    }

}
