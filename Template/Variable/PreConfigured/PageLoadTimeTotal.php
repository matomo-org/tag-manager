<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */
namespace Piwik\Plugins\TagManager\Template\Variable\PreConfigured;

use Piwik\Plugins\TagManager\Context\WebContext;

class PageLoadTimeTotal extends BasePreConfiguredVariable
{
    public function getCategory()
    {
        return self::CATEGORY_PERFORMANCE;
    }

    public function loadTemplate($context, $entity)
    {
        switch ($context) {
            case WebContext::ID:
                return $this->makeReturnTemplateMethod("TagManager.window.getPerformanceTiming('loadEventEnd') - TagManager.window.getPerformanceTiming('navigationStart')");
        }
    }
}
