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
    private const STORE_KEY_PREFIX_LAST_USED_CONTAINER = 'lastUsedContainer_';

    /**
     * @var UserScopedSettingsAccessManager
     */
    private $accessManager;

    /**
     * Stored values already read in this request, by user login and site, as the menu asks for them several times.
     *
     * @var array<string, array<int, string|null>>
     */
    private $lastUsedContainersByLogin = [];

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

        return $this->getLastUsedContainer($userLogin, $idSite);
    }

    public function setForCurrentUser(int $idSite, string $idContainer): void
    {
        $userLogin = $this->getCurrentUserLogin();
        if ($userLogin === null) {
            return;
        }

        if ($this->getLastUsedContainer($userLogin, $idSite) === $idContainer) {
            return;
        }

        $this->accessManager->set('TagManager', $userLogin, $this->getStoreKey($idSite), $idContainer);
        $this->lastUsedContainersByLogin[$userLogin][$idSite] = $idContainer;
    }

    /**
     * Removes the site from the saved containers of every user, for example when the site is deleted.
     */
    public function removeSiteForAllUsers(int $idSite): void
    {
        $storeKey = $this->getStoreKey($idSite);
        $valuesByUser = $this->accessManager->getValuesForAllUsers('TagManager', [$storeKey]);

        foreach (array_keys($valuesByUser) as $userLogin) {
            $userLogin = (string) $userLogin;
            $this->accessManager->delete('TagManager', $userLogin, $storeKey);
            unset($this->lastUsedContainersByLogin[$userLogin][$idSite]);
        }
    }

    private function getCurrentUserLogin(): ?string
    {
        if (Piwik::isUserIsAnonymous()) {
            return null;
        }

        $userLogin = Piwik::getCurrentUserLogin();

        return empty($userLogin) ? null : $userLogin;
    }

    private function getLastUsedContainer(string $userLogin, int $idSite): ?string
    {
        if (
            !isset($this->lastUsedContainersByLogin[$userLogin])
            || !array_key_exists($idSite, $this->lastUsedContainersByLogin[$userLogin])
        ) {
            $value = $this->accessManager->get('TagManager', $userLogin, $this->getStoreKey($idSite));
            $this->lastUsedContainersByLogin[$userLogin][$idSite] = is_string($value) && $value !== '' ? $value : null;
        }

        return $this->lastUsedContainersByLogin[$userLogin][$idSite];
    }

    private function getStoreKey(int $idSite): string
    {
        return self::STORE_KEY_PREFIX_LAST_USED_CONTAINER . $idSite;
    }
}
