<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */
namespace Piwik\Plugins\TagManager\Context\Storage;

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
        }

    }

}
