<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */
namespace Piwik\Plugins\TagManager\Template\Tag;

use Piwik\Settings\FieldConfig;
use Piwik\Validators\CharacterLength;
use Piwik\Validators\NotEmpty;

class EmarsysTag extends BaseTag
{
    const ID = 'Emarsys';
    
    public function getId()
    {
        return self::ID;
    }

    public function getCategory()
    {
        return self::CATEGORY_ANALYTICS;
    }

    public function getIcon()
    {
        return 'plugins/TagManager/images/icons/emarsys.svg';
    }

    public function getParameters()
    {
        return array(
            $this->makeSetting('merchantId', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = 'Emarsys Merchant ID';
                $field->uiControl = FieldConfig::UI_CONTROL_TEXT;
                $field->description = 'Your Emarsys Merchant ID';
                $field->validators[] = new NotEmpty();
                $field->validate = function ($value) {
                    $value = trim($value);
                    $characterLength = new CharacterLength(1, 500);
                    $characterLength->validate($value);
                };
                $field->transform = function ($value) {
                    return trim($value);
                };
            }),
            $this->makeSetting('commandCategory', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = 'category';
                $field->uiControl = FieldConfig::UI_CONTROL_TEXT;
                $field->description = 'Report the category currently browsed by the visitor.';
                $field->validators[] = new CharacterLength(0, 500);
            }),
            $this->makeSetting('commandView', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = 'view';
                $field->uiControl = FieldConfig::UI_CONTROL_TEXT;
                $field->description = 'Report a product view.';
                $field->validators[] = new CharacterLength(0, 500);
            }),
            $this->makeSetting('commandTag', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = 'tag';
                $field->uiControl = FieldConfig::UI_CONTROL_TEXT;
                $field->description = 'Add an arbitrary tag to the current event. The tag is collected and can be accessed later from other Emarsys products.';
                $field->validators[] = new CharacterLength(0, 500);
            }),
            $this->makeSetting('commandGo', '', FieldConfig::TYPE_BOOL, function (FieldConfig $field) {
                $field->title = 'go';
                $field->uiControl = FieldConfig::UI_CONTROL_CHECKBOX;
                $field->description = 'Execute commands in the queue, that is, send them to the recommender service for processing.';
            }),
        );
    }
}
