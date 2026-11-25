<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\TagManager\Exception;

/**
 * Extends EntityRecursionException so that callers undoing a change which broke the container's generation undo
 * this one as well.
 */
class ContainerTooLargeException extends EntityRecursionException
{
}
