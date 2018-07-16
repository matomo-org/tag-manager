<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */
namespace Piwik\Plugins\TagManager\Template\Tag;

use Piwik\Plugins\TagManager\Context\WebContext;
use Piwik\Plugins\TagManager\Template\BaseTemplate;

/**
 * @api
 */
abstract class BaseTag extends BaseTemplate
{
    const CATEGORY_ANALYTICS = 'TagManager_CategoryAnalytics';
    const CATEGORY_CUSTOM = 'TagManager_CategoryCustom';
    const CATEGORY_DEVELOPERS = 'TagManager_CategoryDevelopers';
    const CATEGORY_ADS = 'TagManager_CategoryAds';
    const CATEGORY_EMAIL = 'TagManager_CategoryEmail';
    const CATEGORY_AFFILIATES = 'TagManager_CategoryAffiliates';
    const CATEGORY_REMARKETING = 'TagManager_CategoryRemarketing';
    const CATEGORY_SOCIAL = 'TagManager_CategorySocial';
    const CATEGORY_OTHERS = 'General_Others';
    
    protected $templateType = 'Tag';

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

}
