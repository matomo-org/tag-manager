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

class DriftTag extends BaseTag
{
    public function getName() {
        return "Drift";
    }
    
    public function getCategory() {
        return self::CATEGORY_SOCIAL;
    }

    public function getIcon() {
        return 'plugins/TagManager/images/icons/drift.svg';
    }

    public function getParameters() {
        return array(
            $this->makeSetting('driftId', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = 'Drift ID';
                $field->description = 'The Drift ID is the text between brackets without quotes at the end of the JS snippet: drift.load(\'mdp4r5w7rh3y\');';
                $field->validators[] = new NotEmpty();
                $field->validators[] = new CharacterLength(12, 12); 
            }),
        );
    }

}
