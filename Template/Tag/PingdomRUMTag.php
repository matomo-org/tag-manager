<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\TagManager\Template\Tag;

use Piwik\Settings\FieldConfig;
use Piwik\Validators\NotEmpty;

class PingdomRUMTag extends BaseTag
{
    public function getName() {
        return "Pingdom Real User Monitoring (RUM)";
    }

    public function getCategory() {
        return self::CATEGORY_OTHERS;
    }

    public function getIcon() {
        return 'plugins/TagManager/images/icons/pingdom.svg';
    }

    public function getParameters() {
        return array(
            $this->makeSetting('pingdomROMId', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = 'Pingdom RUM Site ID';
                $field->description = 'You can get the Site ID by logging into Pingdom, going to "Monitoring" and clicking on "Real User Monitoring". Every added site will get its own Site ID.';
                $field->validators[] = new NotEmpty();
            }),
        );
    }

}
