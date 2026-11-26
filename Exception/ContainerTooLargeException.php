<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\TagManager\Exception;

/**
 * Extends EntityRecursionException so that code handling a container that cannot be generated, eg the scheduled
 * regeneration of released containers, handles this one as well.
 */
class ContainerTooLargeException extends EntityRecursionException
{
    /**
     * @var int
     */
    private $weight;

    public function __construct(string $message, int $weight)
    {
        parent::__construct($message);
        $this->weight = $weight;
    }

    public function getWeight(): int
    {
        return $this->weight;
    }
}
