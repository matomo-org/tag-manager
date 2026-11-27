<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\TagManager\Exception;

class ContainerTooLargeException extends \Exception
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
