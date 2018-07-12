<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */
namespace Piwik\Plugins\TagManager;

use Piwik\Container\StaticContainer;
use Piwik\Date;
use Piwik\Piwik;
use Piwik\Plugins\TagManager\Context\BaseContext;
use Piwik\Plugins\TagManager\Model\Environment;
use Piwik\Settings\Setting;
use Piwik\Settings\FieldConfig;

class SystemSettings extends \Piwik\Settings\Plugin\SystemSettings
{
    const CUSTOM_TEMPLATES_DISABLED = 'disabled';
    const CUSTOM_TEMPLATES_ADMIN = 'admin';
    const CUSTOM_TEMPLATES_SUPERUSER = 'superuser';

    /** @var Setting */
    public $restrictCustomTemplates;

    /** @var Setting */
    public $environments;

    public static $DEFAULT_ENVIRONMENTS = [['environment' => 'dev'], ['environment' => 'staging']];

    protected function init()
    {
        $this->restrictCustomTemplates = $this->createCustomTemplatesSetting();
        $this->environments = $this->createEnvironmentsSetting();
    }

    private function createCustomTemplatesSetting()
    {
        return $this->makeSetting('restrictCustomTemplates', self::CUSTOM_TEMPLATES_ADMIN, FieldConfig::TYPE_STRING, function (FieldConfig $field) {
            $field->title = Piwik::translate('TagManager_SettingCustomTemplatesTitle');
            $field->uiControl = FieldConfig::UI_CONTROL_SINGLE_SELECT;
            $field->description = Piwik::translate('TagManager_SettingCustomTemplatesDescription');
            $field->availableValues = array(
                self::CUSTOM_TEMPLATES_DISABLED => Piwik::translate('TagManager_SettingCustomTemplatesDisabled'),
                self::CUSTOM_TEMPLATES_ADMIN => Piwik::translate('TagManager_SettingCustomTemplatesAdmin'),
                self::CUSTOM_TEMPLATES_SUPERUSER => Piwik::translate('TagManager_SettingCustomTemplatesSuperUser')
            );
        });
    }

    public function transformEnvironment($environments)
    {
        if (!is_array($environments) && !empty($environments)) {
            $environments = array($environments);
        }
        $environments = array_filter($environments, function ($val) {
            if (!is_array($val) || !isset($val['environment'])) {
                throw new \Exception('Missing array key environment');
            }

            return $val['environment'] !== false && $val['environment'] !== '' && $val['environment'] !== null;
        });
        $environments = array_map(function ($val) {
            // make sure to only keep environment but no other properties
            return array('environment' => strtolower($val['environment']));
        }, $environments);
        $environments = array_values(array_unique($environments, SORT_REGULAR));
        return $environments;
    }

    public function getEnvironments()
    {
        $environments = $this->environments->getValue();

        if (empty($environments)) {
            $environments = array();
        }

        $flat = array();
        foreach ($environments as $environment) {
            if (!empty($environment['environment'])) {
                $flat[] = $environment['environment'];
            }
        }

        array_unshift($flat, Environment::ENVIRONMENT_LIVE);
        $flat = array_values(array_unique($flat));

        return $flat;
    }

    public function save()
    {
        parent::save();

        $environments = $this->getEnvironments();
        $environments[] = Environment::ENVIRONMENT_PREVIEW;

        $now = Date::now();

        BaseContext::removeNoLongerExistingEnvironments($environments);

        $releaseDao = StaticContainer::get('Piwik\Plugins\TagManager\Dao\ContainerReleaseDao');
        $releaseDao->deleteNoLongerExistingEnvironmentReleases($environments, $now->getDatetime());
    }

    private function createEnvironmentsSetting()
    {
        $self = $this;
        return $this->makeSetting('environments', self::$DEFAULT_ENVIRONMENTS, FieldConfig::TYPE_ARRAY, function (FieldConfig $field) use ($self) {
            $field->title = Piwik::translate('TagManager_Environments');
            $field->uiControl = FieldConfig::UI_CONTROL_MULTI_TUPLE;
            $field->description = Piwik::translate('TagManager_SettingEnvironmentDescription');

            $field->uiControl = FieldConfig::UI_CONTROL_MULTI_TUPLE;
            $field1 = new FieldConfig\MultiPair(Piwik::translate('TagManager_Environment'), 'environment', FieldConfig::UI_CONTROL_TEXT);
            $field->uiControlAttributes['field1'] = $field1->toArray();

            $field->transform = function ($value) use ($self) {
                return $self->transformEnvironment($value);
            };

            $field->validate = function ($value) use ($self) {
                $value = $self->transformEnvironment($value);

                foreach ($value as $environment) {
                    if (!isset($environment['environment'])) {
                        continue;
                    }
                    Environment::checkEnvironmentNameFormat($environment['environment']);

                    if (strtolower($environment['environment']) === strtolower(Environment::ENVIRONMENT_PREVIEW)) {
                        throw new \Exception(Piwik::translate('TagManager_ErrorPreviewReservedEnvironment'));
                    }
                }
            };
        });
    }
}
