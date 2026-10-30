<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\TagManager;

use Piwik\Piwik;
use Piwik\Settings\Storage\UserScopedSettingsAccessManager;

/**
 * Remembers the container each user last worked in, per site, so Tag Manager can open it again.
 */
class LastUsedContainer
{
    private const STORE_KEY_LAST_USED_CONTAINERS = 'lastUsedContainers';

    /**
     * @var UserScopedSettingsAccessManager
     */
    private $accessManager;

    public function __construct(UserScopedSettingsAccessManager $accessManager)
    {
        $this->accessManager = $accessManager;
    }

    public function getForCurrentUser(int $idSite): ?string
    {
        $userLogin = $this->getCurrentUserLogin();
        if ($userLogin === null) {
            return null;
        }

        $lastUsedContainers = $this->getLastUsedContainers($userLogin);

        return $lastUsedContainers[$idSite] ?? null;
    }

    public function setForCurrentUser(int $idSite, string $idContainer): void
    {
        $userLogin = $this->getCurrentUserLogin();
        if ($userLogin === null) {
            return;
        }

        $lastUsedContainers = $this->getLastUsedContainers($userLogin);
        if (($lastUsedContainers[$idSite] ?? null) === $idContainer) {
            return;
        }

        $lastUsedContainers[$idSite] = $idContainer;
        $this->accessManager->set('TagManager', $userLogin, self::STORE_KEY_LAST_USED_CONTAINERS, $lastUsedContainers);
    }

    private function getCurrentUserLogin(): ?string
    {
        if (Piwik::isUserIsAnonymous()) {
            return null;
        }

        $userLogin = Piwik::getCurrentUserLogin();

        return empty($userLogin) ? null : $userLogin;
    }

    /**
     * @return array<int, string>
     */
    private function getLastUsedContainers(string $userLogin): array
    {
        $value = $this->accessManager->get('TagManager', $userLogin, self::STORE_KEY_LAST_USED_CONTAINERS, []);

        return is_array($value) ? $value : [];
    }
}
