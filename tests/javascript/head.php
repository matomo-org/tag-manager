<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

if (empty($cacheBuster)) {
    $cacheBuster = md5(uniqid(mt_rand(), true));
}

// Note: when you want to debug the piwik.js during the tests, you need to set a cache buster that is always the same
// between requests so the browser knows it is the same file and know where to breakpoint.
//$cacheBuster= 'nocb'; // uncomment to debug
$relativeRoot = '../../../..';

function printTemplates($type)
{
    $files = \_glob(PIWIK_DOCUMENT_ROOT . '/plugins/*/Template/' . $type . '/*.web.js');
    $files2 = \_glob(PIWIK_DOCUMENT_ROOT . '/plugins/*/Template/' . $type . '/*/*.web.js');
    $files = array_merge($files, $files2);
    foreach ($files as $file) {
        $name = str_replace('.web.js', '', basename($file));

        echo "TagManagerTemplate.$type.$name = " . file_get_contents($file);
    }
}

?>

<meta name="subject" content="foobartest">
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta property="og:type" content="game.achievement"/>

<script>
    var TagManagerTemplate = {Tag: {}, Trigger: {}, Variable: {}};

    <?php
    printTemplates('Tag');
    printTemplates('Trigger');
    printTemplates('Variable');
    ?>

    window.TagManagerTestHelper = {

        buildContainer: function (container, templates) {
            if (!container) {
                container = {};
            }
            if (!templates) {
                templates = {};
            }
            return new window.MatomoTagManager.Container(container, templates);
        },
        buildVariable: function (variable, templates) {
            if (!templates) {
                templates = {};
            }
            var container = this.buildContainer({}, templates);
            return window.MatomoTagManager._buildVariable(variable, container);
        },
        buildParameters: function (parameters) {
            return new window.MatomoTagManager.TemplateParameters(parameters);
        },
        makeTemplate: function (templateType, templateName, parameters) {
            var Template = TagManagerTemplate[templateType][templateName];
            if (!parameters.container) {
                parameters.container = this.buildContainer({}, {});
            }

            parameters = this.buildParameters(parameters);
            return new Template(parameters, window.MatomoTagManager);
        },
        buildTag: function (tag, templates, containerConfig) {
            if (!templates) {
                templates = {};
            }
            if (!tag) {
                tag = {};
            }
            if (!tag.name) {
                tag.name = 'Test Tag';
            }
            if (!tag.type) {
                tag.type = 'testTag';
            }
            if (!containerConfig) {
                containerConfig = {};
            }
            var container = this.buildContainer(containerConfig, templates);
            return new window.MatomoTagManager.Tag(tag, container);
        },
        buildTrigger: function (trigger, templates) {
            if (!templates) {
                templates = {};
            }
            if (!trigger) {
                trigger = {};
            }
            if (!trigger.name) {
                trigger.name = 'Test Tag';
            }
            if (!trigger.type) {
                trigger.type = 'testTag';
            }
            var container = this.buildContainer({}, templates);
            return new window.MatomoTagManager.Trigger(trigger, container);
        },
        resolveTemplateVariable: function (templateName, parameters) {
            return this.makeTemplate('Variable', templateName, parameters).get();
        },
        setUpTemplateTrigger: function (templateName, parameters, callback) {
            return this.makeTemplate('Trigger', templateName, parameters).setUp(callback);
        },
        fireTemplateTag: function (templateName, parameters) {
            return this.makeTemplate('Tag', templateName, parameters).fire();
        },
        triggerEvent: function (target, eventType, params, bubbles) {
            var theEvent;
            if (!bubbles) {
                bubbles = false;
            }

            if (document.createEvent) {
                if (typeof(Event) === 'function') {
                    theEvent = new Event(eventType, {bubbles: bubbles, cancelable: true});
                } else {
                    theEvent = document.createEvent('Event')
                    theEvent.initEvent(eventType, bubbles, true);
                }
                if (theEvent && theEvent.preventDefault) {
                    theEvent.preventDefault();
                }
                if (params && 'object' === typeof params) {
                    for (var i in params) {
                        theEvent[i] = params[i];
                    }
                }
                target.dispatchEvent(theEvent);
            } else {
                theEvent = document.createEventObject();
                if (theEvent && theEvent.preventDefault) {
                    theEvent.preventDefault();
                }
                if (params && 'object' === typeof params) {
                    for (var i in params) {
                        theEvent[i] = params[i];
                    }
                }
                target.fireEvent('on' + eventType, theEvent);
            }
        }
    };

    var dataLayer = [{'myinitial': 'value1', 'startLayer': 'now'}, {'another': 5}];
</script>

<script src="../../plugins/TagManager/javascripts/tagmanager.js?rand=<?php echo $cacheBuster ?>" type="text/javascript"></script>
