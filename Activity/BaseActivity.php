<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\TagManager\Activity;

use Piwik\API\Request;
use Piwik\Container\StaticContainer;
use Piwik\Piwik;
use Piwik\Plugins\ActivityLog\Activity\Activity;
use Piwik\Site;

abstract class BaseActivity extends Activity
{
    protected $entityType = '';

    /**
     * ActivityLog indexes existing entries again when this is bumped, so bump it whenever getObject() changes
     */
    protected const OBJECT_INDEX_VERSION = 1;

    /**
     * The ActivityLog item type the activity acts on, '' for none
     */
    protected const OBJECT_TYPE = '';

    protected function hasRequestedApiMethod($method)
    {
        $method = 'TagManager.' . $method;
        return $method === Request::getRootApiRequestMethod();
    }

    protected function getContainerNameFromActivityData($activityData)
    {
        if (!empty($activityData['container']['name'])) {
            return $activityData['container']['name'];
        }

        if (!empty($activityData['container']['id'])) {
            return $activityData['container']['id'];
        }

        return '';
    }

    protected function getEntityNameFromActivityData($activityData)
    {
        if (!empty($activityData[$this->entityType]['name'])) {
            return $activityData[$this->entityType]['name'];
        }

        if (!empty($activityData[$this->entityType]['id'])) {
            return $activityData[$this->entityType]['id'];
        }

        return '';
    }

    protected function getSiteNameFromActivityData($activityData)
    {
        if (!empty($activityData['site']['site_name'])) {
            return $activityData['site']['site_name'];
        }

        if (!empty($activityData['site']['site_id'])) {
            return $activityData['site']['site_id'];
        }

        return '';
    }

    /**
     * @return array|false False drops the activity instead of logging it.
     */
    protected function formatActivityData($idSite, $idContainer, $idContainerVersion, $idEntity)
    {
        if (!is_numeric($idSite) || !is_numeric($idEntity)) {
            return false;
        }

        $params = array(
            'site' => $this->getSiteData($idSite),
            'version' => 'v1',
            'container' => $this->getContainerData($idSite, $idContainer),
        );

        if ($this->entityType) {
            $params[$this->entityType] = $this->getEntityData($idSite, $idContainer, $idContainerVersion, $idEntity);
        }
        return $params;
    }

    private function getSiteData($idSite)
    {
        return array(
            'site_id'   => $idSite,
            'site_name' => Site::getNameFor($idSite)
        );
    }

    protected function getContainerData($idSite, $idContainer)
    {
        $container = $this->getContainerDao()->getContainer($idSite, $idContainer);

        if (!empty($container['name'])) {
            $containerName = $container['name'];
        } else {
            // container name might not be set when we are handling "deleted" activity
            $containerName = 'ID: ' . $idContainer;
        }

        return array(
            'id' => $idContainer,
            'name' => $containerName
        );
    }

    private function getContainerDao()
    {
        return StaticContainer::get('Piwik\Plugins\TagManager\Dao\ContainersDao');
    }

    protected function getEntityData($idSite, $idContainer, $idContainerVersion, $idEntity)
    {
        return array(
            'id' => $idEntity,
            'name' => ''
        );
    }

    public function getPerformingUser($eventData = null)
    {
        $login = Piwik::getCurrentUserLogin();

        if ($login === self::USER_ANONYMOUS || empty($login)) {
            // anonymous cannot change an entity, in this case the system changed it
            return self::USER_SYSTEM;
        }

        return $login;
    }

    /**
     * Returns the item the activity acts on, for the activity log's "Filter by item" filter
     *
     * Only ActivityLog 6.1.0 and later calls this; on earlier versions it is an unused method.
     *
     * @param array<mixed> $parameters
     * @return array{type: string, id: string, name: ?string, context: ?string}|null
     */
    public function getObject(array $parameters): ?array
    {
        if (static::OBJECT_TYPE === '') {
            return null;
        }

        $isContainer = static::OBJECT_TYPE === 'tm_container';
        $subject     = $parameters[$isContainer ? 'container' : $this->entityType] ?? null;
        $id          = is_array($subject) ? self::toString($subject['id'] ?? null) : null;

        if ($id === null || $id === '') {
            return null;
        }

        $name = self::toString($subject['name'] ?? null);

        // "ID: <id>" is logged once an entity is deleted, so its last known name is used instead
        if ($name === 'ID: ' . $id) {
            $name = null;
        }

        if ($isContainer) {
            $context = self::toString($parameters['site']['site_name'] ?? null);
        } else {
            $idContainer = self::toString($parameters['container']['id'] ?? null);
            $context     = self::toString($parameters['container']['name'] ?? null);

            if ($context === 'ID: ' . $idContainer) {
                $context = null;
            }
        }

        return [
            'type'    => static::OBJECT_TYPE,
            'id'      => $id,
            'name'    => $name,
            'context' => $context,
        ];
    }

    /**
     * @param mixed $value
     */
    private static function toString($value): ?string
    {
        return is_scalar($value) ? (string) $value : null;
    }
}
