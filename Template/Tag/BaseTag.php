<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\TagManager\Template\Tag;

use Piwik\Piwik;
use Piwik\Plugins\TagManager\Context\WebContext;
use Piwik\Plugins\TagManager\Template\BaseTemplate;

/**
 * @api
 */
abstract class BaseTag extends BaseTemplate
{
    public const CATEGORY_ANALYTICS = 'TagManager_CategoryAnalytics';
    public const CATEGORY_CUSTOM = 'TagManager_CategoryCustom';
    public const CATEGORY_DEVELOPERS = 'TagManager_CategoryDevelopers';
    public const CATEGORY_ADS = 'TagManager_CategoryAds';
    public const CATEGORY_EMAIL = 'TagManager_CategoryEmail';
    public const CATEGORY_AFFILIATES = 'TagManager_CategoryAffiliates';
    public const CATEGORY_REMARKETING = 'TagManager_CategoryRemarketing';
    public const CATEGORY_SOCIAL = 'TagManager_CategorySocial';
    public const CATEGORY_OTHERS = 'General_Others';

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

    /**
     * Validates a currency setting as a three-letter ISO 4217 code. An empty value or a variable reference passes,
     * since a variable only resolves in the browser.
     *
     * @param mixed $value
     * @throws \Exception
     */
    protected function validateCurrencyCode($value): void
    {
        $value = trim((string) $value);
        if ($value === '' || strpos($value, '{{') !== false) {
            return;
        }
        if (!preg_match('/^[a-z]{3}$/i', $value)) {
            throw new \Exception(Piwik::translate('TagManager_CurrencyInvalid'));
        }
    }
}
