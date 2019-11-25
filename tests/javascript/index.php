<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */
?>
<div id="TagManager" mytagattribute="test" class="myTagTest myTagFoo myTagTest4" attributeWithoutValue data-tag-test>
    <div id="customTag1"
         title="My Title Title"
         alt="My Alt Title">

        lorem ipsum tag

    </div>
    <div id="customTag2" src="/path2/foobar2.mp4" title="My Title 2" alt="My Alt Title 2">

    </div>
    <div id="customTag3" alt="My Alt Title 3">
        my inner content <p id="customTag4">my test</p>
    </div>
    <div class="myTagFoo myTagBar">
        <div id="testTagMyInnerNode"> foo bar</div>
    </div>
    <foo id="customTag5"></foo>
</div>
<a href="https://www.example.click" id="ClickTagManager1" class="tag123 clicktag23">my link</a>
<a href="https://www.example.click/foo/bar" id="ClickTagManager2">my link</a>
<a href="https://www.example.click/foo/bar3" id="ClickTagManager3"><span><span id="ClickTagManager3Span">my link</span></span></a>

<script type="text/javascript">

    (function () {

        function sleepForMs(msToSleep)
        {
            var now;
            var expireDateTime = (new Date().getTime()) + msToSleep;

            if (expireDateTime) {
                do {
                    now = new Date();
                } while (now.getTime() < expireDateTime);
            }
        }

        function triggerEvent(target, eventType, params, bubbles) {
            return TagManagerTestHelper.triggerEvent(target, eventType, params, bubbles);
        }

        function buildContainer(container, templates)
        {
            return TagManagerTestHelper.buildContainer(container, templates);
        }

        function buildVariable(variable, templates) {
            return TagManagerTestHelper.buildVariable(variable, templates);
        }

        function buildTag(tag, templates) {
            return TagManagerTestHelper.buildTag(tag, templates);
        }

        function buildTrigger(trigger, templates) {
            return TagManagerTestHelper.buildTrigger(trigger, templates);
        }

        function buildCondition(condition) {
            if (!condition) {
                condition = {};
            }
            if (!condition.name) {
                condition.name = 'Test Tag';
            }
            if (!condition.type) {
                condition.type = 'testTag';
            }
            var container = buildContainer({}, {});
            return new window.MatomoTagManager.Condition(condition, container);
        }

        function buildParameters(parameters)
        {
            return TagManagerTestHelper.buildParameters(parameters);
        }

        function makeTemplate(templateType, templateName, parameters)
        {
            return TagManagerTestHelper.buildParameters(templateType, templateName, parameters);
        }

        function resolveTemplateVariable(templateName, parameters)
        {
            return TagManagerTestHelper.resolveTemplateVariable(templateName, parameters);
        }

        function setUpTemplateTrigger(templateName, parameters, callback)
        {
            return TagManagerTestHelper.setUpTemplateTrigger(templateName, parameters, callback);
        }

        function fireTemplateTag(templateName, parameters)
        {
            return TagManagerTestHelper.fireTemplateTag(templateName, parameters);
        }

        function getConstructorName(object)
        {
            if (object && object.constructor && object.constructor.name) {
                return object.constructor.name;
            }

            var functionName = /function\s([^(]{1,})\(/;
            var functionString = (object).toString();
            var matches = (functionName).exec(functionString);
            if (matches && matches.length > 1) {
                return matches[1].replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
            }
        }

        module('TagManager', {teardown: function () {
           MatomoTagManager.storage.local.clearAll();
           MatomoTagManager.storage.session.clearAll();
        }});

        test("Matomo TagManager", function() {
            expect(30);

            equal( typeof window.MatomoTagManager, 'object', 'TagManager' );

            var TagManager = window.MatomoTagManager;
            strictEqual( typeof TagManager.dataLayer, 'object', 'TagManager.dataLayer' );
            deepEqual( TagManager.containers, [], 'TagManager.containers' );
            strictEqual( typeof TagManager.url, 'object', 'TagManager.url' );
            strictEqual( typeof TagManager.date, 'object', 'TagManager.date' );
            strictEqual( typeof TagManager.utils, 'object', 'TagManager.utils' );
            strictEqual( typeof TagManager.debug, 'object', 'TagManager.debug' );
            strictEqual( typeof TagManager.dom, 'object', 'TagManager.dom' );
            strictEqual( typeof TagManager.window, 'object', 'TagManager.window' );
            strictEqual( typeof TagManager.storage, 'object', 'TagManager.storage' );
            strictEqual( typeof TagManager.throwError, 'function', 'TagManager.throwError' );
            strictEqual( typeof TagManager.Variable, 'function', 'TagManager.Variable' );
            strictEqual( typeof TagManager.Condition, 'function', 'TagManager.Condition' );
            strictEqual( typeof TagManager.TemplateParameters, 'function', 'TagManager.TemplateParameters' );
            strictEqual( typeof TagManager.Trigger, 'function', 'TagManager.Trigger' );
            strictEqual( typeof TagManager.Tag, 'function', 'TagManager.Tag' );
            strictEqual( typeof TagManager.Container, 'function', 'TagManager.Container' );
            strictEqual( typeof TagManager.addContainer, 'function', 'TagManager.addContainer' );
            strictEqual( typeof TagManager.enableDebugMode, 'function', 'TagManager.enableDebugMode' );
            strictEqual(true, TagManager.THROW_ERRORS, 'TagManager.THROW_ERRORS, is enabled by default' );

            var timeScriptLoaded = TagManager.dataLayer.get('mtm.mtmScriptLoadedTime');
            ok(timeScriptLoaded > 10000, 'sets the loaded time in datalayer');

            strictEqual('value1', TagManager.dataLayer.get('myinitial'), 'sets initial dataLayer values from window');
            strictEqual('now', TagManager.dataLayer.get('startLayer'), 'sets initial dataLayer values from window');
            strictEqual(5, TagManager.dataLayer.get('another'), 'sets initial dataLayer values from window');

            /** THROWERROR */
            try {
                TagManager.throwError('my error message');
                ok(false, 'throwError, an expected exception has not been thrown');
            } catch (e) {
                strictEqual('my error message', e.message, 'throwError, throws an error when enabled');
            }

            TagManager.THROW_ERRORS = false;
            try {
                TagManager.throwError('my error message');
                ok(true, 'throwError, should not throw an error when disabled');
            } catch (e) {
                ok(false, 'throwError, an unexpected exception has been thrown');
            }

            TagManager.THROW_ERRORS = true; // restore original setting

            /** PUSH() */
            strictEqual(undefined, TagManager.dataLayer.get('myvalue'), 'push(), has no value set for key');
            TagManager.dataLayer.push({myvalue: 'test'});
            strictEqual('test', TagManager.dataLayer.get('myvalue'), 'push(), has value set for key after pushing it');

            /** ADDCONTAINER **/
            var container = TagManager.addContainer({}, {});
            deepEqual([container], TagManager.containers, 'addContainer(), creates container and adds the container');
            strictEqual('Container', getConstructorName(container), 'addContainer(), creates an actual Container instance');

            TagManager.containers = []; // restore original setting
        });

        test("Matomo TagManager DataLayer", function() {
            expect(26);

            var dataLayer = window.MatomoTagManager.dataLayer;

            equal( typeof dataLayer.push, 'function', 'dataLayer.push' );
            equal( typeof dataLayer.set, 'function', 'TagManager.set' );
            equal( typeof dataLayer.get, 'function', 'TagManager.get' );
            equal( typeof dataLayer.reset, 'function', 'TagManager.reset' );
            equal( typeof dataLayer.on, 'function', 'TagManager.on' );
            equal( typeof dataLayer.off, 'function', 'TagManager.off' );

            dataLayer.set('foobar', 'myValue');
            strictEqual( 'myValue', dataLayer.get('foobar'), 'DataLayer.set & .get' );
            strictEqual( undefined, dataLayer.get('bazfooooo'), 'DataLayer.get key does not exist' );

            dataLayer.set('foobar2', 10);
            strictEqual( 10, dataLayer.get('foobar2'), 'DataLayer.get can return integer' );

            dataLayer.set('foobar3', [5, 10, 20]);
            deepEqual( [5, 10, 20], dataLayer.get('foobar3'), 'DataLayer.get can return object' );

            strictEqual( 'myValue', dataLayer.get('foobar'), 'DataLayer.get old values are still accessible' );
            dataLayer.set('foobar', 'newvaluE');
            strictEqual( 'newvaluE', dataLayer.get('foobar'), 'DataLayer.set can overwrite a value' );

            dataLayer.set('barobj', {mytest: {myvalue: 'test', myvalue2: 'test2'}})
            strictEqual( 'test', dataLayer.get('barobj.mytest.myvalue'), 'DataLayer.get resolves dot to value from object' );

            dataLayer.set('barobj.mytest.myvalue2', 'myothervalue')
            strictEqual( 'myothervalue', dataLayer.get('barobj.mytest.myvalue2'), 'DataLayer.get does not resolve dot from object when such key is set' );

            dataLayer.set('barfunc', function () { return 'funcvalue3'; });
            strictEqual( 'funcvalue3', dataLayer.get('barfunc'), 'DataLayer.get will trigger function if a function is set' );

            dataLayer.set('barobjfunc', {get: function () { return 'objfuncvalue4'; }});
            strictEqual( 'objfuncvalue4', dataLayer.get('barobjfunc'), 'DataLayer.get will trigger function if a object with a get function is set' );

            /** PUSH **/
            strictEqual(undefined, dataLayer.push('foobar'), 'DataLayer.push does not fail when not an object given' );
            dataLayer.push({'foobar': 'overwrittenval', 'event': 'myevent', 'foo-_5ne?w': 'myvalue', 'こんにちは': 'hello'});
            strictEqual('overwrittenval', dataLayer.get('foobar'), 'DataLayer.push can set multiple values at once and overwrite value' );
            strictEqual('myevent', dataLayer.get('event'), 'DataLayer.push event wont fail if no containers are configured' );
            strictEqual('myvalue', dataLayer.get('foo-_5ne?w'), 'DataLayer.push possible to use dashes etc' );
            strictEqual('hello', dataLayer.get('こんにちは'), 'DataLayer.push possible to use any character' );

            /** WHEN DATA LAYER IS NOT SET UP YET **/
            dataLayer.reset();

            strictEqual(undefined, dataLayer.get('event'), 'DataLayer.reset unsets previous values' );

            var events1 = [];
            var events2 = [];
            dataLayer.on(function (value) {
                events1.push(value);
            });
            var unsubscribeEvent2 = dataLayer.on(function (value) {
                events2.push(value);
            });
            var event1 = {'foobar': 'delayed', 'event': 'myeventDelayed'};
            var event2 = {'event': 'WindowLoaded', 'time': 0232329};
            dataLayer.push(event1);

            deepEqual([event1], events1, 'DataLayer.push notifies all handlers' );
            deepEqual([event1], events2, 'DataLayer.push notifies all handlers' );

            dataLayer.off(unsubscribeEvent2);
            dataLayer.push(event2);

            deepEqual([event1, event2], events1, 'DataLayer.push after .off callback1 should still receive events' );
            deepEqual([event1], events2, 'DataLayer.push after .off callback2 should no longer receive events' );
            dataLayer.reset();
        });

        test("Matomo TagManager date", function() {
            expect(18);

            var dateHelper = window.MatomoTagManager.date;

            equal(typeof dateHelper.matchesDateRange, 'function', 'dateHelper.matchesDateRange');

            // matchesDate
            var now = new Date();
            var pastDate = new Date('2014/01/01 04:04:04 UTC');
            var pastDateCet = new Date('2014/01/01 05:04:04 GMT+0100 (CET)'); // = '2014/01/01 04:04:04 UTC'

            var tests = [
                // should pass when no start and end date given
                {expected: true,  now: now, start: false, end: false},
                {expected: true,  now: now, start: null, end: null},
                // no end date
                {expected: true,  now: pastDate, start: '2014/01/01 03:04:04 UTC', end: ''},
                {expected: false, now: pastDate, start: '2014/01/01 05:04:04 UTC', end: ''},
                // no start date
                {expected: false, now: pastDate, start: null, end: '2014/01/01 03:04:04 UTC'},
                {expected: true,  now: pastDate, start: null, end: '2014/01/01 05:04:04 UTC'},
                // both start and end date
                {expected: true, now: pastDate, start: '2014/01/01 03:04:04 UTC', end: '2014/01/01 05:04:04 UTC'},
                {expected: false, now: pastDate, start: '2014/01/01 06:04:04 UTC', end: '2014/01/01 08:04:04 UTC'},
                {expected: false, now: pastDate, start: '2014/01/01 01:04:04 UTC', end: '2014/01/01 03:04:04 UTC'},
                // test different timezone
                {expected: true, now: pastDate, start: '2014/01/01 04:04:03 GMT+0100 (CET)', end: '2014/01/01 06:04:04 GMT+0100 (CET)'},
                {expected: false, now: pastDate, start: '2014/01/01 07:04:04 GMT+0100 (CET)', end: '2014/01/01 09:04:04 GMT+0100 (CET)'},
                {expected: false, now: pastDate, start: '2014/01/01 02:04:04 GMT+0100 (CET)', end: '2014/01/01 04:04:05 GMT+0100 (CET)'},
                // now is in different timezone but other date is utc
                {expected: true, now: pastDateCet, start: '2014/01/01 03:04:05 UTC', end: '2014/01/01 05:04:03 UTC'},
                {expected: false, now: pastDateCet, start: '2014/01/01 06:04:04 UTC', end: '2014/01/01 08:04:04 UTC'},
                {expected: false, now: pastDateCet, start: '2014/01/01 01:04:04 UTC', end: '2014/01/01 03:04:04 UTC'},
            ];

            for (var i = 0; i < tests.length; i++) {
                var atest = tests[i];
                var result = dateHelper.matchesDateRange(atest.now, atest.start, atest.end);
                strictEqual(atest.expected, result, 'matchesDate: ' + JSON.stringify(atest));
            }

            try {
                dateHelper.matchesDateRange(now, 'invalid Date', null);
                ok(false, 'an expected exception has not been thrown');
            } catch (e) {
                strictEqual('Invalid startDateTime given', e.message, 'Start date time is validated');
            }

            try {
                dateHelper.matchesDateRange(now, null, 'invalid Date');
                ok(false, 'an expected exception has not been thrown');
            } catch (e) {
                strictEqual('Invalid endDateTime given', e.message, 'End date time is validated');
            }

        });

        test("Matomo TagManager URL", function() {
            expect(44);

            var urlHelper = window.MatomoTagManager.url;

            equal(typeof urlHelper.parseUrl, 'function', 'urlHelper.parseUrl');
            equal(typeof urlHelper.decodeSafe, 'function', 'urlHelper.decodeSafe');
            equal(typeof urlHelper.getQueryParameter, 'function', 'urlHelper.getQueryParameter');

            equal('#&2343434k!"', urlHelper.decodeSafe('%23%262343434k!%22'), 'should be able to decode value');

            var search1 = 'module=TagManager&aCtiOn=manage&idSite=&period=day&date=yesterday&barencoded=%23%262343434k!%22';
            var search2 = '&' + search1;
            var search3 = '?' + search1

            var searches = [search1, search2, search3];
            var i = 0, search;
            for (i; i < searches.length; i++) {
                search = searches[i];

                strictEqual('day', urlHelper.getQueryParameter('period', search), 'urlHelper.getQueryParameter (i=' + i + '), should return value for existing search param period');
                strictEqual(null, urlHelper.getQueryParameter('iod', search), 'urlHelper.getQueryParameter (i=' + i + '), should not match when it only match parts of the URL parameter');
                strictEqual('TagManager', urlHelper.getQueryParameter('module', search), 'urlHelper.getQueryParameter (i=' + i + '), should return value for existing search param module');
                strictEqual('manage', urlHelper.getQueryParameter('aCtiOn', search), 'urlHelper.getQueryParameter (i=' + i + '), should find params case insensitive');
                strictEqual('#&2343434k!"', urlHelper.getQueryParameter('barencoded', search), 'urlHelper.getQueryParameter (i=' + i + '), should decode value');
                strictEqual('', urlHelper.getQueryParameter('idSite', search), 'urlHelper.getQueryParameter (i=' + i + '), should return empty string if param exists with no value');
                strictEqual(null, urlHelper.getQueryParameter('foobar', search), 'urlHelper.getQueryParameter (i=' + i + '), should return null for not existing search param');
                strictEqual(null, urlHelper.getQueryParameter('', ''), 'urlHelper.getQueryParameter (i=' + i + '), should return null when no search exists');
            }

            var url = 'https://apache.matomo:8080/tests/javascript/?testNumber=37#34_test';
            strictEqual(url, urlHelper.parseUrl(url, 'href'), 'urlHelper.parseUrl, href');
            strictEqual('8080', urlHelper.parseUrl(url, 'port'), 'urlHelper.parseUrl, port');
            strictEqual('https://apache.matomo:8080', urlHelper.parseUrl(url, 'origin'), 'urlHelper.parseUrl, origin');
            strictEqual('testNumber=37', urlHelper.parseUrl(url, 'search'), 'urlHelper.parseUrl, search');
            strictEqual('/tests/javascript/', urlHelper.parseUrl(url, 'pathname'), 'urlHelper.parseUrl, pathname');
            strictEqual('https', urlHelper.parseUrl(url, 'protocol'), 'urlHelper.parseUrl, protocol');
            strictEqual('34_test', urlHelper.parseUrl(url, 'hash'), 'urlHelper.parseUrl, hash');
            strictEqual('apache.matomo:8080', urlHelper.parseUrl(url, 'host'), 'urlHelper.parseUrl, host');
            strictEqual('apache.matomo', urlHelper.parseUrl(url, 'hostname'), 'urlHelper.parseUrl, hostname');
            strictEqual(undefined, urlHelper.parseUrl(url, 'invalidpart'), 'urlHelper.parseUrl, invalid part');

            strictEqual('443', urlHelper.parseUrl('https://apache.matomo/tests', 'port'), 'urlHelper.parseUrl, reads default https port');
            strictEqual('80', urlHelper.parseUrl('http://apache.matomo/tests', 'port'), 'urlHelper.parseUrl, reads default http port');

            var relativeUrl = 'foobar.php?testNumber=37';
            strictEqual(window.location.origin + window.location.pathname + relativeUrl, urlHelper.parseUrl(relativeUrl, 'href'), 'urlHelper.parseUrl, relativeUrl, href');
            strictEqual('testNumber=37', urlHelper.parseUrl(relativeUrl, 'search'), 'urlHelper.parseUrl, relativeUrl, search');
            strictEqual('/tests/javascript/foobar.php', urlHelper.parseUrl(relativeUrl, 'pathname'), 'urlHelper.parseUrl, relativeUrl, pathname');

            strictEqual('', urlHelper.parseUrl(relativeUrl, 'hash'), 'urlHelper.parseUrl, hash when no hash');
        });

        test("Matomo TagManager Utils", function() {
            expect(304);

            var utils = window.MatomoTagManager.utils;

            equal(typeof utils.trim, 'function', 'utils.trim');
            equal(typeof utils.isDefined, 'function', 'utils.isDefined');
            equal(typeof utils.isFunction, 'function', 'utils.isFunction');
            equal(typeof utils.isObject, 'function', 'utils.isObject');
            equal(typeof utils.isString, 'function', 'utils.isString');
            equal(typeof utils.isNumber, 'function', 'utils.isNumber');
            equal(typeof utils.isArray, 'function', 'utils.isArray');
            equal(typeof utils.indexOfArray, 'function', 'utils.indexOfArray');
            equal(typeof utils.compare, 'function', 'utils.compare');
            equal(typeof utils.hasProperty, 'function', 'utils.hasOwnProperty');
            equal(typeof utils.setMethodWrapIfNeeded, 'function', 'utils.setMethodWrapIfNeeded');

            strictEqual('test', utils.trim('   test   '), 'trim, removes whitespace');
            strictEqual(4, utils.trim(4), 'trim, does not fail if value is not a string');

            strictEqual(true, utils.isDefined(4), 'isDefined, when value is defined and a number');
            strictEqual(true, utils.isDefined(null), 'isDefined, when value is defined and null');
            strictEqual(false, utils.isDefined(undefined), 'isDefined, when value is not defined');

            strictEqual(true, utils.isString('myvalue'), 'isString, when value actually is a string');
            strictEqual(true, utils.isString(String('myvalue')), 'isString, when value actually is a string object');
            strictEqual(false, utils.isString(4), 'isString, when value is not a string but a number');
            strictEqual(false, utils.isString(null), 'isString, when value is not a string but null');
            strictEqual(false, utils.isString(undefined), 'isString, when value is not a string but undefined');

            strictEqual(false, utils.isNumber('5'), 'isNumber, when actually a string');
            strictEqual(true, utils.isNumber(5), 'isNumber, when value actually is an int number');
            strictEqual(true, utils.isNumber(4.4), 'isNumber, when value is float number');

            strictEqual(true, utils.isObject({test:'foo'}), 'isObject, when value actually is an object');
            strictEqual(true, utils.isObject([5]), 'isObject, an array is an object too');
            strictEqual(false, utils.isObject(4), 'isObject, when value is not an object but a number');
            strictEqual(false, utils.isObject(null), 'isObject, when value is not an object but null');
            strictEqual(false, utils.isObject(undefined), 'isObject, when value is not an object but undefined');

            strictEqual(true, utils.isFunction(function () {}), 'isFunction, when value actually is a function');
            strictEqual(false, utils.isFunction({test:'foo'}), 'isFunction, when value actually is not a function but an object');
            strictEqual(false, utils.isFunction(null), 'isFunction, when value is not a function but null');
            strictEqual(false, utils.isFunction(undefined), 'isFunction, when value is not an object but undefined');

            strictEqual(true, utils.isArray([5]), 'isArray, when value actually is an array');
            strictEqual(false, utils.isArray({length: 5}), 'isArray, is not an array when it only looks like an array');
            strictEqual(false, utils.isArray(null), 'isArray, when value is not an array but null');
            strictEqual(false, utils.isArray(undefined), 'isArray, when value is not an array but undefined');

            strictEqual(-1, utils.indexOfArray({test: '1'}, 'search'), 'indexOfArray returns -1 when input is not an array');
            strictEqual(-1, utils.indexOfArray(false, 'search'), 'indexOfArray returns -1 when input is empty');
            strictEqual(-1, utils.indexOfArray(null, 'search'), 'indexOfArray returns -1 when input is empty');
            strictEqual(-1, utils.indexOfArray('', 'search'), 'indexOfArray returns -1 when input is empty');
            strictEqual(-1, utils.indexOfArray(['t', '3434', 5], 'search'), 'indexOfArray returns -1 when term is not included');
            strictEqual(-1, utils.indexOfArray(['t', '3434', 5], '5'), 'indexOfArray returns -1 when not found because it has to be strict equal');
            strictEqual(2, utils.indexOfArray(['t', '3434', 5], 5), 'indexOfArray returns when term matches last element');
            strictEqual(1, utils.indexOfArray(['t', '3434', 5], '3434'), 'indexOfArray returns when term is first element');
            strictEqual(0, utils.indexOfArray(['t', '3434', 5], 't'), 'indexOfArray when term is beginning');

            strictEqual(false, utils.hasProperty({foo: 'test'}, 'test'), 'hasOwnProperty, has not own property');
            strictEqual(true, utils.hasProperty({foo: 'test'}, 'foo'), 'hasOwnProperty, has own property');


            var x = {};
            var calledX = false;
            utils.setMethodWrapIfNeeded(x, 'foo', function () {
                calledX = true;
                return 51;
            });
            strictEqual(false, calledX, 'setMethodWrapIfNeeded, should not directly call method');
            strictEqual(51, x.foo(), 'setMethodWrapIfNeeded, should return the value of the function');
            strictEqual(true, calledX, 'setMethodWrapIfNeeded, should call callback when being executed');

            var calledX = false;
            var calledY = false;
            var x = {myExistingMethod:function () { calledY = true;  return 'existingM33'; }};
            utils.setMethodWrapIfNeeded(x, 'myExistingMethod', function () {
                calledX = true;
                return 51;
            });
            strictEqual(false, calledX, 'setMethodWrapIfNeeded, should not directly call replace method');
            strictEqual(false, calledY, 'setMethodWrapIfNeeded, should not directly call original method');
            strictEqual('existingM33', x.myExistingMethod(), 'setMethodWrapIfNeeded, should return the value of the original function');
            strictEqual(true, calledX, 'setMethodWrapIfNeeded, should also execute the replaced function');

            // _matchesTargetValue
            var tests = [
                // equals compares lower case
                {expected: true, actualValue: 'FoOBar', type: 'equals', expectedValue: 'fooBar'},
                {expected: true, actualValue: 'foobar', type: 'equals', expectedValue: 'foobar'},
                {expected: true, actualValue: 'fooBar', type: 'equals', expectedValue: 'fooBar'},
                {expected: true, actualValue: '', type: 'equals', expectedValue: ''},
                {expected: false, actualValue: ' fooBar ', type: 'equals', expectedValue: 'fooBar'},
                {expected: false, actualValue: '_test', type: 'equals', expectedValue: 'fooBar'},
                {expected: false, actualValue: '', type: 'equals', expectedValue: 'fooBar'},
                {expected: true, actualValue: '55', type: 'equals', expectedValue: 55},
                {expected: true, actualValue: 55, type: 'equals', expectedValue: '55'},

                // equals exactly
                {expected: true, actualValue: 'fooBar', type: 'equals_exactly', expectedValue: 'fooBar'},
                {expected: true, actualValue: '', type: 'equals_exactly', expectedValue: ''},
                {expected: false, actualValue: 'FoOBar', type: 'equals_exactly', expectedValue: 'fooBar'},
                {expected: true, actualValue: 'foobar', type: 'equals_exactly', expectedValue: 'foobar'},
                {expected: false, actualValue: ' fooBar ', type: 'equals_exactly', expectedValue: 'fooBar'},
                {expected: false, actualValue: '_test', type: 'equals_exactly', expectedValue: 'fooBar'},
                {expected: false, actualValue: '', type: 'equals_exactly', expectedValue: 'fooBar'},
                {expected: true, actualValue: '55', type: 'equals_exactly', expectedValue: 55},
                {expected: true, actualValue: 55, type: 'equals_exactly', expectedValue: '55'},

                // contains compares lower case
                {expected: true, actualValue: 'FoOBar', type: 'contains', expectedValue: 'fooBar'},
                {expected: true, actualValue: 'testfoobarbaz', type: 'contains', expectedValue: 'foobar'},
                {expected: true, actualValue: 'testfOoBarBaz', type: 'contains', expectedValue: 'foObAr'},
                {expected: true, actualValue: '', type: 'contains', expectedValue: ''},
                {expected: true, actualValue: ' fooBar ', type: 'contains', expectedValue: 'fooBar'},
                {expected: false, actualValue: '_test', type: 'contains', expectedValue: 'fooBar'},
                {expected: false, actualValue: '', type: 'contains', expectedValue: 'fooBar'},
                {expected: true, actualValue: 55555, type: 'contains', expectedValue: 5},
                {expected: false, actualValue: 55555, type: 'contains', expectedValue: 6},

                // starts_with compares lower case
                {expected: true, actualValue: 'FoOBar', type: 'starts_with', expectedValue: 'fooBar'},
                {expected: true, actualValue: 'foobarbaz', type: 'starts_with', expectedValue: 'foobar'},
                {expected: true, actualValue: 'fOoBarBaz', type: 'starts_with', expectedValue: 'foObAr'},
                {expected: true, actualValue: '', type: 'starts_with', expectedValue: ''},
                {expected: false, actualValue: 'testfOoBar', type: 'starts_with', expectedValue: 'foObAr'},
                {expected: false, actualValue: ' fooBar ', type: 'starts_with', expectedValue: 'fooBar'},
                {expected: false, actualValue: '_test', type: 'starts_with', expectedValue: 'fooBar'},
                {expected: false, actualValue: '', type: 'starts_with', expectedValue: 'fooBar'},
                {expected: false, actualValue: '', type: 'starts_with', expectedValue: 'fooBar'},
                {expected: true, actualValue: 5678, type: 'starts_with', expectedValue: 567},
                {expected: false, actualValue: 5678, type: 'starts_with', expectedValue: 569},

                // ends_with compares lower case
                {expected: true, actualValue: 'FoOBar', type: 'ends_with', expectedValue: 'fooBar'},
                {expected: false, actualValue: 'foobarbaz', type: 'ends_with', expectedValue: 'foobar'},
                {expected: false, actualValue: 'fOoBarBaz', type: 'ends_with', expectedValue: 'foObAr'},
                {expected: true, actualValue: 'BazfOoBar', type: 'ends_with', expectedValue: 'foObAr'},
                {expected: true, actualValue: '', type: 'ends_with', expectedValue: ''},
                {expected: false, actualValue: ' fooBar ', type: 'ends_with', expectedValue: 'fooBar'},
                {expected: false, actualValue: '_test', type: 'ends_with', expectedValue: 'fooBar'},
                {expected: false, actualValue: '', type: 'ends_with', expectedValue: 'fooBar'},
                {expected: true, actualValue: 5678, type: 'ends_with', expectedValue: 78},
                {expected: false, actualValue: 5678, type: 'ends_with', expectedValue: 79},

                // greater_than
                {expected: true, actualValue: '6', type: 'greater_than', expectedValue: '5'},
                {expected: false, actualValue: '5', type: 'greater_than', expectedValue: '5'},
                {expected: false, actualValue: '4', type: 'greater_than', expectedValue: '5'},

                // greater_than_or_equals
                {expected: true, actualValue: '6', type: 'greater_than_or_equals', expectedValue: '5'},
                {expected: true, actualValue: '5', type: 'greater_than_or_equals', expectedValue: '5'},
                {expected: false, actualValue: '4', type: 'greater_than_or_equals', expectedValue: '5'},

                // lower_than
                {expected: false, actualValue: '6', type: 'lower_than', expectedValue: '5'},
                {expected: false, actualValue: '5', type: 'lower_than', expectedValue: '5'},
                {expected: true, actualValue: '4', type: 'lower_than', expectedValue: '5'},

                // lower_than_or_equals
                {expected: false, actualValue: '6', type: 'lower_than_or_equals', expectedValue: '5'},
                {expected: true, actualValue: '5', type: 'lower_than_or_equals', expectedValue: '5'},
                {expected: true, actualValue: '4', type: 'lower_than_or_equals', expectedValue: '5'},

                // regexp
                {expected: true, actualValue: 'https://test', type: 'regexp', expectedValue: '^http(.*)'},
                {expected: false, actualValue: 'https://test', type: 'regexp', expectedValue: '^hTTp(.*)'},
                {expected: false, actualValue: 'htTpS://teSt', type: 'regexp', expectedValue: '^http(.*)'},
                {expected: false, actualValue: 'https://test', type: 'regexp', expectedValue: 'http$'},
                {expected: true, actualValue: 'foohttp', type: 'regexp', expectedValue: 'http$'},
                {expected: true, actualValue: 'foohTTp', type: 'regexp', expectedValue: 'hTTp$'},
                {expected: true, actualValue: 'http', type: 'regexp', expectedValue: 'http$'},
                {expected: false, actualValue: 5, type: 'regexp', expectedValue: 'http$'},

                // regexp_ignore_case
                {expected: true, actualValue: 'https://test', type: 'regexp_ignore_case', expectedValue: '^http(.*)'},
                {expected: true, actualValue: 'https://test', type: 'regexp_ignore_case', expectedValue: '^hTTp(.*)'},
                {expected: true, actualValue: 'htTpS://teSt', type: 'regexp_ignore_case', expectedValue: '^http(.*)'},
                {expected: false, actualValue: 'https://test', type: 'regexp_ignore_case', expectedValue: 'http$'},
                {expected: true, actualValue: 'foohttp', type: 'regexp_ignore_case', expectedValue: 'http$'},
                {expected: true, actualValue: 'foohTTp', type: 'regexp_ignore_case', expectedValue: 'hTTp$'},
                {expected: true, actualValue: 'http', type: 'regexp_ignore_case', expectedValue: 'http$'},
                {expected: false, actualValue: 5, type: 'regexp_ignore_case', expectedValue: 'http$'},

                // match_css_selector
                {expected: true, actualValue: document.getElementById('customTag2'), type: 'match_css_selector', expectedValue: '#TagManager #customTag2'},
                {expected: true, actualValue: document.getElementById('customTag2'), type: 'match_css_selector', expectedValue: '.myTagFoo #customTag2'},
                {expected: true, actualValue: document.getElementById('customTag2'), type: 'match_css_selector', expectedValue: '#customTag2'},
                {expected: false, actualValue: document.getElementById('customTag2'), type: 'match_css_selector', expectedValue: 'body'},
                {expected: false, actualValue: document.getElementById('customTag2'), type: 'match_css_selector', expectedValue: ''},
                {expected: false, actualValue: document.getElementById('customTag2'), type: 'match_css_selector', expectedValue: '#customTag3'},
                {expected: false, actualValue: document.getElementById('customTag2'), type: 'match_css_selector', expectedValue: '#noerkerke #customTag2'}
            ];

            function compareSummary(atest)
            {
                var test = {};
                test.expected = atest.expected;
                test.type = atest.type;
                if (atest.type !== 'match_css_selector') {
                    test.actualValue = atest.actualValue;
                }
                test.expectedValue = atest.expectedValue;
                return JSON.stringify(test);
            }

            var atest, result;
            for (var i = 0; i < tests.length; i++) {
                atest = tests[i];
                result = utils._compare(atest.actualValue, atest.expectedValue, atest.type);
                strictEqual(atest.expected, result, '_compare: ' + compareSummary(atest));

                result = utils.compare(atest.actualValue, atest.expectedValue, atest.type);
                strictEqual(atest.expected, result, '_compare: ' + compareSummary(atest));

                result = utils.compare(atest.actualValue, atest.expectedValue, 'not_' + atest.type);
                strictEqual(!atest.expected, result, '_compare: ' + compareSummary(atest));
            }
        });

        test("Matomo TagManager dom", function() {
            expect(78);

            var dom = window.MatomoTagManager.dom;

            equal(typeof dom.loadScriptUrl, 'function', 'dom.loadScriptUrl');
            equal(typeof dom.getScrollLeft, 'function', 'dom.getScrollLeft');
            equal(typeof dom.getScrollTop, 'function', 'dom.getScrollTop');
            equal(typeof dom.getDocumentHeight, 'function', 'dom.getDocumentHeight');
            equal(typeof dom.getDocumentWidth, 'function', 'dom.getDocumentWidth');
            equal(typeof dom.addEventListener, 'function', 'dom.addEventListener');
            equal(typeof dom.getElementAttribute, 'function', 'dom.getElementAttribute');
            equal(typeof dom.getElementClassNames, 'function', 'dom.getElementClassNames');
            equal(typeof dom.getElementText, 'function', 'dom.getElementText');
            equal(typeof dom.byId, 'function', 'dom.byId');
            equal(typeof dom.byClassName, 'function', 'dom.byClassName');
            equal(typeof dom.byTagName, 'function', 'dom.byTagName');
            equal(typeof dom.bySelector, 'function', 'dom.bySelector');
            equal(typeof dom.onLoad, 'function', 'dom.onLoad');
            equal(typeof dom.onReady, 'function', 'dom.onReady');
            equal(typeof dom.isElementContext, 'function', 'dom.isElementContext');
            equal(typeof dom.isAttributeContext, 'function', 'dom.isAttributeContext');

            var scrollLeft = dom.getScrollLeft();
            var scrollTop = dom.getScrollTop();
            var docHeight = dom.getDocumentHeight();
            var docWidth = dom.getDocumentWidth();
            strictEqual(0, scrollLeft, 'getScrollLeft, returns left position ' + scrollLeft);
            ok(scrollTop >= 0, 'getScrollTop, returns top position ' + scrollTop);
            ok(docHeight > 100, 'getDocumentHeight, returns height ' + docHeight);
            ok(docWidth > 100, 'getDocumentWidth, returns width ' + docWidth);

            var TagManagerNode = document.getElementById('TagManager');

            strictEqual('lorem ipsum tag my inner content my test foo bar', dom.getElementText(TagManagerNode), 'getElementText, returns inner text');
            strictEqual('', dom.getElementAttribute(TagManagerNode, 'attributeWithoutValue'), 'getElementAttribute, when attribute exists but has no value');
            strictEqual('test', dom.getElementAttribute(TagManagerNode, 'mytagattribute'), 'getElementAttribute, when attribute does exist and has value');
            strictEqual(null, dom.getElementAttribute(TagManagerNode, 'foobarnotexists'), 'getElementAttribute, when attribute does not exist');

            var element = dom.byId('foobarwww');
            strictEqual(null, element, 'byId, when element does not exist');

            element = dom.byId('customTag2');
            strictEqual('customTag2', element.id, 'byId, when element exists');

            element = dom.byId('#customTag2');
            strictEqual('customTag2', element.id, 'byId, removes leading hash');

            var element = dom.byTagName();
            deepEqual([], element, 'byTagName, when no tag name given');

            var element = dom.byTagName('foobarwww');
            deepEqual([], element, 'byTagName, when no such element exists');

            var element = dom.byTagName('foo');
            deepEqual(1, element.length, 'byTagName, when no such element exists');

            element = dom.byClassName('foobarwww');
            deepEqual([], element, 'byClassName, when classname does not exist');

            element = dom.byClassName();
            deepEqual([], element, 'byClassName, no classname provided');

            element = dom.byClassName('myTagFoo');
            strictEqual(2, element.length, 'byClassName, when elements match');
            strictEqual('TagManager', element[0].id, 'byClassName, when elements match');

            element = dom.bySelector('.foobarwww');
            deepEqual([], element, 'bySelector, when classname does not exist');

            element = dom.bySelector();
            deepEqual([], element, 'bySelector, no selector provided');

            element = dom.bySelector('.myTagFoo');
            strictEqual(2, element.length, 'bySelector, when elements match');
            strictEqual('TagManager', element[0].id, 'byClassName, when elements match');

            strictEqual('myTagTest myTagFoo myTagTest4', dom.getElementClassNames(dom.byId('TagManager')), 'getElementClassNames, when has classes');
            strictEqual('', dom.getElementClassNames(dom.byId('customTag3')), 'getElementClassNames, when has no classes');

            strictEqual(false, dom.isElementContext(), 'isElementContext, no value given');
            strictEqual(false, dom.isElementContext('<div>var foo ="', 'script'), 'isElementContext, not a script element');
            strictEqual(false, dom.isElementContext('<div>var foo =""</div>', 'script'), 'isElementContext, not a closing script element');
            strictEqual(true, dom.isElementContext('<script>var foo ="', 'script'), 'isElementContext, in the middle of a script element');
            strictEqual(true, dom.isElementContext('<scRipT>var foo ="', 'script'), 'isElementContext, in the middle of a script element case insensitive');
            strictEqual(false, dom.isElementContext('<div>var foo < /script>', 'script'), 'isElementContext, not an opening script element');
            strictEqual(true, dom.isElementContext('<script>var foo ="</ div>', 'script'), 'isElementContext, not a closing script element');
            strictEqual(false, dom.isElementContext('<script>var foo ="</ div>', 'style'), 'isElementContext, different element');
            strictEqual(true, dom.isElementContext('<style>var foo ="</ div>', 'style'), 'isElementContext, different element');
            strictEqual(false, dom.isElementContext('<style>var foo ="</ div>', 'script'), 'isElementContext, different element 2');
            strictEqual(false, dom.isElementContext('<script>var foo =""< / script>', 'script'), 'isElementContext, not in a script element');
            strictEqual(false, dom.isElementContext('<script>var foo =""</'+ 'scrIpT>', 'ScRipt'), 'isElementContext, not in a script element');

            strictEqual(false, dom.isAttributeContext('<a href="foo">', 'href'), 'isAttributeContext, is not in that context as tag is closed');
            strictEqual(false, dom.isAttributeContext('<a href="foo"></a>', 'href'), 'isAttributeContext, is not in that context as element is closed');
            strictEqual(false, dom.isAttributeContext('<a href="foo></a>', 'href'), 'isAttributeContext, is not in that context as element is closed even when attribute not closed');

            strictEqual(false, dom.isAttributeContext('<a href="foo"', 'href'), 'isAttributeContext, is not in that context as tag is not closed but attribute is, double quotes');
            strictEqual(false, dom.isAttributeContext("<a href='foo'", 'href'), 'isAttributeContext, is not in that context as tag is not closed but attribute is, single quotes');
            strictEqual(false, dom.isAttributeContext("<a href  =  'foo'", 'href'), 'isAttributeContext, is not in that context as tag is not closed but attribute is, single quotes with spacing');
            strictEqual(false, dom.isAttributeContext("<a foo=bar id=\"me\" target='blank' href  =  'foo'", 'href'), 'isAttributeContext, is not in that context as tag is not closed but attribute is, also other attributes');
            strictEqual(false, dom.isAttributeContext("<a foo=bar href=' id=\"me\" target='", 'href'), 'isAttributeContext, is not in that context as tag is not closed but other attributes exist after');
            strictEqual(false, dom.isAttributeContext("<a href=http://www.test.de ", 'href'), 'isAttributeContext, is not in that context as tag has no quotes but is separated by space');
            strictEqual(false, dom.isAttributeContext('<a href="foo', 'id'), 'isAttributeContext, is open attribute but not requested attribute id');
            strictEqual(false, dom.isAttributeContext('<a href="foo', 'hre'), 'isAttributeContext, is open attribute but not requested attribute hre');
            strictEqual(false, dom.isAttributeContext('<a href="foo', 'hreff'), 'isAttributeContext, is open attribute but not requested attribute hreff');

            strictEqual(true, dom.isAttributeContext('<a href="foo', 'href'), 'isAttributeContext, is in context when attribute opened but not closed');
            strictEqual(true, dom.isAttributeContext("<a href='foo", 'href'), 'isAttributeContext, is in context when attribute opened but not closed');
            strictEqual(true, dom.isAttributeContext("<a href ='foo", 'href'), 'isAttributeContext, is in context when attribute opened but not closed');
            strictEqual(true, dom.isAttributeContext('<a href =  \'foo', 'href'), 'isAttributeContext, is in context when attribute opened but not closed');
            strictEqual(true, dom.isAttributeContext('<a href = "foo', 'href'), 'isAttributeContext, is in context when attribute opened but not closed');
            strictEqual(true, dom.isAttributeContext('<a href =foo', 'href'), 'isAttributeContext, is in context when attribute opened but not closed, no quotes');
            strictEqual(true, dom.isAttributeContext('<a foo=bar id="me" target=\'blank\' href =foo', 'href'), 'isAttributeContext, is in context when attribute opened but not closed, also other attributes');

            var div = document.createElement('div');
            div.className = '   fo   otest  hello world         ';
            strictEqual('fo otest hello world', dom.getElementClassNames(div), 'getElementClassNames, trims and removes whitespace');

            var wasCalled = false;
            dom.loadScriptUrl('scriptfoobartest.js', {async: false, onerror: function () {
                wasCalled = true;
            }});
            var element = document.querySelectorAll('script[src="scriptfoobartest.js"]');
            strictEqual(1, element.length, 'loadScriptUrl, has added script element');
            element = element[0];
            ok(!!element.defer, 'loadScriptUrl, is defered');
            ok(!element.async, 'loadScriptUrl, is not async');
            strictEqual(location.origin + location.pathname + 'scriptfoobartest.js', element.src, 'loadScriptUrl, has src');
            stop();
            setTimeout(function () {
                ok(wasCalled, 'loadScriptUrl, has failed to load the script');
                start();
            }, 1000);
        });

        test("Matomo TagManager window", function() {
            expect(21);

            var windowHelper = window.MatomoTagManager.window;

            equal(typeof windowHelper.onScroll, 'function', 'windowHelper.onScroll');
            equal(typeof windowHelper.offScroll, 'function', 'windowHelper.offScroll');
            equal(typeof windowHelper.getViewportWidth, 'function', 'windowHelper.getViewportWidth');
            equal(typeof windowHelper.getViewportHeight, 'function', 'windowHelper.getViewportHeight');
            equal(typeof windowHelper.getScreenHeight, 'function', 'windowHelper.getScreenHeight');
            equal(typeof windowHelper.getScreenWidth, 'function', 'windowHelper.getScreenWidth');
            equal(typeof windowHelper.getPerformanceTiming, 'function', 'windowHelper.getPerformanceTiming');

            ok(windowHelper.getViewportWidth() > 100, 'windowHelper.getViewportWidth ' + windowHelper.getViewportWidth());
            ok(windowHelper.getViewportHeight() > 100, 'windowHelper.getViewportHeight ' + windowHelper.getViewportHeight());
            ok(windowHelper.getScreenHeight() > 100, 'windowHelper.getScreenHeight ' + windowHelper.getScreenHeight());
            ok(windowHelper.getScreenWidth() > 100, 'windowHelper.getScreenWidth ' + windowHelper.getScreenWidth());
            ok(windowHelper.getPerformanceTiming('domainLookupStart') > 100, 'windowHelper.getPerformanceTiming ' + windowHelper.getPerformanceTiming('domainLookupStart'));
            strictEqual(0, windowHelper.getPerformanceTiming('notExistingKeyword'), 'windowHelper.getPerformanceTiming not existing keyword');

            strictEqual(false, windowHelper.hasSetupScroll, 'by default no event listener for scroll should be set up');

            var scrolls1 = [];
            var scrolls2 = [];
            var scroll1Unsubscribe = windowHelper.onScroll(function (event) {
                scrolls1.push(event);
            });

            strictEqual(true, windowHelper.hasSetupScroll, 'should set up event listeners as soon as we start to register an event handler');

            var scroll2Unsubscribe = windowHelper.onScroll(function (event) {
                scrolls2.push(event);
            });

            window.scrollTo(0, 200);
            stop();

            setTimeout(function () {

                strictEqual(1, scrolls1.length, 'onScroll, all registered event handlers receive events');
                strictEqual(1, scrolls2.length, 'onScroll, all registered event handlers receive events');

                windowHelper.offScroll(scroll2Unsubscribe);

                strictEqual(true, windowHelper.hasSetupScroll, 'should have setup the scrolling event listener when there are still other listeners');

                window.scrollTo(0, 0);

                setTimeout(function () {
                    strictEqual(2, scrolls1.length, 'offScroll, after unsubscribing an event handler active event handlers still get notified');
                    strictEqual(1, scrolls2.length, 'offScroll, after being unsubscribed event handler is not executed anymore');

                    windowHelper.offScroll(scroll1Unsubscribe);
                    strictEqual(false, windowHelper.hasSetupScroll, 'removing all event listeners should remove the scroll and resize event listener');
                    start();
                }, 400);

            }, 400);
        });

        test("Matomo TagManager Template Variable", function() {
            expect(46);

            strictEqual('ConstantVariable', getConstructorName(buildVariable('footest')), 'buildVariable, makes a constant variable');
            strictEqual('footest', buildVariable('footest').getDefinition(), 'ConstantVariable, getDefinition returns string');
            strictEqual(false, buildVariable(false).getDefinition(), 'ConstantVariable, getDefinition returns other input');
            strictEqual('footest', buildVariable('footest').get(), 'ConstantVariable, makes a constant variable when a string given');
            strictEqual('footest6', buildVariable('footest6').toString(), 'ConstantVariable, has a toString method');
            strictEqual(5, buildVariable(5).get(), 'ConstantVariable, makes a constant variable when a number given');
            strictEqual(false, buildVariable(false).get(), 'ConstantVariable, makes a constant variable when false given');
            strictEqual(undefined, buildVariable(undefined).get(), 'ConstantVariable, makes a constant variable when undefined given');
            strictEqual(null, buildVariable(null).get(), 'ConstantVariable, makes a constant variable when null given');

            function makeVar(getMethod, mixins)
            {
                var obj = {type: 'mytype', name: 'myname', Variable: function () { this.get = getMethod; }};
                if (obj) {
                    for (var i in mixins) {
                        obj[i] = mixins[i];
                    }
                }
                return obj;
            }
            var varWithFunctionTemplate = {type: 'mytype', name: 'myname', Variable: function () { this.get = function (){return 'test12';}}};
            var varWithObjectTemplate = {type: 'mytype2', name: 'myname2', Variable: {get: function (){ return 'test14'; }}};
            var varWithStringTemplate = {type: 'mytype2', name: 'myname2', Variable: 'myTemplate'};

            strictEqual('Variable', getConstructorName(buildVariable(varWithFunctionTemplate)), 'buildVariable, makes a regular variable when an object is given');

            strictEqual('test12', buildVariable(varWithFunctionTemplate).get(), 'Variable, creates a new instance of the template function');
            strictEqual('test14', buildVariable(varWithObjectTemplate).get(), 'Variable, can work with a template object');
            strictEqual('test12', buildVariable(varWithStringTemplate, {myTemplate: varWithFunctionTemplate.Variable}).get(), 'Variable, can resolve a string container template');
            strictEqual('test12', buildVariable(varWithFunctionTemplate).toString(), 'Variable, has a toString method');
            deepEqual(varWithStringTemplate, buildVariable(varWithStringTemplate, {myTemplate: function () { return varWithFunctionTemplate.Variable; }}).getDefinition(), 'Variable, getDefinition');

            try {
                strictEqual('test12', buildVariable(varWithStringTemplate).get(), 'Variable, triggers an error when string template not found');
                ok(false, 'expected an exception to be triggered');
            } catch (e) {
                strictEqual('No matching variable template found', e.message, 'Variable, expect exception when no template given');
            }

            /** DEFAULT VALUE */
            strictEqual('myDefault', buildVariable(makeVar(function (){return false;}, {defaultValue: 'myDefault'})).toString(), 'Variable, supports a default value when false');
            strictEqual('myDefault2', buildVariable(makeVar(function (){return undefined;}, {defaultValue: 'myDefault2'})).toString(), 'Variable, supports a default value when undefined');
            strictEqual(0, buildVariable(makeVar(function (){return null;}, {defaultValue: 0})).toString(), 'Variable, supports a default value when null and default value is empty but 0');
            strictEqual('', buildVariable(makeVar(function (){return '';}, {defaultValue: 'myDefault3'})).toString(), 'Variable, does not return default value when a value is returned');
            strictEqual(0, buildVariable(makeVar(function (){return 0;}, {defaultValue: 'myDefault4'})).toString(), 'Variable, does not return default value when a value is returned');
            strictEqual('test', buildVariable(makeVar(function (){return 'test';}, {defaultValue: 'myDefault4'})).toString(), 'Variable, does not return default value when a value is returned');

            /** LOOKUP TABLE */
            strictEqual('replacedVal', buildVariable(makeVar(function (){return 'test';}, {lookUpTable: [{matchValue: 'test', outValue: 'replacedVal', comparison: 'equals'}]})).toString(), 'Variable, lookup table, equals, when value matches it will be replaced.');
            strictEqual('test', buildVariable(makeVar(function (){return 'test';}, {lookUpTable: [{matchValue: 'test', outValue: 'replacedVal', comparison: 'not_equals'}]})).toString(), 'Variable, lookup table, not_equals, when value does not match it will not be replaced.');
            strictEqual('middleValue', buildVariable(makeVar(function (){return 'test';}, {lookUpTable: [{matchValue: 'test', outValue: 'firstValue', comparison: 'not_equals'}, {matchValue: 'es', outValue: 'middleValue', comparison: 'contains'}, {matchValue: 'test', outValue: 'lastValue', comparison: 'equals'}]})).toString(), 'Variable, lookup table, contains, when multiple match returns the first value.');

            strictEqual('fooReplaced', buildVariable(makeVar(function (){return false;}, {defaultValue: 'test', lookUpTable: [{matchValue: 'te', outValue: 'fooReplaced', comparison: 'starts_with'}]})).toString(), 'Variable, lookup table, applies default value before lookup table.');

            strictEqual('JoinedVariable', getConstructorName(buildVariable({joinedVariable:['foo', varWithFunctionTemplate]})), 'buildVariable, makes a joined variable when an array given');
            strictEqual('footest12bartest145', buildVariable({joinedVariable:['foo', varWithFunctionTemplate, 'bar', varWithObjectTemplate, 5]}).get(), 'JoinedVariable, combines the value of multiple variables');
            strictEqual('footest1205', buildVariable({joinedVariable:['foo', varWithFunctionTemplate, false, 0, null, undefined, 5]}).get(), 'JoinedVariable, does not have a problem with empty values');
            strictEqual('footest12', buildVariable({joinedVariable:['foo', varWithFunctionTemplate]}).toString(), 'JoinedVariable, has a toString()');
            deepEqual(['foo', varWithFunctionTemplate], buildVariable({joinedVariable:['foo', varWithFunctionTemplate]}).getDefinition(), 'JoinedVariable getDefinition');

            deepEqual(['foo', 'bar'], buildVariable(['foo', 'bar']).get(), 'treats a regular array as an array and not any kind of variable');
            strictEqual('ConstantVariable', getConstructorName(buildVariable(['foo', 'bar'])), 'uses a constant variable for a regular array');
            deepEqual({foo:'bar', baz: 'foo'}, buildVariable({foo:'bar', baz: 'foo'}).get(), 'treats a regular object as an object and not any kind of variable');
            strictEqual('ConstantVariable', getConstructorName(buildVariable({foo:'bar', baz: 'foo'})), 'uses a constant variable for a regular object');

            var objectProperties = {foo:varWithFunctionTemplate, baz: varWithObjectTemplate};
            deepEqual({foo:'test12', baz: 'test14'}, buildVariable(objectProperties).get(), 'resolves object properties');
            deepEqual({foo:varWithFunctionTemplate, baz: varWithObjectTemplate}, objectProperties, 'should not change original configuration');

            var arrayValues = ['foo', varWithObjectTemplate, 'baz'];
            deepEqual(['foo', 'test14', 'baz'], buildVariable(arrayValues).get(), 'resolves array values');
            deepEqual(['foo', varWithObjectTemplate, 'baz'], arrayValues, 'resolves array values should not have changed');

            var nestedArray = ['foo', varWithObjectTemplate, {foo:varWithFunctionTemplate, baz: varWithObjectTemplate}];
            deepEqual(['foo', 'test14', {foo:'test12', baz: 'test14'}], buildVariable(nestedArray).get(), 'resolves nested arrays values');
            deepEqual(['foo', varWithObjectTemplate, {foo:varWithFunctionTemplate, baz: varWithObjectTemplate}], nestedArray, 'resolves nested arrays values, should not change original');

            var debugValues = [];
            buildVariable(varWithFunctionTemplate).addDebugValues(debugValues);
            deepEqual([{name: 'myname', type: 'mytype', value: 'test12'}], debugValues, 'Variable, has addDebugValues()');

            debugValues = [];
            buildVariable({joinedVariable:['test', varWithFunctionTemplate]}).addDebugValues(debugValues);
            deepEqual([{name: null, type: '_joined', value: 'testtest12'}], debugValues, 'JoinedVariable, has addDebugValues()');

            debugValues = [];
            buildVariable('foo').addDebugValues(debugValues);
            deepEqual([{name: null, type: '_constant', value: 'foo'}], debugValues, 'ConstantVariable, has addDebugValues()');

            /** TOSTRING AND GET MAY RETURN DIFFERENT VALUES **/
            var stringVar = {
                type: 'mytype', name: 'myname', Variable: function () {
                    this.get = function (){return 'test12';};
                    this.toString = function (){return 'test15';};
                }};

            var stringVariable = buildVariable(stringVar);
            strictEqual('test12', stringVariable.get(), 'get returns value from get');
            strictEqual('test15', stringVariable.toString(), 'toString, returns value from tostring');
        });

        test("Matomo TagManager Template Tag", function() {
            expect(40);

            var wasFired = 0;
            var TagManager, parameters;
            var exampleTag = function (params, tagm) {
                this.fire = function (){ wasFired++; TagManager = tagm; parameters = params; };
            };

            strictEqual('Tag', getConstructorName(buildTag({Tag: exampleTag})), 'internal buildTag returns a tag');

            var tag = buildTag({Tag: exampleTag});
            tag.fire();
            strictEqual(1, wasFired, 'Tag template, can be a function');
            strictEqual(TagManager, window.MatomoTagManager, 'Tag template, function passes tagmanager');
            strictEqual(tag, parameters.tag, 'Tag template, function passes parameters');

            tag = buildTag({Tag: 'myTagTemplate'}, {myTagTemplate: exampleTag });
            tag.fire();
            strictEqual(2, wasFired, 'Tag template, can be a string referencing templates');
            strictEqual(TagManager, window.MatomoTagManager, 'Tag template, string reference passes tagmanager');
            strictEqual(tag, parameters.tag, 'Tag template, string reference passes parameters');

            tag = buildTag({Tag: (new exampleTag())});
            tag.fire();
            strictEqual(3, wasFired, 'Tag template, can be an object');

            tag = buildTag({Tag: exampleTag});
            tag.block();
            var tagFireBlock = tag.fire();
            strictEqual(3, wasFired, 'block, will not let the fire trigger anymore');
            strictEqual('tag is blocked', tagFireBlock, 'block, make sure this was actually the reason for blocking it');

            tag = buildTag({Tag: exampleTag, name: 'My name', type: 'theType'});
            tag.fire();
            var debugValues = [];
            tag.addDebugValues(debugValues, 'Fire');
            deepEqual([{action: 'Fire', name: 'My name', type: 'theType', numExecuted: 1}], debugValues, 'addDebugValues, adds tag information');

            wasFired = 0;//reset counter for easier tests

            tag = buildTag({Tag: exampleTag});
            strictEqual(false, tag.hasFireTrigger(), 'hasFireTrigger, will return false when no fire triggers defined');
            strictEqual(false, tag.hasBlockTrigger(), 'hasBlockTrigger, will return false when no block triggers defined');

            var trigger14 = buildTrigger({id: 14, Trigger: function () {}});
            var trigger16 = buildTrigger({id: 16, Trigger: function () {}});
            var trigger32 = buildTrigger({id: 32, Trigger: function () {}});
            tag = buildTag({Tag: exampleTag, fireTriggerIds: [4,10,14], blockTriggerIds: [32,29,2]});
            strictEqual(false, tag.hasFireTrigger(trigger16), 'hasFireTrigger, will return false when fire triggers does not contain this trigger');
            strictEqual(false, tag.hasFireTrigger(trigger32), 'hasFireTrigger, will return false when fire triggers does not contain this trigger even though block trigger contains it');
            strictEqual(true, tag.hasFireTrigger(trigger14), 'hasFireTrigger, will return true when the tag actually contains that fire trigger');
            strictEqual(false, tag.hasFireTrigger(), 'hasFireTrigger, will return false when no trigger given');

            strictEqual(false, tag.hasBlockTrigger(trigger16), 'hasBlockTrigger, will return false when block triggers does not contain this trigger');
            strictEqual(false, tag.hasBlockTrigger(trigger14), 'hasBlockTrigger, will return false when block triggers does not contain this trigger even though fire trigger contains it');
            strictEqual(true, tag.hasBlockTrigger(trigger32), 'hasBlockTrigger, will return true when the tag actually contains that block trigger');
            strictEqual(false, tag.hasBlockTrigger(), 'hasFireTrigger, will return false when no trigger given');

            /** counter **/
            tag = buildTag({Tag: exampleTag, name: 'My name', type: 'theType'});
            strictEqual(0, tag.numExecuted, 'numExecuted, has not been executed by default');
            tag.fire();
            strictEqual(1, tag.numExecuted, 'numExecuted, increases counter when executing it once');
            tag.fire();
            tag.fire();
            strictEqual(3, tag.numExecuted, 'numExecuted, increases counter when executing it several times');

            /** FIRE LIMIT **/
            tag = buildTag({Tag: exampleTag, fireLimit: MatomoTagManager.Tag.FIRE_LIMIT_ONCE_PAGE});
            tag.fire();
            strictEqual(1, tag.numExecuted, 'fireLimit Once page, can be executed once');
            var result = tag.fire();
            tag.fire();
            tag.fire();
            strictEqual(1, tag.numExecuted, 'fireLimit Once page, cannot be executed more than once');
            strictEqual('fire limit is restricted', result, 'fireLimit Once, make sure this was actually the reason for blocking it');

            tag = buildTag({Tag: exampleTag, fireLimit: MatomoTagManager.Tag.FIRE_LIMIT_ONCE_24HOURS, name: 'mynamesession'});
            tag.fire();
            strictEqual(1, tag.numExecuted, 'fireLimit Once session, can be executed once');
            tag.numExecuted = 0;
            strictEqual('fire limit 24hours is restricted', tag.fire(), 'fireLimit Once session, can be executed a second time');
            strictEqual(0, tag.numExecuted, 'fireLimit Once session, cannot be executed a second time even if was not executed before');
            strictEqual('1', MatomoTagManager.storage.local.get('tag', 'mynamesession'), 'fireLimit Once session, set key in storage');

            tag = buildTag({Tag: exampleTag, fireLimit: MatomoTagManager.Tag.FIRE_LIMIT_ONCE_LIFETIME, name: 'mynamelifetime'});
            tag.fire();
            strictEqual(1, tag.numExecuted, 'fireLimit Once lifetime, can be executed once');
            tag.numExecuted = 0;
            strictEqual('fire limit lifetime is restricted', tag.fire(), 'fireLimit Once lifetime, can be executed a second time');
            strictEqual(0, tag.numExecuted, 'fireLimit Once lifetime, cannot be executed a second time even if was not executed before');
            strictEqual('1', MatomoTagManager.storage.local.get('tag', 'mynamelifetime'), 'fireLimit Once lifetime, set key in storage');

            /** DATE RANGE **/
            tag = buildTag({Tag: exampleTag, startDate: '2014-01-02 03:04:05', endDate: '2028-01-02 03:04:05'});
            tag.fire();
            strictEqual(1, tag.numExecuted, 'dateRange, can be executed when now is between date range');

            /** DATE RANGE **/
            tag = buildTag({Tag: exampleTag, startDate: '2014-01-02 03:04:05', endDate: '2017-01-02 03:04:05'});
            var dateFireResult = tag.fire();
            strictEqual(0, tag.numExecuted, 'dateRange, cannot be executed when now is not between date range');
            strictEqual('date range does not match', dateFireResult, 'dateRange, make sure it failed because of date range');

            /** FIRE DELAY **/
            tag = buildTag({Tag: exampleTag, fireDelay: 600});
            tag.fire();
            strictEqual(0, tag.numExecuted, 'fireDelay, should not have executed directly after the fire');
            stop();

            setTimeout(function () {
                strictEqual(1, tag.numExecuted, 'fireDelay, should have executed after the delay');
                start();
            }, 1000);
        });

        test("Matomo TagManager storage", function() {
            expect(16);

            var testStorages = ['local', 'session'];
            for (var index = 0; index < testStorages.length; index ++) {

                var i = testStorages[index];

                var storage = window.MatomoTagManager.storage[i];

                storage.set('mygroup', 'mykey', 'myvalue');
                var value = storage.get('mygroup', 'mykey');

                strictEqual('myvalue', value, 'storage ' + i + ' set should save value, get should return it');

                storage.set('mygroup2', 'mykey', 'myvalue2');

                strictEqual('myvalue2', storage.get('mygroup2', 'mykey'), 'storage ' + i + ' set should save values for different groups');
                strictEqual('myvalue', storage.get('mygroup', 'mykey'), 'storage ' + i + ' inital value should still have other value');

                strictEqual(undefined, storage.get('mygroup', 'myNotExistiNgkey'), 'storage ' + i + ' should return undefined if no value for a key exists');

                // test store empty value
                storage.set('mygroup2', 'mytestkey', '');
                strictEqual('', storage.get('mygroup2', 'mytestkey'), 'storage ' + i + ' should return empty values');

                storage.clearAll();
                strictEqual(undefined, storage.get('mygroup2', 'mykey'), 'clearAll ' + i + ' should reset all values');

                // TEST TTL
                storage.set('myttlgroup', 'myttlkey', 'myttlvalue', 1);
                strictEqual('myttlvalue', storage.get('myttlgroup', 'myttlkey'), 'storage ' + i + ' should return value with ttl');
                stop();
                setTimeout(function () {
                    strictEqual(undefined, storage.get('myttlgroup', 'myttlkey'), 'storage ' + i + ' should respect ttl and no longer return value');
                    start();
                }, 1500);
            }
        });

        test("Matomo TagManager TemplateParameters", function() {
            expect(18);

            var parameters = buildParameters();
            strictEqual('TemplateParameters', getConstructorName(parameters), 'returns TemplateParameters');
            strictEqual(document, parameters.document, 'sets document');
            strictEqual(window, parameters.window, 'sets window');
            strictEqual(undefined, parameters.get('foo'), 'get, returns undefined when no other values set');
            strictEqual(document, parameters.get('document'), 'get, possible to fetch document element');
            strictEqual(window, parameters.get('window'), 'get, possible to fetch window element');

            parameters = buildParameters({
                'foo-bar': 'test',
                'foo': 'bar',
                'foo.test': 'hello',
                'mytest': {mytest2: 'yeah'}
            });
            strictEqual(document, parameters.document, 'sets document');
            strictEqual(window, parameters.window, 'sets window');
            strictEqual('bar', parameters.get('foo'), 'get, returns a set property');
            strictEqual('test', parameters.get('foo-bar'), 'get, returns a set property with dashes');
            strictEqual('hello', parameters.get('foo.test'), 'get, returns a set property with dot');
            strictEqual('yeah', parameters.get('mytest.mytest2'), 'get, returns a nested property');
            strictEqual(undefined, parameters.get('mytest.mytest3'), 'get, a nested property that does not exist');
            strictEqual('', parameters.get('window.name'), 'get, possible to fetch values from window/document');

            var docAlias = {foo:'yeah'};
            var docAlias2 = {foo1:'yeah1'};
            parameters = buildParameters({document:docAlias, window: docAlias2});
            strictEqual(docAlias, parameters.document, 'get, possible to overwrite document');
            strictEqual(docAlias2, parameters.window, 'get, possible to overwrite window');

            parameters = buildParameters({myvar: buildVariable('myresult')});
            strictEqual('myresult', parameters.get('myvar'), 'get, resolves variables');


            /* parameters.buildVariable */
            parameters = buildParameters({myvar: parameters.buildVariable('myresult')});
            strictEqual('myresult', parameters.get('myvar'), 'buildVariable, creates a variable');
        });

        test("Matomo TagManager Condition", function() {
            expect(10);

            function isValidCondition(condition)
            {
                return buildCondition(condition).isValid();
            }

            strictEqual('Condition', getConstructorName(buildCondition({actual: '', expected:'', comparison: 'equals'})), 'internal buildCondition returns a condition');
            strictEqual(false, isValidCondition({actual: 'bar', expected:'foo', comparison: 'equals'}), 'isValid(), returns false when equals condition is not valid');
            strictEqual(true, isValidCondition({actual: 'bar', expected:'foo', comparison: 'not_equals'}), 'isValid(), returns true when not_equals condition is not valid');
            strictEqual(true, isValidCondition({actual: 'foo', expected:'foo', comparison: 'equals'}), 'isValid(), returns true when equals condition is not valid');
            strictEqual(false, isValidCondition({actual: 'bar', expected:'foo', comparison: 'contains'}), 'isValid(), returns false when contains condition is not valid');
            strictEqual(true, isValidCondition({actual: 'bar', expected:'a', comparison: 'contains'}), 'isValid(), returns true when contains condition is valid');

            strictEqual(true, isValidCondition({actual: 'foo', expected:{joinedVariable: ['fo', 'o']}, comparison: 'equals'}), 'isValid(), joinedVariables, uses variables in the background');
            strictEqual(true, isValidCondition({actual: {joinedVariable: ['f', 'oo']}, expected:{joinedVariable: ['fo', 'o']}, comparison: 'equals'}), 'isValid(), joinedVariables, uses variables in the background');
            strictEqual(true, isValidCondition({actual: {joinedVariable: ['f', 'oo']}, expected:{joinedVariable: ['fo']}, comparison: 'starts_with'}), 'isValid(), joinedVariables, uses variables in the background');
            strictEqual(false, isValidCondition({actual: {joinedVariable: ['f', 'oo']}, expected:{joinedVariable: ['bo']}, comparison: 'starts_with'}), 'isValid(), joinedVariables, uses variables in the background');
        });

        test("Matomo TagManager Trigger", function() {
            expect(31);

            var parameters, TagManager, numSetups = 0;
            var TriggerTemplate = function (params, tagm) {
                parameters = params;
                TagManager = tagm;

                this.setUp = function (triggerEvent) {
                    numSetups++;
                };
            };
            var TriggerTemplateWithData = function (params, tagm) {
                parameters = params;
                TagManager = tagm;
                this.setUp = function (triggerEvent) {
                    triggerEvent({'myvar1': 'hello', 'world': 'cheers'});
                };
            };
            var TriggerTemplateWithEvent = function (params, tagm) {
                parameters = params;
                TagManager = tagm;
                this.setUp = function (triggerEvent) {
                    triggerEvent({'clickid': 'bar', 'event': 'foo', 'clicktime': 'yesterday'});
                };
            };

            var hasFiredTag = false;

            var TagTemplate = function () { this.fire = function (){ hasFiredTag = true; }; };

            strictEqual('Trigger', getConstructorName(buildTrigger({Trigger:TriggerTemplate})), 'internal buildTrigger returns a Trigger');

            var trigger = buildTrigger({Trigger: TriggerTemplate});
            trigger.setUp();
            strictEqual(1, numSetups, 'Trigger template, can be a function');
            strictEqual(TagManager, window.MatomoTagManager, 'Trigger template, function passes tagmanager');
            strictEqual(trigger, parameters.trigger, 'Trigger template, function passes parameters');

            trigger = buildTrigger({Trigger: 'myTriggerTemplate'}, {myTriggerTemplate: TriggerTemplate});
            trigger.setUp();
            strictEqual(2, numSetups, 'Trigger template, can be a string referencing templates');
            strictEqual(TagManager, window.MatomoTagManager, 'Trigger template, string reference passes tagmanager');
            strictEqual(trigger, parameters.trigger, 'Trigger template, string reference passes parameters');

            trigger = buildTrigger({Trigger: (new TriggerTemplate())});
            trigger.setUp();
            strictEqual(3, numSetups, 'Trigger template, can be an object');

            numSetups = 0; // reset counter for easier testing

            trigger = buildTrigger({Trigger: TriggerTemplate, id: 52});
            strictEqual(52, trigger.getId(), 'getId(), returns trigger id');

            deepEqual([], trigger.getReferencedTags(), 'getReferencedTags(), has no referenced tags by default');

            var tag1 = buildTag({Tag: TagTemplate});
            var tag2 = buildTag({Tag: TagTemplate});
            trigger.addReferencedTag(tag1);
            deepEqual([tag1], trigger.getReferencedTags(), 'addReferencedTag, getReferencedTags(), adds a tag');

            trigger.addReferencedTag(tag2);
            deepEqual([tag1, tag2], trigger.getReferencedTags(), 'addReferencedTag, getReferencedTags(), adds another tag');

            strictEqual(true, trigger.meetsConditions(), 'meetsConditions, when no conditions defined, conditions are met');

            trigger = buildTrigger({Trigger: TriggerTemplate, conditions: []});
            strictEqual(true, trigger.meetsConditions(), 'meetsConditions, when empty conditions defined, conditions are met');

            var trueCondition1 = {actual: 'foo', expected: 'foo', comparison: 'equals'};
            var trueCondition2 = {actual: ['fo', 'o'], expected: 'o', comparison: 'contains'};
            var falseCondition1 = {actual: ['fo', 'o'], expected: 'b', comparison: 'contains'};
            var falseCondition2 = {actual: 'mytest', expected: 'othertest', comparison: 'starts_with'};

            trigger = buildTrigger({Trigger: TriggerTemplate, conditions: [trueCondition1, falseCondition1, trueCondition2]});
            strictEqual(false, trigger.meetsConditions(), 'when any condition is false, the conditions are not met');

            trigger = buildTrigger({Trigger: TriggerTemplate, conditions: [trueCondition1, trueCondition2]});
            strictEqual(true, trigger.meetsConditions(), 'when all conditions are true, the conditions are met');

            trigger = buildTrigger({Trigger: TriggerTemplate, conditions: [falseCondition1, falseCondition2]});
            strictEqual(false, trigger.meetsConditions(), 'when all conditions are false, the conditions are not met');

            trigger = buildTrigger({Trigger: TriggerTemplateWithData});
            trigger.setUp();
            strictEqual('hello', TagManager.dataLayer.get('myvar1'), 'when triggering an event without event itself, it updates the global dataLayer');
            strictEqual('cheers', TagManager.dataLayer.get('world'), 'when triggering an event without event itself, it updates the global dataLayer');

            strictEqual('hello', parameters.container.dataLayer.get('myvar1'), 'when triggering an event without event itself, it updates the container dataLayer');
            strictEqual('cheers', parameters.container.dataLayer.get('world'), 'when triggering an event without event itself, it updates the container dataLayer');

            trigger = buildTrigger({Trigger: TriggerTemplateWithEvent});
            trigger.setUp();
            strictEqual('bar', TagManager.dataLayer.get('clickid'), 'when triggering an event without event itself, it updates the global dataLayer');
            strictEqual('foo', TagManager.dataLayer.get('event'), 'when triggering an event without event itself, it updates the global dataLayer');

            strictEqual('bar', parameters.container.dataLayer.get('clickid'), 'when triggering an event without event itself, it updates the container dataLayer');
            strictEqual('foo', parameters.container.dataLayer.get('event'), 'when triggering an event without event itself, it updates the container dataLayer');

            /** A TRIGGERED TAG FIRES A REFERENCED TAG */
            trigger = buildTrigger({Trigger: TriggerTemplateWithEvent, id: 5});
            tag1 = buildTag({Tag: TagTemplate, fireTriggerIds: [5]});
            trigger.addReferencedTag(tag1);
            hasFiredTag = false;
            trigger.setUp();
            strictEqual(true, hasFiredTag, 'when triggering an event, referenced fire tags will be fired');

            /** A TRIGGERED TAG DOES NOT FIRE A BLOCKED TAG */
            trigger = buildTrigger({Trigger: TriggerTemplateWithEvent, id: 5});
            tag1 = buildTag({Tag: TagTemplate, blockTriggerIds: [5]});
            trigger.addReferencedTag(tag1);
            strictEqual(false, tag1.blocked, 'tag is initially not blocked');
            hasFiredTag = false;
            trigger.setUp();
            strictEqual(false, hasFiredTag, 'when a trigger is blocked, should not fire the tag');
            strictEqual(true, tag1.blocked, 'when a trigger is blocked, should block the tag');

            /** A TRIGGERED TAG DOES NOT FIRE A REFERENCED TAG WHEN CONDITIONS ARE NOT MET */
            trigger = buildTrigger({Trigger: TriggerTemplateWithEvent, id: 5, conditions: [falseCondition1]});
            tag1 = buildTag({Tag: TagTemplate, fireTriggerIds: [5]});
            trigger.addReferencedTag(tag1);
            hasFiredTag = false;
            trigger.setUp();
            strictEqual(false, hasFiredTag, 'when a condition is not met, should not fire the tag');
            strictEqual(false, tag1.blocked, 'when a condition is not met, it should not block the tag');
        });

        test("Matomo TagManager Container", function() {
            expect(32);
            var TagManager = window.MatomoTagManager;
            var dataLayer = TagManager.dataLayer;
            dataLayer.reset();
            var varWithFunctionTemplate = {type: 'mytype', name: 'myname', Variable: function () { this.get = function (){return 'test12';}}};
            var varWithFunctionTemplate2 = {type: 'pageurl', name: 'myname 2', Variable: function () { this.get = function (){return 'pageurl';}}};

            var Template = TagManagerTemplate.Variable.ConstantVariable;
            var TriggerTemplate = function (params, tagm) {
                this.setUp = function (triggerEvent) {};
            };
            var TagTemplate = function () { this.fire = function (){ }; };

            strictEqual('Container', getConstructorName(buildContainer({}, {})), 'internal buildContainer returns a Container');

            var container = buildContainer({id: 'gK5j2Ks'}, {});
            TagManager.dataLayer.push({foo:'bar', 'hello': 'world'});
            strictEqual('bar', TagManager.dataLayer.get('foo'), 'the global dataLayer has received the data');
            strictEqual('bar', container.dataLayer.get('foo'), 'when pushing data to the dataLayer, the container data layer is updated as well');
            strictEqual('world', container.dataLayer.get('hello'), 'when pushing data to the dataLayer, the container data layer is updated as well');

            container.dataLayer.push({'baz': 'test'});
            strictEqual('test', container.dataLayer.get('baz'), 'it is possible to push data directly to the container dataLayer');
            strictEqual(undefined, TagManager.dataLayer.get('baz'), 'the global dataLayer is not updated when a specific container dataLayer is updated');

            var debugValue = {};
            container.addDebugValues(debugValue);
            deepEqual({variables: [], tags: [], id: 'gK5j2Ks', dataLayer: JSON.parse(JSON.stringify(container.dataLayer.values)), versionName: null}, debugValue, 'add debug values when having no variables');

            var container = buildContainer({variables: ['test', {joinedVariable: ['foo', 'bar']}, varWithFunctionTemplate]});
            debugValue = {};
            container.addDebugValues(debugValue);
            deepEqual([{"name": null,"type": "_constant","value": "test"},{"name": null,"type": "_joined","value": "foobar"},{"name": "myname","type": "mytype","value": "test12"}], debugValue.variables, 'add debug values with variables');

            strictEqual(undefined, container.getTriggerById(), 'getTriggerById, no id passed and has no triggers');
            strictEqual(undefined, container.getTriggerById(null), 'getTriggerById, no id passed and has no triggers');
            strictEqual(undefined, container.getTriggerById(53), 'getTriggerById, has no such trigger');

            var trigger53 = container.addTrigger({Trigger:TriggerTemplate, id: 53});
            strictEqual('Trigger', getConstructorName(trigger53), 'addTrigger, returns a Trigger instance');
            deepEqual([trigger53], container.triggers, 'addTrigger, adds the trigger to the triggers array');

            var trigger54 = container.addTrigger({Trigger:TriggerTemplate, id: 54});
            strictEqual(54, trigger54.getId(), 'addTrigger, can add another trigger');
            deepEqual([trigger53, trigger54], container.triggers, 'addTrigger, can add another trigger');

            var trigger53New = container.addTrigger({Trigger:TriggerTemplate, id: 53});
            strictEqual(trigger53New, trigger53, 'addTrigger, returns an existing already added trigger when this trigger already exists');
            deepEqual([trigger53, trigger54], container.triggers, 'addTrigger, does not add the same trigger twice');

            strictEqual(undefined, container.getTriggerById(), 'getTriggerById, no id passed and has triggers');
            strictEqual(undefined, container.getTriggerById(null), 'getTriggerById, no id passed and has triggers');
            strictEqual(undefined, container.getTriggerById(98), 'getTriggerById, has no such trigger');
            strictEqual(trigger53, container.getTriggerById(53), 'getTriggerById, has this trigger');

            var container = buildContainer({
                id: 'jRL41Bw',
                idsite: 5,
                versionName: 'v1.0.0',
                revision: 29,
                environment: 'live',
                triggers: [{Trigger:TriggerTemplate, id: 51}, {Trigger:TriggerTemplate, id: 61}, {Trigger:TriggerTemplate, id: 71}, {Trigger:TriggerTemplate, id: 81}],
                tags: [{Tag:TagTemplate, fireTriggerIds: [51,99983, 61]}, {Tag:TagTemplate, fireTriggerIds: [61], blockTriggerIds: [71]}],
                variables: [varWithFunctionTemplate, varWithFunctionTemplate2]
            }, {});

            var trigger51 = container.getTriggerById(51);
            var trigger61 = container.getTriggerById(61);
            var trigger71 = container.getTriggerById(71);
            var trigger81 = container.getTriggerById(81);

            deepEqual(4, container.triggers.length, 'constructor, creates triggers even for triggers with no tag reference');
            deepEqual(2, container.variables.length, 'constructor, creates variables');
            deepEqual(2, container.tags.length, 'constructor, creates tags');

            deepEqual([container.tags[0]], trigger51.getReferencedTags(), 'constructor, references triggers with tags');
            deepEqual([container.tags[0], container.tags[1]], trigger61.getReferencedTags(), 'constructor, references triggers with tags');
            deepEqual([container.tags[1]], trigger71.getReferencedTags(), 'constructor, references triggers with tags');
            deepEqual([], trigger81.getReferencedTags(), 'constructor, trigger with no tag');

            strictEqual(undefined, container.dataLayer.get('foo'), 'container has no entries in the dataLayer by default');
            strictEqual(undefined, container.dataLayer.get('hello'), 'container has no entries in the dataLayer by default');

            container.run();
            strictEqual('bar', container.dataLayer.get('foo'), 'container.run will replay all previously missed events');
            strictEqual('world', container.dataLayer.get('hello'), 'container.run will replay all previously missed events');

        });

        test("Matomo TagManager _mtm", function() {
            expect(12);

            var TagManager = window.MatomoTagManager;
            var dataLayer = TagManager.dataLayer;
            dataLayer.reset();

            strictEqual('object', typeof window._mtm, 'has global mtm');
            strictEqual('function', typeof window._mtm.push, 'has global mtm.push');
            deepEqual([], TagManager.containers, 'has no container by default');

            strictEqual(undefined, dataLayer.get('mtmpushtest'), 'data layer has no value for key mtmpushtest');
            strictEqual(undefined, dataLayer.get('hello'), 'data layer has no value for key hello');

            _mtm.push(['dataLayer::push', {'mtmpushtest': 'yes', 'hello': 'world'}]);

            strictEqual('yes', dataLayer.get('mtmpushtest'), 'data layer has value after pushing it via _mtm for key mtmpushtest');
            strictEqual('world', dataLayer.get('hello'), 'data layer has value after pushing it via _mtm for key hello');

            _mtm.push(['addContainer', {id: 'foK3k2'}]);
            strictEqual(1, TagManager.containers.length, 'possible to add container via mtm');
            strictEqual('foK3k2', TagManager.containers[0].id, 'possible to add container via mtm');

            _mtm.push(['dataLayer::push', {directPush: 'test332'}]);
            strictEqual('test332', TagManager.dataLayer.get('directPush'), 'mtm.push can resolve double colons to a method');

            _mtm.push({'directPush': 'shorter', 'mytest3': 'foobar'});

            strictEqual('shorter', dataLayer.get('directPush'), '_mtm.push allows to push a value directly');
            strictEqual('foobar', dataLayer.get('mytest3'), '_mtm.push allows to push a value directly');
        });

        test("Matomo TagManager Template ConstantVariable", function() {
            expect(2);
            var templateToTest = 'ConstantVariable';

            var variable = resolveTemplateVariable(templateToTest, {constantValue: buildVariable('mytest')});
            strictEqual('mytest', variable, 'returns any passed value');

            var variable = resolveTemplateVariable(templateToTest, {constantValue: buildVariable(5)});
            strictEqual(5, variable, 'returns any passed value');
        });

        test("Matomo TagManager Template DataLayerVariable", function() {
            expect(2);
            var templateToTest = 'DataLayerVariable';
            var dataLayer = MatomoTagManager.dataLayer;

            dataLayer.reset();
            dataLayer.push({'dataLayerVarTest':'barval'});
            var defaultParameters = {container: {dataLayer: dataLayer}}; // for simplicity we reuse existing dataLayer
            defaultParameters.dataLayerName = buildVariable('dataLayerVarTest');

            var variable = resolveTemplateVariable(templateToTest, defaultParameters);
            strictEqual('barval', variable, 'returns value from the containers dataLayer');

            defaultParameters.dataLayerName =  buildVariable('foobar');
            var variable = resolveTemplateVariable(templateToTest, defaultParameters);
            strictEqual(undefined, variable, 'returns undefined when the value does not exist');
        });

        test("Matomo TagManager Template CookieVariable", function() {
            expect(6);
            var templateToTest = 'CookieVariable';

            var defaultParameters = {document: {cookie: 'mytest=foobar; loginbaz=helloworld'}};
            defaultParameters.cookieName = buildVariable('mytest');

            strictEqual('foobar', resolveTemplateVariable(templateToTest, defaultParameters), 'returns cookie value from start');

            defaultParameters.cookieName = buildVariable('loginbaz');
            strictEqual('helloworld', resolveTemplateVariable(templateToTest, defaultParameters), 'returns last cookie');

            defaultParameters.cookieName =  buildVariable('notexisting');
            strictEqual(undefined, resolveTemplateVariable(templateToTest, defaultParameters), 'returns undefined when cookie does not exist');

            defaultParameters = {document: {cookie: 'mytest=foobar; loginbaz=' + encodeURIComponent('#343ö34:-44095$')}};
            defaultParameters.cookieName = buildVariable('loginbaz');
            defaultParameters.uriDecode = buildVariable(false);
            strictEqual('%23343%C3%B634%3A-44095%24', resolveTemplateVariable(templateToTest, defaultParameters), 'returns last cookie, uriDecode disabled');

            defaultParameters.cookieName = buildVariable('loginbaz');
            defaultParameters.uriDecode = buildVariable(true);
            strictEqual('#343ö34:-44095$', resolveTemplateVariable(templateToTest, defaultParameters), 'returns last cookie, uriDecode enabled');

            defaultParameters.cookieName =  buildVariable('notexisting');
            defaultParameters.uriDecode = buildVariable(true);
            strictEqual(undefined, resolveTemplateVariable(templateToTest, defaultParameters), 'returns undefined when cookie does not exist, uriDecode enabled');
        });

        test("Matomo TagManager Template FirstDirectoryVariable", function() {
            expect(6);
            var templateToTest = 'FirstDirectoryVariable';

            strictEqual('tests', resolveTemplateVariable(templateToTest, {}), 'returns the value of the first directory');

            var params = {window: {location: {pathname: ''}}};
            strictEqual(null, resolveTemplateVariable(templateToTest, params), 'when no directory given');

            params = {window: {location: {pathname: '/'}}};
            strictEqual(null, resolveTemplateVariable(templateToTest, params), 'when homepage given');

            params = {window: {location: {pathname: '/foo/'}}};
            strictEqual('foo', resolveTemplateVariable(templateToTest, params), 'when has trailing slash');

            params = {window: {location: {pathname: '/foo'}}};
            strictEqual('foo', resolveTemplateVariable(templateToTest, params), 'when no trailing slash');

            params = {window: {location: {pathname: '/baz/test/bar'}}};
            strictEqual('baz', resolveTemplateVariable(templateToTest, params), 'when multiple paths');
        });

        test("Matomo TagManager Template WeekdayVariable", function() {
            expect(3);
            var templateToTest = 'WeekdayVariable';
            var weekday = resolveTemplateVariable(templateToTest, {});

            ok(!!weekday, 'returns a value');
            strictEqual('string', typeof weekday, 'returns a string');
            ok(weekday.length > 5 && weekday.length < 10, 'returns a certain length');
        });

        test("Matomo TagManager Template MetaContentVariable", function() {
            expect(4);
            var templateToTest = 'MetaContentVariable';
            var params = {};

            params.metaName = buildVariable('footest');
            strictEqual(undefined, resolveTemplateVariable(templateToTest, params), 'when no such meta exists');

            params.metaName = buildVariable('subject');
            strictEqual('foobartest', resolveTemplateVariable(templateToTest, params), 'when name meta exists');

            params.metaName = buildVariable('og:type');
            strictEqual('game.achievement', resolveTemplateVariable(templateToTest, params), 'when property meta exists');

            params.metaName = buildVariable('content-type');
            strictEqual('text/html; charset=UTF-8', resolveTemplateVariable(templateToTest, params), 'when http-equiv meta exists');
        });

        test("Matomo TagManager Template MatomoConfigurationVariable", function() {
            expect(1);
            var templateToTest = 'MatomoConfigurationVariable';
            var params = {
                matomoUrl: buildVariable('example.matomo'),
                idSite: buildVariable(5),
                enableLinkTracking: buildVariable(true),
            };

            deepEqual({
                "enableLinkTracking": true,
                "idSite": 5,
                "matomoUrl": "example.matomo"
            }, resolveTemplateVariable(templateToTest, params), 'returns an object with matomo config');
        });

        test("Matomo TagManager Template TimeSinceLoadVariable", function() {
            expect(3);
            var templateToTest = 'TimeSinceLoadVariable';
            var now = new Date().getTime();
            MatomoTagManager.dataLayer.push({'mtm.mtmScriptLoadedTime': now - 122000});

            var parameters = {};
            parameters.unit = buildVariable('ms');

            var value = resolveTemplateVariable(templateToTest, parameters)
            ok(value >= 122000 && value <= 123001, 'ms unit: ' + value);

            parameters.unit = buildVariable('s');
            value = resolveTemplateVariable(templateToTest, parameters)
            ok(value >= 122 && value <= 123, 'seconds unit: ' + value);

            parameters.unit = buildVariable('m');
            value = resolveTemplateVariable(templateToTest, parameters)
            strictEqual(2, value, 'minutes unit: ' + value);
        });

        test("Matomo TagManager Template JavaScriptVariable", function() {
            expect(7);
            var templateToTest = 'JavaScriptVariable';

            var defaultParameters = {window: {myvar1: 'myfootest', myvar2: {myinner: {test: 'foo'}}}};
            defaultParameters.variableName = buildVariable('myvar1');

            strictEqual('myfootest', resolveTemplateVariable(templateToTest, defaultParameters), 'resolves a simple window variable');

            defaultParameters.variableName = buildVariable('myvarfooo9991');
            strictEqual(undefined, resolveTemplateVariable(templateToTest, defaultParameters), 'when a variable does not exist returns undefined');
''
            defaultParameters.variableName = buildVariable('myvarfooo9991.mytest');
            strictEqual(undefined, resolveTemplateVariable(templateToTest, defaultParameters), 'when a variable with dot does not exist returns undefined');

            defaultParameters.variableName = buildVariable('myvar2.myouter999');
            strictEqual(undefined, resolveTemplateVariable(templateToTest, defaultParameters), 'when a variable with dot does not exist returns undefined even though first property exists');

            defaultParameters.variableName = buildVariable('myvar2');
            strictEqual('[object Object]', resolveTemplateVariable(templateToTest, defaultParameters), 'calls basically the tostring of an object when referencing it');

            defaultParameters.variableName = buildVariable('myvar2.myinner.test');
            strictEqual('foo', resolveTemplateVariable(templateToTest, defaultParameters), 'resolves nested variables referenced with a dot');

            defaultParameters.variableName = buildVariable('myvar2.myinner.testNotExists');
            strictEqual(undefined, resolveTemplateVariable(templateToTest, defaultParameters), 'nested, not exists');
        });

        test("Matomo TagManager Template ReferrerUrlVariable", function() {
            expect(9);
            var templateToTest = 'ReferrerUrlVariable';

            var referrerUrl = 'https://apache.matomo:80/index.php?module=CoreHome&action=index&idSite=1&period=day';
            var defaultParameters = {document: {referrer: referrerUrl}};

            defaultParameters.urlPart = buildVariable('href');
            strictEqual(referrerUrl, resolveTemplateVariable(templateToTest, defaultParameters), 'resolves href');

            defaultParameters.urlPart = buildVariable('host');
            strictEqual('apache.matomo:80', resolveTemplateVariable(templateToTest, defaultParameters), 'resolves host');

            defaultParameters.urlPart = buildVariable('hostname');
            strictEqual('apache.matomo', resolveTemplateVariable(templateToTest, defaultParameters), 'resolves hostname');

            defaultParameters.urlPart = buildVariable('origin');
            strictEqual('https://apache.matomo:80', resolveTemplateVariable(templateToTest, defaultParameters), 'resolves origin');

            defaultParameters.urlPart = buildVariable('pathname');
            strictEqual('/index.php', resolveTemplateVariable(templateToTest, defaultParameters), 'resolves pathname');

            defaultParameters.urlPart = buildVariable('port');
            strictEqual('80', resolveTemplateVariable(templateToTest, defaultParameters), 'resolves port');

            defaultParameters.urlPart = buildVariable('protocol');
            strictEqual('https', resolveTemplateVariable(templateToTest, defaultParameters), 'resolves protocol');

            defaultParameters.urlPart = buildVariable('search');
            strictEqual('module=CoreHome&action=index&idSite=1&period=day', resolveTemplateVariable(templateToTest, defaultParameters), 'resolves search');

            defaultParameters.urlPart = buildVariable('invalidfoo');
            strictEqual(undefined, resolveTemplateVariable(templateToTest, defaultParameters), 'when not a valid part set');

        });

        test("Matomo TagManager Template UrlVariable", function() {
            expect(12);
            var templateToTest = 'UrlVariable';

            var theLocation = {"href":"https://apache.matomo:81/index.php?module=CoreHome&action=index&idSite=1&period=day#foobarhash","ancestorOrigins":{},"origin":"https://apache.matomo","protocol":"https:","host":"apache.matomo","hostname":"apache.matomo","port":"81","pathname":"/index.php","search":"?module=CoreHome&action=index&idSite=1&period=day","hash":"#foobarhash"};
            var defaultParameters = {window: {location: theLocation}};

            defaultParameters.urlPart = buildVariable('href');
            strictEqual(theLocation.href, resolveTemplateVariable(templateToTest, defaultParameters), 'resolves href');

            defaultParameters.urlPart = buildVariable('hash');
            strictEqual('foobarhash', resolveTemplateVariable(templateToTest, defaultParameters), 'resolves hash');

            defaultParameters.urlPart = buildVariable('host');
            strictEqual('apache.matomo:81', resolveTemplateVariable(templateToTest, defaultParameters), 'resolves host');

            defaultParameters.urlPart = buildVariable('hostname');
            strictEqual('apache.matomo', resolveTemplateVariable(templateToTest, defaultParameters), 'resolves hostname');

            defaultParameters.urlPart = buildVariable('origin');
            strictEqual('https://apache.matomo:81', resolveTemplateVariable(templateToTest, defaultParameters), 'resolves origin');

            defaultParameters.urlPart = buildVariable('pathname');
            strictEqual('/index.php', resolveTemplateVariable(templateToTest, defaultParameters), 'resolves pathname');

            defaultParameters.urlPart = buildVariable('port');
            strictEqual('81', resolveTemplateVariable(templateToTest, defaultParameters), 'resolves port');

            defaultParameters.urlPart = buildVariable('protocol');
            strictEqual('https', resolveTemplateVariable(templateToTest, defaultParameters), 'resolves protocol');

            defaultParameters.urlPart = buildVariable('search');
            strictEqual('module=CoreHome&action=index&idSite=1&period=day', resolveTemplateVariable(templateToTest, defaultParameters), 'resolves search');

            defaultParameters.urlPart = buildVariable('invalidfoo');
            strictEqual(undefined, resolveTemplateVariable(templateToTest, defaultParameters), 'when not a valid part set');

            defaultParameters.window.location.href = 'http://apache.matomo/index.php?module=Cor';
            defaultParameters.window.location.protocol = 'http:';
            defaultParameters.window.location.port = '';
            defaultParameters.urlPart = buildVariable('port');
            strictEqual('80', resolveTemplateVariable(templateToTest, defaultParameters), 'reads default http port');

            defaultParameters.window.location.href = 'https://apache.matomo/index.php?module=Cor';
            defaultParameters.window.location.protocol = 'https:';

            defaultParameters.urlPart = buildVariable('port');
            strictEqual('443', resolveTemplateVariable(templateToTest, defaultParameters), 'reads default http port');
        });

        test("Matomo TagManager Template UrlParameterVariable", function() {
            expect(8);
            var templateToTest = 'UrlParameterVariable';

            var theLocation = {"search":"?module=CoreHome&action=index&idSite=1&empty=&period=day&xyz[]=foo&xyz[]=bar&&baz=hello"};
            var defaultParameters = {window: {location: theLocation}};

            defaultParameters.parameterName = buildVariable('module');
            strictEqual('CoreHome', resolveTemplateVariable(templateToTest, defaultParameters), 'resolves first parameter in search');

            defaultParameters.parameterName = buildVariable('baz');
            strictEqual('hello', resolveTemplateVariable(templateToTest, defaultParameters), 'resolves last parameter in search');

            defaultParameters.parameterName = buildVariable('idSite');
            strictEqual('1', resolveTemplateVariable(templateToTest, defaultParameters), 'resolves middle parameter in search');

            defaultParameters.parameterName = buildVariable('MoDUle');
            strictEqual(null, resolveTemplateVariable(templateToTest, defaultParameters), 'does not compare case insensitive');

            defaultParameters.parameterName = buildVariable('helLoNoTeXisting');
            strictEqual(null, resolveTemplateVariable(templateToTest, defaultParameters), 'when parameter not exists');

            defaultParameters.parameterName = buildVariable('empty');
            strictEqual('', resolveTemplateVariable(templateToTest, defaultParameters), 'when URL parameter has no value');

            defaultParameters.parameterName = buildVariable('xyz');
            strictEqual(null, resolveTemplateVariable(templateToTest, defaultParameters), 'when array URL parameter exists');

            defaultParameters.parameterName = buildVariable('xyz[]');
            strictEqual('foo', resolveTemplateVariable(templateToTest, defaultParameters), 'when array URL parameter exists returns only first value currently');
        });

        test("Matomo TagManager Template DomElementVariable", function() {
            expect(11);
            var templateToTest = 'DomElementVariable';

            var defaultParameters = {};
            defaultParameters.selectionMethod = buildVariable('elementId');
            defaultParameters.elementId = buildVariable('customTag3');
            strictEqual("my inner content my test", resolveTemplateVariable(templateToTest, defaultParameters), 'by elementId, the element contains children elements whose content should appear as well');

            defaultParameters.selectionMethod = buildVariable('elementId');
            defaultParameters.elementId = buildVariable('customTag4');
            strictEqual('my test', resolveTemplateVariable(templateToTest, defaultParameters), 'by elementId, the element contains no children elements');

            defaultParameters.selectionMethod = buildVariable('elementId');
            defaultParameters.elementId = buildVariable('customTag49999');
            strictEqual(undefined, resolveTemplateVariable(templateToTest, defaultParameters), 'by elementId, the element was not found');

            defaultParameters.selectionMethod = buildVariable('foobar');
            defaultParameters.elementId = buildVariable('customTag4');
            strictEqual(undefined, resolveTemplateVariable(templateToTest, defaultParameters), 'selection method does not exist');

            defaultParameters.selectionMethod = buildVariable('cssSelector');
            defaultParameters.cssSelector = buildVariable('.myTagFoo');
            strictEqual("lorem ipsum tag my inner content my test foo bar", resolveTemplateVariable(templateToTest, defaultParameters), 'cssSelector reads the value of the first matching element when multiple elements match this selector');

            defaultParameters.selectionMethod = buildVariable('cssSelector');
            defaultParameters.cssSelector = buildVariable('.notExisting');
            strictEqual(undefined, resolveTemplateVariable(templateToTest, defaultParameters), 'cssSelector does not match any');

            defaultParameters.selectionMethod = buildVariable('cssSelector');
            defaultParameters.cssSelector = buildVariable('.myTagFoo');
            defaultParameters.attributeName = buildVariable('attributeWithoutValue');
            strictEqual("", resolveTemplateVariable(templateToTest, defaultParameters), 'cssSelector reading attribute with no value');

            defaultParameters.attributeName = buildVariable('data-tag-test');
            strictEqual('', resolveTemplateVariable(templateToTest, defaultParameters), 'cssSelector reading attribute with dashes with no value');

            defaultParameters.attributeName = buildVariable('not-existing-attribute');
            strictEqual(null, resolveTemplateVariable(templateToTest, defaultParameters), 'cssSelector reading not existing attribute');

            defaultParameters.attributeName = buildVariable('mytagattribute');
            strictEqual('test', resolveTemplateVariable(templateToTest, defaultParameters), 'cssSelector reading attribute with value');

            defaultParameters.selectionMethod = buildVariable('elementId');
            defaultParameters.elementId = buildVariable('customTag3');
            defaultParameters.attributeName = buildVariable('alt');
            strictEqual('My Alt Title 3', resolveTemplateVariable(templateToTest, defaultParameters), 'elementId reading attribute with value');

        });

        test("Matomo TagManager Template WindowLoadedTrigger", function() {
            expect(1);
            var templateToTest = 'WindowLoadedTrigger';

            var events = [];
            setUpTemplateTrigger(templateToTest, {}, function (event) { events.push(event); });
            deepEqual([{"event": "WindowLoad"}], events, 'posts event directly as page is already loaded');
        });

        test("Matomo TagManager Template DomReadyTrigger", function() {
            expect(1);
            var templateToTest = 'DomReadyTrigger';

            var events = [];
            setUpTemplateTrigger(templateToTest, {}, function (event) { events.push(event); });
            deepEqual([{"event": "DOMReady"}], events, 'posts event directly as page is already loaded');
        });

        test("Matomo TagManager Template PageViewTrigger", function() {
            expect(1);
            var templateToTest = 'PageViewTrigger';

            var events = [];
            setUpTemplateTrigger(templateToTest, {}, function (event) { events.push(event); });
            deepEqual([{"event": "mtm.PageView"}], events, 'posts event directly when page is viewed');
        });

        test("Matomo TagManager Template TimerTrigger", function() {
            expect(3);
            var templateToTest = 'TimerTrigger';

            var defaultParameters = {triggerInterval: buildVariable(150), triggerLimit: buildVariable(3)};
            var events = [];
            setUpTemplateTrigger(templateToTest, defaultParameters, function (e) { events.push(e); });
            deepEqual([], events, 'should not be triggered just yet because timer');

            stop();
            setTimeout(function () {
                deepEqual([{"event": "mtm.Timer"}, {"event": "mtm.Timer"}, {"event": "mtm.Timer"}], events, 'should be triggered max 3 times');

                defaultParameters.eventName = buildVariable('customTestEvent');
                defaultParameters.triggerLimit = buildVariable(1);

                events = [];
                setUpTemplateTrigger(templateToTest, defaultParameters, function (e) { events.push(e); });
                setTimeout(function () {
                    deepEqual([{"event": "customTestEvent"}], events, 'should be triggered max once with set event name');

                    start();
                }, 400);

            }, 1000);
        });

        test("Matomo TagManager Template CustomEventTrigger", function() {
            expect(3);
            var templateToTest = 'CustomEventTrigger';

            var defaultParameters = {eventName: buildVariable('fooBarBaz')};

            var events = [];
            setUpTemplateTrigger(templateToTest, defaultParameters, function (event) { events.push(event); });
            deepEqual([], events, 'should not have posted the event yet as the request event is not triggered yet');

            _mtm.push({'event': 'myOtherEvent'});
            deepEqual([], events, 'should still have not triggered event cause it was a different event');

            _mtm.push({'event': 'fooBarBaz'});
            deepEqual([{"event": 'mtm.CustomEvent', 'mtm.customEventMatch': 'fooBarBaz'}], events, 'should have posted the event now as the requested event was triggered');
        });

        test("Matomo TagManager Template AllElementsClick", function() {
            expect(3);
            var templateToTest = 'AllElementsClickTrigger';

            var parameters = {};

            var events = [];
            setUpTemplateTrigger(templateToTest, parameters, function (event) { events.push(event); });
            deepEqual([], events, 'should not have posted the event yet as the requested event is not triggered yet');

            var target = document.getElementById('TagManager');
            target.addEventListener('click', function (event) {
                event.preventDefault(); // do not execute in ie10
            });
            triggerEvent(target, 'click', null, true);
            deepEqual([{
                "event": "mtm.AllElementsClick",
                "mtm.clickElement": target,
                "mtm.clickElementClasses": "myTagTest myTagFoo myTagTest4",
                "mtm.clickElementId": "TagManager",
                "mtm.clickElementUrl": null,
                "mtm.clickNodeName": "DIV",
                "mtm.clickText": "lorem ipsum tag my inner content my test foo bar"
            }], events, 'should have triggered click event');

            events = [];
            var target = document.getElementById('ClickTagManager2');
            target.addEventListener('click', function (event) {
                event.preventDefault(); // do not execute in ie10
            });
            triggerEvent(target, 'click', null, true);
            deepEqual([ {
                "event": "mtm.AllElementsClick",
                "mtm.clickElement": target,
                "mtm.clickElementClasses": "",
                "mtm.clickElementId": "ClickTagManager2",
                "mtm.clickElementUrl": "https://www.example.click/foo/bar",
                "mtm.clickNodeName": "A",
                "mtm.clickText": "my link"
            }], events, 'should have triggered a link click');
        });

        test("Matomo TagManager Template AllLinksClick", function() {
            expect(5);
            var templateToTest = 'AllLinksClickTrigger';

            var parameters = {};

            var events = [];
            setUpTemplateTrigger(templateToTest, parameters, function (event) { events.push(event); });
            deepEqual([], events, 'should not have posted the event yet as the requested event is not triggered yet');

            var target = document.getElementById('TagManager');
            target.addEventListener('click', function (event) {
                event.preventDefault(); // do not execute in ie10
            });
            triggerEvent(target, 'click', null, true);
            deepEqual([], events, 'should have not triggered click event because it is not a link');

            events = [];
            var target = document.getElementById('ClickTagManager2');
            target.addEventListener('click', function (event) {
                event.preventDefault(); // do not execute in ie10
            });
            triggerEvent(target, 'click', null, true);
            deepEqual([ {
                "event": "mtm.AllLinksClick",
                "mtm.clickElement": target,
                "mtm.clickElementClasses": "",
                "mtm.clickElementId": "ClickTagManager2",
                "mtm.clickElementUrl": "https://www.example.click/foo/bar",
                "mtm.clickNodeName": "A",
                "mtm.clickText": "my link"
            }], events, 'should have triggered a link click 2');

            events = [];
            var target = document.getElementById('ClickTagManager1');
            target.addEventListener('click', function (event) {
                event.preventDefault(); // do not execute in ie10
            });
            triggerEvent(target, 'click', null, true);
            deepEqual([ {
                "event": "mtm.AllLinksClick",
                "mtm.clickElement": target,
                "mtm.clickElementClasses": "tag123 clicktag23",
                "mtm.clickElementId": "ClickTagManager1",
                "mtm.clickElementUrl": "https://www.example.click",
                "mtm.clickNodeName": "A",
                "mtm.clickText": "my link"
            }], events, 'should have triggered a link click 1');

            events = [];
            var target = document.getElementById('ClickTagManager3Span');
            target.addEventListener('click', function (event) {
                event.preventDefault(); // do not execute in ie10
            });
            triggerEvent(target, 'click', null, true);
            deepEqual([ {
                "event": "mtm.AllLinksClick",
                "mtm.clickElement": document.getElementById('ClickTagManager3'),
                "mtm.clickElementClasses": "",
                "mtm.clickElementId": "ClickTagManager3",
                "mtm.clickElementUrl": "https://www.example.click/foo/bar3",
                "mtm.clickNodeName": "A",
                "mtm.clickText": "my link"
            }], events, 'should have triggered a link click 3');
        });

        test("Matomo TagManager Template FormSubmit", function() {
            expect(5);
            var templateToTest = 'FormSubmitTrigger';

            var parameters = {};

            var events = [];
            // needed for firefox
            var form = document.createElement('form');
            form.addEventListener('click', function (event) {
                event.preventDefault();
            });
            form.addEventListener('submit', function (event) {
                event.preventDefault();
            });
            setUpTemplateTrigger(templateToTest, parameters, function (event) { events.push(event); });
            deepEqual([], events, 'should not have posted the event yet as the requested event is not triggered yet');

            var target = document.getElementById('TagManager');
            triggerEvent(target, 'submit', null, true);
            deepEqual([], events, 'should have not triggered event because it is not a form element');

            document.body.appendChild(form);
            triggerEvent(form, 'click', null, true);
            deepEqual([], events, 'should have not triggered event because it is not a form submit');

            events = [];
            triggerEvent(form, 'submit', null, true);
            deepEqual([ {
                "event": "mtm.FormSubmit",
                "mtm.formElement": form,
                "mtm.formElementAction": location.href,
                "mtm.formElementClasses": "",
                "mtm.formElementId": null,
                "mtm.formElementName": null
            }], events, 'should have triggered a form submit event');

            form.setAttribute('action', '/post/data?x=1');
            form.classList.add('myclass1');
            form.classList.add('myclass2');
            form.setAttribute('id', 'myformIdtag');
            form.setAttribute('name', 'myformNameTag');
            events = [];
            triggerEvent(form, 'submit', null, true);
            deepEqual([ {
                "event": "mtm.FormSubmit",
                "mtm.formElement": form,
                "mtm.formElementAction": "/post/data?x=1",
                "mtm.formElementClasses": "myclass1 myclass2",
                "mtm.formElementId": 'myformIdtag',
                "mtm.formElementName": 'myformNameTag'
            }], events, 'should have triggered a form submit event');

            document.body.removeChild(form);
        });

        test("Matomo TagManager Template FullscreenTrigger", function() {
            expect(9);
            var templateToTest = 'FullscreenTrigger';

            var parameters = {
                triggerLimit: buildVariable(10),
                triggerAction: buildVariable('enter'),
                container: buildContainer({}, {})
            };
            var events = [];
            parameters = buildParameters(parameters);
            new TagManagerTemplate.Trigger[templateToTest](parameters, window.MatomoTagManager).setUp(function (event) { events.push(event); });

            deepEqual([], events, 'should not have posted the event yet as the requested event is not triggered yet');

            triggerEvent(document, 'webkitfullscreenchange', null, true);
            deepEqual([], events, 'should not trigger an exit action when requesting enter action');

            parameters.triggerAction = buildVariable('any');
            triggerEvent(document, 'webkitfullscreenchange', null, true);
            deepEqual([{"event": "mtm.Fullscreen","mtm.fullscreenAction": "exit"}], events, 'should trigger an exit action when requesting any action');

            events = [];
            parameters.triggerAction = buildVariable('exit');
            triggerEvent(document, 'webkitfullscreenchange', null, true);
            deepEqual([{"event": "mtm.Fullscreen","mtm.fullscreenAction": "exit"}], events, 'should trigger an exit action when requesting exit action');

            document.msFullscreenElement = true; // fake fullscreen

            events = [];
            parameters.triggerAction = buildVariable('exit');
            triggerEvent(document, 'webkitfullscreenchange', null, true);
            deepEqual([], events, 'should not trigger an enter action when requesting exit action');

            events = [];
            parameters.triggerAction = buildVariable('any');
            triggerEvent(document, 'webkitfullscreenchange', null, true);
            deepEqual([{"event": "mtm.Fullscreen","mtm.fullscreenAction": "enter"}], events, 'should trigger an enter action when requesting any action');

            events = [];
            parameters.triggerAction = buildVariable('enter');
            triggerEvent(document, 'webkitfullscreenchange', null, true);
            deepEqual([{"event": "mtm.Fullscreen","mtm.fullscreenAction": "enter"}], events, 'should trigger an enter action when requesting enter action');

            events = [];
            delete parameters.triggerAction;
            triggerEvent(document, 'webkitfullscreenchange', null, true);
            deepEqual([{"event": "mtm.Fullscreen","mtm.fullscreenAction": "enter"}], events, 'should request enter action by default');

            for (var i = 0; i < 50; i++) {
                triggerEvent(document, 'webkitfullscreenchange', null, true);
            }

            strictEqual(6, events.length, 'should apply the configured limit');

            delete document.msFullscreenElement;
        });

        test("Matomo TagManager Template JavaScriptErrorTrigger", function() {
            expect(5);
            var templateToTest = 'JavaScriptErrorTrigger';

            var parameters = {window: {onerror: null}};

            var events = [];
            setUpTemplateTrigger(templateToTest, parameters, function (event) { events.push(event); });
            deepEqual([], events, 'should not have posted the event yet as no error occured yet');

            var errorReturn = parameters.window.onerror('Uncaught Error: The error', 'https://matomo.org/tag/manager.js?cb=348181', 53, 19, new Error('The error'));

            strictEqual(false, errorReturn, 'our onerror should return false');

            deepEqual([{
                "event": "mtm.JavaScriptError",
                "mtm.errorLine": 53,
                "mtm.errorMessage": "Uncaught Error: The error",
                "mtm.errorUrl": "https://matomo.org/tag/manager.js?cb=348181"
            }], events, 'should have triggered an event');

            var ourEvent = {};
            parameters.window.onerror = function (message, url, linenumber, column, error) {
                ourEvent.message = message;
                ourEvent.url = url;
                ourEvent.linenumber = linenumber;
                ourEvent.column = column;
                ourEvent.error = error;
                return 439;
            };

            events = [];
            setUpTemplateTrigger(templateToTest, parameters, function (event) { events.push(event); });

            var theError = new Error('The error');
            errorReturn = parameters.window.onerror('Uncaught Error: The error', 'https://matomo.org/tag/manager.js?cb=348181', 53, 19, theError);

            strictEqual(439, errorReturn, 'when an onerror is already defined, should return the return value of that method');
            deepEqual({
                "column": 19,
                "error": theError,
                "linenumber": 53,
                "message": "Uncaught Error: The error",
                "url": "https://matomo.org/tag/manager.js?cb=348181"
            }, ourEvent, 'when an onerror is already defined, should forward the error to the already defined error method');

        });

        test("Matomo TagManager Template WindowUnloadTrigger", function() {
            expect(2);
            var templateToTest = 'WindowUnloadTrigger';

            var events = [];
            setUpTemplateTrigger(templateToTest, {}, function (event) { events.push(event); });
            deepEqual([], events, 'should not have been triggered just yet');
            triggerEvent(window, 'beforeunload');
            deepEqual([{"event": "WindowUnload"}], events, 'posts event directly as page is already loaded');
        });

        test("Matomo TagManager Template WindowLeaveTrigger", function() {
            expect(3);
            var templateToTest = 'WindowLeaveTrigger';

            var events = [];
            setUpTemplateTrigger(templateToTest, {}, function (event) { events.push(event); });
            deepEqual([], events, 'should not have been triggered just yet');

            triggerEvent(document.documentElement, 'mouseleave', {clientY: 2});
            deepEqual([], events, 'should not have been triggered just yet as there should be a timer');
            stop();
            setTimeout(function () {
                deepEqual([{"event": "WindowLeave"}], events, 'should have been triggered by now');
                start();
            }, 100);
        });

        test("Matomo TagManager Template HistoryChangeTrigger", function() {
            expect(3);
            var templateToTest = 'HistoryChangeTrigger';

            location.hash = '';

            var events = [];
            setUpTemplateTrigger(templateToTest, {}, function (event) { events.push(event); });
            deepEqual([], events, 'should not have been triggered just yet');

            var rand = parseInt(Math.random() * 10000000);
            var hashToSet = 'footest' + rand
            location.hash = '#' + hashToSet;

            function callHistory(method)
            {
                var rand = parseInt(Math.random() * 10000000);
                var urlparam = '?page=' + rand;
                if (MatomoTagManager.url.getQueryParameter('testNumber')) {
                    urlparam += '&testNumber=' + MatomoTagManager.url.getQueryParameter('testNumber')
                }
                history[method]({page: rand}, "title  " + rand, urlparam);
                return rand;
            }

            var origin = window.location.origin;
            var currentSearch = window.location.search;
            var currentPath = window.location.pathname;

            stop();
            setTimeout(function () {
                deepEqual([{
                    "event": "mtm.HistoryChange",
                    "mtm.historyChangeSource": "popstate",
                    "mtm.newUrl": origin + currentPath + currentSearch + '#' + hashToSet,
                    "mtm.oldUrlHash": "",
                    "mtm.newUrlHash": hashToSet,
                    "mtm.newUrlPath": currentPath,
                    "mtm.oldUrl": origin + currentPath + currentSearch,
                    "mtm.oldUrlSearch": currentSearch.substr(1),
                    "mtm.newUrlSearch": currentSearch.substr(1),
                    "mtm.oldHistoryState": window.history.state,
                    "mtm.oldUrlPath": "/tests/javascript/",
                    "mtm.newHistoryState": null
                }], events);
                events = [];

                var state = {page: rand};
                var urlparam = '?page=' + rand;
                var testNumber = MatomoTagManager.url.getQueryParameter('testNumber');
                var testNumberParam = '';
                if (testNumber) {
                    testNumberParam = '&testNumber=' + testNumber;
                    urlparam += testNumberParam;
                }
                var rand1 = callHistory('pushState');
                var rand2 = callHistory('pushState');
                var rand3 = callHistory('replaceState');
                history.back();
                setTimeout(function () {
                    deepEqual(
                        [
                            {
                                "event": "mtm.HistoryChange",
                                "mtm.historyChangeSource": "pushState",
                                "mtm.newHistoryState": {
                                    "page": rand1
                                },
                                "mtm.newUrl": origin + currentPath + "?page="+rand1+testNumberParam,
                                "mtm.newUrlHash": "",
                                "mtm.newUrlPath": currentPath,
                                "mtm.newUrlSearch": "page="+rand1+testNumberParam,
                                "mtm.oldHistoryState": null,
                                "mtm.oldUrl": origin + currentPath + currentSearch + '#' + hashToSet,
                                "mtm.oldUrlHash": hashToSet,
                                "mtm.oldUrlPath": currentPath,
                                "mtm.oldUrlSearch": currentSearch.substr(1)
                            },
                            {
                                "event": "mtm.HistoryChange",
                                "mtm.historyChangeSource": "pushState",
                                "mtm.newHistoryState": {
                                    "page": rand2
                                },
                                "mtm.newUrl": origin + currentPath + "?page="+rand2+testNumberParam,
                                "mtm.newUrlHash": "",
                                "mtm.newUrlPath": currentPath,
                                "mtm.newUrlSearch": "page=" +rand2+testNumberParam,
                                "mtm.oldHistoryState": {
                                    "page": rand1
                                },
                                "mtm.oldUrl": origin + currentPath + "?page="+rand1+testNumberParam,
                                "mtm.oldUrlHash": "",
                                "mtm.oldUrlPath": currentPath,
                                "mtm.oldUrlSearch": "page=" + rand1 +testNumberParam
                            },
                            {
                                "event": "mtm.HistoryChange",
                                "mtm.historyChangeSource": "replaceState",
                                "mtm.newHistoryState": {
                                    "page": rand3
                                },
                                "mtm.newUrl": origin + currentPath + "?page="+rand3+testNumberParam,
                                "mtm.newUrlHash": "",
                                "mtm.newUrlPath": currentPath,
                                "mtm.newUrlSearch": "page=" + rand3 + testNumberParam,
                                "mtm.oldHistoryState": {
                                    "page": rand2
                                },
                                "mtm.oldUrl": origin + currentPath + "?page="+rand2+testNumberParam,
                                "mtm.oldUrlHash": "",
                                "mtm.oldUrlPath": currentPath,
                                "mtm.oldUrlSearch": "page=" + rand2 + testNumberParam
                            },
                            {
                                "event": "mtm.HistoryChange",
                                "mtm.historyChangeSource": "popstate",
                                "mtm.newHistoryState": {
                                    "page": rand1
                                },
                                "mtm.newUrl": origin + currentPath + "?page="+rand1+testNumberParam,
                                "mtm.newUrlHash": "",
                                "mtm.newUrlPath": currentPath,
                                "mtm.newUrlSearch": "page="+ rand1+testNumberParam,
                                "mtm.oldHistoryState": {
                                    "page": rand3
                                },
                                "mtm.oldUrl": origin + currentPath + "?page="+rand3+testNumberParam,
                                "mtm.oldUrlHash": "",
                                "mtm.oldUrlPath": currentPath,
                                "mtm.oldUrlSearch": "page=" + rand3 + testNumberParam
                            }
                        ] , events, 'should have triggered a popstate event');
                    start();
                }, 300);
            }, 300);
        });

        test("Matomo TagManager Template ScrollReachTrigger", function() {
            expect(8);
            var templateToTest = 'ScrollReachTrigger';
            var params = {
                scrollType: buildVariable('verticalpixel'),
                pixels: buildVariable(1000),
                percentage: buildVariable(1),
            };

            // making sure we can scroll
            var div = document.createElement('div');
            div.setAttribute('style', 'height:5000px');
            document.body.appendChild(div);

            var events = [];
            setUpTemplateTrigger(templateToTest, params, function (event) { events.push(event); });
            deepEqual([], events, 'should not have been triggered just yet');
            window.scrollTo(0, 350);
            stop();
            setTimeout(function () {
                deepEqual([], events, 'should not have been triggered yet as not too far scrolled');

                window.scrollTo(0, 1250);

                setTimeout(function () {
                    strictEqual(1, events.length, 'should have set correct image source');
                    ok(events[0]['mtm.scrollDocumentHeightPx'] > 100, 'should have set correct scrollDocumentHeightPx');
                    ok(events[0]['mtm.scrollDocumentWidthPx'] > 100, 'should have set correct scrollDocumentHeightPx');
                    ok(events[0]['mtm.scrollVerticalPercentage'] > 2, 'should have set correct scrollVerticalPercentage');
                    ok(events[0]['mtm.scrollVerticalPercentage'] < 50, 'should have set correct scrollVerticalPercentage');
                    delete events[0]['mtm.scrollDocumentHeightPx'];
                    delete events[0]['mtm.scrollDocumentWidthPx'];
                    delete events[0]['mtm.scrollVerticalPercentage'];

                    deepEqual([{
                                "event": "mtm.ScrollReach",
                                "mtm.scrollHorizontalPercentage": 100,
                                "mtm.scrollLeftPx": MatomoTagManager.window.getViewportWidth(),
                                "mtm.scrollSource": "scroll",
                                "mtm.scrollTopPx": 1250 + MatomoTagManager.window.getViewportHeight(),
                            }], events, 'should have set scroll event');
                    document.body.removeChild(div);
                    window.scrollTo(0,0);
                    start();
                }, 700);
            }, 700);
        });

        test("Matomo TagManager Template ElementVisibilityTrigger", function() {
            expect(2);
            var templateToTest = 'ElementVisibilityTrigger';
            var params = {
                selectionMethod: buildVariable('elementId'),
                elementId: buildVariable('qunit-header'),
                fireTriggerWhen: buildVariable('oncePage'),
            };

            // making sure we can scroll
            var div = document.createElement('div');
            div.setAttribute('style', 'height:5000px');
            document.body.appendChild(div);

            var elementToFind = document.getElementById('qunit-header');
            window.scrollTo(0, elementToFind.offsetTop + 10)

            var events = [];
            setUpTemplateTrigger(templateToTest, params, function (event) { events.push(event); });

            stop();
            setTimeout(function () {
                deepEqual([{
                    "event": "mtm.ElementVisibility",
                    "mtm.elementVisibilityClasses": "",
                    "mtm.elementVisibilityId": "qunit-header",
                    "mtm.elementVisibilityNodeName": 'H1',
                    "mtm.elementVisibilityPercentage": 79.17,
                    "mtm.elementVisibilityText": "piwik.js: Unit Tests",
                    "mtm.elementVisibilityUrl": null
                }], events, 'should have triggered visibility event');

                events = [];
                // simulate another scroll
                MatomoTagManager.window.didScroll({target:window});
                setTimeout(function () {
                    deepEqual([], events, 'should not trigger the same event twice when configured to be triggered only once');

                    document.body.removeChild(div);
                    window.scrollTo(0,0);
                    start();
                }, 500);

            }, 500);
        });

        test("Matomo TagManager Template CustomImageTag", function() {
            expect(5);
            var templateToTest = 'CustomImageTag';
            var params = {document: document, customImageSrc: buildVariable('https://www.example.com/foo/bar')};

            fireTemplateTag(templateToTest, params);
            var addedImage = params.document.body.lastElementChild;

            strictEqual('https://www.example.com/foo/bar', addedImage.src, 'should have set correct image source');
            strictEqual('IMG', addedImage.nodeName, 'should have created correct element');
            params.document.body.removeChild(addedImage);

            params.cacheBusterEnabled = buildVariable(false);
            fireTemplateTag(templateToTest, params);
            addedImage = params.document.body.lastElementChild;

            strictEqual('https://www.example.com/foo/bar', addedImage.src, 'should not have added a cache buster when disabled');
            params.document.body.removeChild(addedImage);

            params.cacheBusterEnabled = buildVariable(true);
            fireTemplateTag(templateToTest, params);
            addedImage = params.document.body.lastElementChild;

            var expected = 'https://www.example.com/foo/bar?mtmcb=';
            strictEqual(expected, addedImage.src.substr(0, expected.length), 'should have added a cache buster when enabled');
            params.document.body.removeChild(addedImage);

            params.cacheBusterEnabled = buildVariable(true);
            params.customImageSrc = buildVariable('https://www.example.com/foo/bar?x=foo')
            fireTemplateTag(templateToTest, params);
            addedImage = params.document.body.lastElementChild;

            expected = 'https://www.example.com/foo/bar?x=foo&mtmcb=';
            strictEqual(expected, addedImage.src.substr(0, expected.length), 'should have added a cache buster when enabled when url already contains search params');
            params.document.body.removeChild(addedImage);
        });

        test("Matomo TagManager Template CustomHtmlTag", function() {
            expect(10);
            var templateToTest = 'CustomHtmlTag';
            var params = {document: document, customHtml: buildVariable('<div id="customHtmlTag1">my foo bar baz test</div><div id="customHtmlTag2">my test</div>')};

            fireTemplateTag(templateToTest, params);
            var addedElement1 = document.getElementById('customHtmlTag1');
            var addedElement2 = document.getElementById('customHtmlTag2');

            strictEqual('my foo bar baz test', addedElement1.innerText, 'should have set correct image source at end of body');
            strictEqual('my test', addedElement2.innerText, 'should have set correct image source');

            params.htmlPosition = buildVariable('headStart')
            params.customHtml = buildVariable('<style id="customStyleTag">.test{}</style>')
            fireTemplateTag(templateToTest, params);
            var addedStyle1 = document.getElementById('customStyleTag');

            strictEqual('.test{}', addedStyle1.innerText, 'should have added element to start of head style1');
            document.head.removeChild(addedStyle1);

            // testing joined
            params.customHtml = buildVariable({joinedVariable:['<div id="customStyleTag3">', '.test{}', '</div>']});
            fireTemplateTag(templateToTest, params);
            var addedStyle3 = document.getElementById('customStyleTag3');
            strictEqual('.test{}', addedStyle3.innerText, 'should have added element to start of head style3');
            document.head.removeChild(addedStyle3);

            // does not escape hardcoded string
            params.customHtml = buildVariable({joinedVariable:['<script id="customStyleTag4">', 'var x = {};', '</' + 'script>']});
            fireTemplateTag(templateToTest, params);
            var addedStyle4 = document.getElementById('customStyleTag4');
            strictEqual('var x = {};', addedStyle4.innerText, 'should have added element to start of head');
            document.head.removeChild(addedStyle4);

            // auto escapes JS when through variable
            params.customHtml = buildVariable({joinedVariable:['<script id="customStyleTag4">var x = ', {type: 'mytype2', name: 'myname2', Variable: {get: function (){ return '{}'; }}}, '</' + 'script>']});

            fireTemplateTag(templateToTest, params);
            var addedStyle4 = document.getElementById('customStyleTag4');
            strictEqual('var x = window.MatomoTagManager.customHtmlDataStore[0]', addedStyle4.innerText, 'should have added element to start of head');
            document.head.removeChild(addedStyle4);

            // auto escapes STYLEs when through variable
            params.customHtml = buildVariable({joinedVariable:['<style id="customStyleTag4">', {type: 'mytype2', name: 'myname2', Variable: {get: function (){ return '.foo[test=name]{ color: red; }'; }}}, '"</' + 'style>']});

            fireTemplateTag(templateToTest, params);
            var addedStyle4 = document.getElementById('customStyleTag4');
            strictEqual('\\2e foo\\5b test\\3d name\\5d \\7b \\20 color\\3a \\20 red\\3b \\20 \\7d \"', addedStyle4.innerText, 'should have escaped style');
            document.head.removeChild(addedStyle4);

            // auto escapes url in href attribute
            params.customHtml = buildVariable({joinedVariable:['<a id="customStyleTag4" href = "', {type: 'mytype2', name: 'myname2', Variable: {get: function (){ return 'http://www.mytesturl.de/?foo=bar&="test<>"'; }}}, '"></' + 'a>']});

            fireTemplateTag(templateToTest, params);
            var addedStyle4 = document.getElementById('customStyleTag4');
            strictEqual('http://www.mytesturl.de/?foo=bar&=%22test%3C%3E%22', addedStyle4.href, 'should detect href attribute');
            document.head.removeChild(addedStyle4);

            // no auto escape for regular div when through variable
            params.customHtml = buildVariable({joinedVariable:['<div id="customStyleTag4">var x = "', {type: 'mytype2', name: 'myname2', Variable: {get: function (){ return '{}'; }}}, '"</' + 'div>']});

            fireTemplateTag(templateToTest, params);
            var addedStyle4 = document.getElementById('customStyleTag4');
            strictEqual('var x = "{}"', addedStyle4.innerText, 'should have added element to start of head');
            document.head.removeChild(addedStyle4);

            // auto resolves objects
            params.customHtml = buildVariable({joinedVariable:['<script id="customStyleTag4">', {mytest: 'mytype2', myfoo: 'myname2'}, '</' + 'script>']});
            fireTemplateTag(templateToTest, params);
            var addedStyle4 = document.getElementById('customStyleTag4');
            strictEqual('window.MatomoTagManager.customHtmlDataStore[1]', addedStyle4.innerText, 'should have added element to start of head');
            document.head.removeChild(addedStyle4);
        });

        test("Matomo TagManager Template MatomoTag", function() {
            expect(2);
            var templateToTest = 'MatomoTag';
            var matomoUrl = (location.origin + location.pathname).replace('/tests/javascript/', '');
            var params = {
                matomoConfig: {get: function () {
                    return {
                        idSite: 1,
                        matomoUrl: matomoUrl,
                        trackingType: 'pageview'
                    };
                }}
            };

            fireTemplateTag(templateToTest, params);
            ok(true, 'does not fail to set up with minimal config for pageview');

            var params = {
                matomoConfig: {get: function () {
                        return {
                            idSite: 1,
                            matomoUrl: matomoUrl,
                            trackingType: 'event',
                            eventCategory: 'fooBar',
                            eventName: 'eventName',
                            eventAction: 'eventAction'
                        };
                    }}
            };

            fireTemplateTag(templateToTest, params);
            ok(true, 'does not fail to set up with minimal config for event');

        });

    })();
</script>