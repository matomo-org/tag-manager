<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\TagManager\Template\Tag;

use Piwik\Settings\FieldConfig;
use Piwik\Plugins\TagManager\Template\Tag\BaseTag;
use Piwik\Settings\Setting;
use Piwik\Validators\CharacterLength;
use Piwik\Validators\NotEmpty;

class ZendeskChatTag extends BaseTag
{
    public function getCategory() {
        return self::CATEGORY_SOCIAL;
    }

    public function getIcon() {
        return 'plugins/TagManager/images/icons/zendesk_chat.svg';
    }

    public function getParameters() {
        return array(
            $this->makeSetting('zendeskChatId', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = 'Zendesk Chat ID';
                $field->description = 'You can get the Site ID by logging into Zendesk Chat, going to "Settings" and clicking on "Widget". The Site ID has typically about 32 characters and is the text coming directly after "https://v2.zopim.com/?", for example "123451c27295ad739e46b6b1".';
                $field->validators[] = new NotEmpty();
                $field->validate = function ($value, Setting $setting) {
                    $value = trim($value);
                    if (substr($value, 0, 1) === "?") {
                        throw new \Exception("The Chat ID shouldn't include the staring '?'");
                    }

                    $characterLength = new CharacterLength(20, 40);
                    $characterLength->validate($value);
                };
                $field->transform = function ($value) {
                    return trim($value);
                };

            }),
        );
    }

}
