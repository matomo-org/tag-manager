<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */
namespace Piwik\Plugins\TagManager\Template\Variable\PreConfigured;

use Piwik\Plugins\TagManager\Context\WebContext;


class ContainerIdVariable extends BasePreConfiguredVariable
{
    public function getCategory()
    {
        return self::CATEGORY_CONTAINER_INFO;
    }

    public function loadTemplate($context, $entity)
    {
        switch ($context) {
            case WebContext::ID:
                return $this->makeReturnTemplateMethod('parameters.container.id');
        }
    }

}
