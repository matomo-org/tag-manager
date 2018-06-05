<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */
namespace Piwik\Plugins\TagManager\API;

use Piwik\Cookie;

class PreviewCookie extends Cookie
{
    const COOKIE_NAME = 'mtmPreviewMode';

    public function __construct()
    {
        $oneWeekInSeconds = 604800;
        $expire = time() + $oneWeekInSeconds;
        parent::__construct(self::COOKIE_NAME, $expire);
    }

    public function getCookieValueName($idSite, $idContainer)
    {
        return 'mtmPreview' . $idSite . '_' . $idContainer;
    }

    public function enable($idSite, $idContainer)
    {
        $this->set($this->getCookieValueName($idSite, $idContainer), '1');
        $this->save();
    }

    public function disable($idSite, $idContainer)
    {
        $this->set($this->getCookieValueName($idSite, $idContainer), null);
        $this->save();
    }

}
