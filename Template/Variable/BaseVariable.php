<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */
namespace Piwik\Plugins\TagManager\Template\Variable;

use Piwik\Plugins\TagManager\Context\WebContext;
use Piwik\Plugins\TagManager\Template\BaseTemplate;

/**
 * @api
 */
abstract class BaseVariable extends BaseTemplate
{
    CONST CATEGORY_PAGE_VARIABLES = 'TagManager_CategoryPageVariables';
    CONST CATEGORY_VISIBILITY = 'TagManager_CategoryVisibility';
    CONST CATEGORY_CLICKS = 'TagManager_CategoryClicks';
    CONST CATEGORY_CONTAINER_INFO = 'TagManager_CategoryContainerInfo';
    CONST CATEGORY_HISTORY = 'TagManager_CategoryHistory';
    CONST CATEGORY_ERRORS = 'TagManager_CategoryErrors';
    CONST CATEGORY_SCROLLS = 'TagManager_CategoryScrolls';
    CONST CATEGORY_FORMS = 'TagManager_CategoryForms';
    CONST CATEGORY_DATE = 'TagManager_CategoryDate';
    CONST CATEGORY_PERFORMANCE = 'TagManager_CategoryPerformance';
    CONST CATEGORY_UTILITIES = 'TagManager_CategoryUtilities';
    CONST CATEGORY_DEVICE = 'TagManager_CategoryDevice';
    CONST CATEGORY_SEO = 'TagManager_CategorySEO';
    CONST CATEGORY_OTHERS = 'General_Others';

    protected $templateType = 'Variable';

    /**
     * @inheritdoc
     */
    public function getCategory()
    {
        return self::CATEGORY_OTHERS;
    }

    /**
     * @inheritdoc
     */
    public function getSupportedContexts()
    {
        return array(
            WebContext::ID
        );
    }

    /**
     * Defines whether this variable is a preconfigured variable which cannot be configured and is ready to use.
     * @return bool
     */
    public function isPreConfigured()
    {
        return false;
    }

}
