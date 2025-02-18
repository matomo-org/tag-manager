<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\TagManager\API;

use Piwik\Piwik;
use Piwik\Plugins\TagManager\Template\Tag\BaseTag;
use Piwik\Plugins\TagManager\Template\Trigger\BaseTrigger;
use Piwik\Plugins\TagManager\Template\Variable\BaseVariable;

class TemplateMetadata
{
    /**
     * @param BaseTag[]|BaseVariable[]|BaseTrigger[]|array $templates
     * @return mixed
     */
    public function formatTemplates($templates)
    {
        $byCategory = [];
        $analyticsCategory = [];
        foreach ($templates as $template) {
            if (is_array($template)) {
                $tagArray = $template;
            } else {
                $tagArray = $template->toArray();
            }

            $category = $tagArray['category'];
            if ($category === Piwik::translate('TagManager_CategoryAnalytics')) {
                if (!isset($analyticsCategory['types'])) {
                    $analyticsCategory = [
                        'name' => $category,
                        'types' => []
                    ];
                }
                $analyticsCategory['types'][] = $tagArray;
                continue;
            } elseif (!isset($byCategory[$category])) {
                $byCategory[$category] = [
                    'name' => $category,
                    'types' => []
                ];
            }
            $byCategory[$category]['types'][] = $tagArray;
        }

        $byCategory = array_values($byCategory);

        $othersTranslated = Piwik::translate('General_Others');
        usort($byCategory, function ($catA, $catB) use ($othersTranslated) {
            if ($catA['name'] === 'General_Others' || $catA['name'] === $othersTranslated) {
                return 1;
            }
            if ($catB['name'] === 'General_Others' || $catB['name'] === $othersTranslated) {
                return -1;
            }
            return strnatcmp($catA['name'], $catB['name']);
        });

        $this->sortByOrder($byCategory);
        if (!empty($analyticsCategory)) {
            $analyticsCategory = [$analyticsCategory];
            $this->sortByOrder($analyticsCategory);

            return array_merge($analyticsCategory, $byCategory);
        }

        return $byCategory;
    }

    private function sortByOrder(&$categories)
    {
        foreach ($categories as &$category) {
            usort($category['types'], function ($tagA, $tagB) {
                if ($tagA['order'] == $tagB['order']) {
                    return strnatcmp($tagA['name'], $tagB['name']);
                }
                return $tagA['order'] - $tagB['order'];
            });
        }
    }
}
