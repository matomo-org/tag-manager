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
use Piwik\Validators\CharacterLength;
use Piwik\Validators\NotEmpty;
use Piwik\Validators\UrlLike;

class FathomTag extends BaseTag
{
    public function getName() {
        return "Fathom";
    }

    public function getCategory() {
        return self::CATEGORY_ANALYTICS;
    }

    public function getIcon() {
        return 'plugins/TagManager/images/icons/fathom.svg';
    }

    public function getParameters() {
        return array(
            $this->makeSetting('fathomURL', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = 'fathom URL';
                $field->description = 'The URL to your fathom instance.';
                $field->validators[] = new NotEmpty();
                $field->validators[] = new UrlLike();
            }),
            $this->makeSetting('siteID', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = 'site ID';
                $field->description = 'The site ID is shown when adding or editing a website.';
                $field->validators[] = new NotEmpty();
                $field->validators[] = new CharacterLength(5, 5);
            })
        );
    }

}
