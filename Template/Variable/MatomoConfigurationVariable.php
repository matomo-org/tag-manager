<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */
namespace Piwik\Plugins\TagManager\Template\Variable;

use Piwik\Common;
use Piwik\Settings\FieldConfig;
use Piwik\Site;
use Piwik\Validators\CharacterLength;
use Piwik\Validators\NotEmpty;
use Piwik\Validators\UrlLike;
use Piwik\Plugins\TagManager\SystemSettings as Settings;

class MatomoConfigurationVariable extends BaseVariable
{
    const ID = 'MatomoConfiguration';

    public function getId()
    {
        return self::ID;
    }

    public function getCategory()
    {
        return self::CATEGORY_OTHERS;
    }

    public function getIcon()
    {
        return 'plugins/TagManager/images/MatomoIcon.png';
    }

    public function hasAdvancedSettings()
    {
        return false;
    }

    public function getParameters()
    {
        $idSite = Common::getRequestVar('idSite', 0, 'int');
        $settings = new Settings();
        $url = $settings->getAnalyticsUrl();

        if ($settings->isHttpsForced()) {
            $url = str_replace('http://', 'https://', $url);
        } else {
            $url = str_replace(array('http://', 'https://'), '//', $url);
        }

        $matomoUrl = $this->makeSetting('matomoUrl', $url, FieldConfig::TYPE_STRING, function (FieldConfig $field) {
            $field->title = 'Matomo URL';
            $field->customUiControlTemplateFile = self::FIELD_TEMPLATE_VARIABLE;
            $field->description = 'The URL of your Matomo instance. It should not include "/index.php" or "piwik.php". The URL of your current Matomo URL instance is preconfigured.';
            $field->validators[] = new NotEmpty();
            $field->validators[] = new UrlLike();
        });

        return array(
            $matomoUrl,
            $this->makeSetting('idSite', $idSite, FieldConfig::TYPE_STRING, function (FieldConfig $field) use ($matomoUrl, $url) {
                $field->title = 'Matomo idSite';
                $field->customUiControlTemplateFile = self::FIELD_TEMPLATE_VARIABLE;
                $field->description = 'The idSite you want to track data into. The idSite of the current website is preconfigured. You may also find the idSite of any other website under "Administration => Manage Measurables/Websites".';
                $field->validators[] = new NotEmpty();
                $field->validators[] = new CharacterLength(0, 500);
                $field->validate = function ($value) use ($matomoUrl, $url) {
                    if (is_numeric($value)) {
                        if ($matomoUrl->getValue() === $url) {
                            new Site($value);// we validate idSite when it points to this url
                        }
                        return; // valid... we do not validate idSite as it might point to different matomo...
                    }
                    $posBracket = strpos($value, '{{');
                    if ($posBracket === false || strpos($value, '}}', $posBracket) === false) {
                        throw new \Exception('The idSite can only include idSites and variables.');
                    }
                };
            }),
            $this->makeSetting('enableLinkTracking', true, FieldConfig::TYPE_BOOL, function (FieldConfig $field) {
                $field->title = 'Enable Link Tracking';
                $field->description = 'Enables the automatic download and outlink tracking.';
            }),
            $this->makeSetting('enableCrossDomainLinking', false, FieldConfig::TYPE_BOOL, function (FieldConfig $field) {
                $field->title = 'Enable Cross Domain Linking';
                $field->description = 'Enable this to accurately measure the same visitor across multiple domain names.';
            }),
            $this->makeSetting('enableDoNotTrack', false, FieldConfig::TYPE_BOOL, function (FieldConfig $field) {
                $field->title = 'Enable Do Not Track';
            }),
            $this->makeSetting('enableJSErrorTracking', false, FieldConfig::TYPE_BOOL, function (FieldConfig $field) {
                $field->title = 'Enable JavaScript Error Tracking';
                $field->description = 'Enables the tracking of uncaught JavaScript errors as an event.';
            }),
            $this->makeSetting('enableHeartBeatTimer', false, FieldConfig::TYPE_BOOL, function (FieldConfig $field) {
                $field->title = 'Enable HeartBeat Timer';
                $field->description = 'Install a Heart beat timer that will regularly send requests to Matomo in order to better measure the time spent on the page.';
            }),
            $this->makeSetting('trackAllContentImpressions', false, FieldConfig::TYPE_BOOL, function (FieldConfig $field) {
                $field->title = 'Track All Content Impressions';
                $field->description = 'Enables the content tracking feature by scanning the entire DOM for all content blocks and tracks all impressions once the page has loaded.';
            }),
            $this->makeSetting('trackVisibleContentImpressions', false, FieldConfig::TYPE_BOOL, function (FieldConfig $field) {
                $field->title = 'Track Visible Content Impressions';
                $field->description = 'Enables the content tracking feature by scanning the entire DOM for all content blocks but only tracks content impressions once the user scrolls to the content and the content is actually visible.';
            }),
            $this->makeSetting('disableCookies', false, FieldConfig::TYPE_BOOL, function (FieldConfig $field) {
                $field->title = 'Disable cookies';
                $field->description = 'Disables all first party cookies.';
            }),
            $this->makeSetting('setSecureCookie', false, FieldConfig::TYPE_BOOL, function (FieldConfig $field) {
                $field->title = 'Enable Secure Cookie';
                $field->description = 'Enable the Secure cookie flag on all first party cookies. This should be used when your website is only available under HTTPS so that all tracking cookies are always sent over secure connection.';
            }),
            $this->makeSetting('cookieDomain', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = 'Cookie Domain';
                $field->description = 'The default is the current document domain. If your website can be visited for example at both www.example.com and example.com, you would use: ".example.com" or "*.example.com".';
                $field->validators[] = new CharacterLength(0, 500);
            }),
            $this->makeSetting('cookiePath', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = 'Cookie Path';
                $field->description = 'When tracking many subdirectories in separate websites, the cookie path prevents the number of cookies to quickly increase and prevent browser from deleting some of the cookies. This ensures optimal data accuracy and improves performance for your users (fewer cookies are sent with each request).';
                $field->validators[] = new CharacterLength(0, 500);
            }),

            $this->makeSetting('domains', array(), FieldConfig::TYPE_ARRAY, function (FieldConfig $field) {
                $field->title = 'Domains';
                $field->description = 'Used to detect outlinks. Add hostnames or domains to be treated as local. For wildcard subdomains, you can use: ".example.com" or "*.example.com". You can also specify a path along a domain: "*.example.com/subsite1".';
                $field->validate = function ($value) {
                    if (empty($value)) {
                        return;
                    }
                    if (!is_array($value)) {
                        throw new \Exception('Value needs to be an array');
                    }
                };

                $field->transform = function ($value) {
                    if (empty($value) || !is_array($value)) {
                        return array();
                    }
                    $withValues = array();
                    foreach ($value as $domain) {
                        if (!empty($domain['domain'])) {
                            $withValues[] = $domain;
                        }
                    }

                    return $withValues;
                };

                $field->uiControl = FieldConfig::UI_CONTROL_MULTI_TUPLE;
                $field1 = new FieldConfig\MultiPair('Domain', 'domain', FieldConfig::UI_CONTROL_TEXT);
                $field1->customUiControlTemplateFile = self::FIELD_TEMPLATE_VARIABLE;
                $field->uiControlAttributes['field1'] = $field1->toArray();
            }),

            $this->makeSetting('alwaysUseSendBeacon', false, FieldConfig::TYPE_BOOL, function (FieldConfig $field) {
                $field->title = 'Always use sendBeacon';
                $field->description = 'Enables send beacon usage instead of a regular ajax request. This means when a user clicks for example on an outlink, the navigation to this page will happen much faster.';
            }),
            $this->makeSetting('userId', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = 'User ID';
                $field->description = 'Sets a User ID to this user (such as an email address or a username).';
                $field->validators[] = new CharacterLength(0, 500);
                $field->customUiControlTemplateFile = self::FIELD_TEMPLATE_VARIABLE;
            }),
            $this->makeSetting('customDimensions', array(), FieldConfig::TYPE_ARRAY, function (FieldConfig $field) {
                $field->title = 'Custom Dimensions';
                $field->description = 'Optionally set one or multiple custom dimensions.';
                $field->validate = function ($value) {
                    if (empty($value)) {
                        return;
                    }
                    if (!is_array($value)) {
                        throw new \Exception('Value needs to be an array');
                    }
                };

                $field->transform = function ($value) {
                    if (empty($value) || !is_array($value)) {
                        return array();
                    }
                    $withValues = array();
                    foreach ($value as $dim) {
                        if (!empty($dim['index']) && !empty($dim['value'])) {
                            $withValues[] = $dim;
                        }
                    }

                    return $withValues;
                };

                $field->uiControl = FieldConfig::UI_CONTROL_MULTI_TUPLE;
                $field1 = new FieldConfig\MultiPair('Index', 'index', FieldConfig::UI_CONTROL_TEXT);
                $field1->customUiControlTemplateFile = self::FIELD_TEMPLATE_VARIABLE;
                $field2 = new FieldConfig\MultiPair('Value', 'value', FieldConfig::UI_CONTROL_TEXT);
                $field2->customUiControlTemplateFile = self::FIELD_TEMPLATE_VARIABLE;
                $field->uiControlAttributes['field1'] = $field1->toArray();
                $field->uiControlAttributes['field2'] = $field2->toArray();
            }),
            $this->makeSetting('bundleTracker', true, FieldConfig::TYPE_BOOL, function (FieldConfig $field) {
                $field->title = 'Bundle Tracker';
                $field->uiControl = FieldConfig::UI_CONTROL_CHECKBOX;
                $field->description = 'By bundling the Matomo JavaScript tracker directly into the container it may improve the performance of your website as it reduces the number of needed requests. It is recommended to bundle the Matomo tracker because in most cases the tracker would otherwise be otherwise loaded in a separate request on page view anyway. Note: If you use two different Matomo configurations in one container, the setting of the first configuration used in the first Matomo Tag will be applied to all Matomo tags within one container.';
            }),
            $this->makeSetting('jsEndpoint', 'piwik.js', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = 'Tracker Javascript Path';
                $field->uiControl = FieldConfig::UI_CONTROL_SINGLE_SELECT;
                $field->availableValues = array(
                    'matomo.js' => 'matomo.js',
                    'piwik.js' => 'piwik.js',
                    'js/' => 'js/',
                    'js/tracker.php' => 'js/tracker.php',
                );
    
                $field->description = 'Here you can configure the source path of the Matomo Tracker JavaScript, if you are not using the "Bundle Tracker" option.';
            }),
            $this->makeSetting('trackingEndpoint', 'piwik.php', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = 'Tracking Request Target Path';
                $field->uiControl = FieldConfig::UI_CONTROL_SINGLE_SELECT;
                $field->availableValues = array(
                    'matomo.php' => 'matomo.php',
                    'piwik.php' => 'piwik.php',
                    'js/' => 'js/',
                    'js/tracker.php' => 'js/tracker.php',
                );
    
                $field->description = 'Here you can configure the target path for tracking requests.';
            }),
        );
    }

}
