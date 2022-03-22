/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

window.addEventListener('Matomo.addAngularJsAdapters', function (event) {
  var createAngularJsAdapter = event.detail[0];
  var nextTick = window.Vue.nextTick;

  createAngularJsAdapter({
    component: { plugin: 'TagManager', component: 'ContainerEdit' },
    scope: {
      idContainer: {
        angularJsBind: '=',
      },
    },
    directiveName: 'piwikContainerEdit',
  });

  createAngularJsAdapter({
    component: { plugin: 'TagManager', component: 'ContainerList' },
    directiveName: 'piwikContainerList',
  });

  createAngularJsAdapter({
    component: { plugin: 'TagManager', component: 'ContainerManage' },
    directiveName: 'piwikContainerManage',
  });

  createAngularJsAdapter({
    component: { plugin: 'TagManager', component: 'ContainerDashboard' },
    scope: {
      idContainer: {
        angularJsBind: '@',
      },
    },
    directiveName: 'piwikContainerDashboard',
  });

  createAngularJsAdapter({
    component: { plugin: 'TagManager', component: 'ContainerSelector' },
    scope: {
      containerName: {
        angularJsBind: '@?',
      },
    },
    directiveName: 'piwikContainerSelector',
  });

  createAngularJsAdapter({
    component: { plugin: 'TagManager', component: 'ImportVersion' },
    scope: {
      idContainer: {
        angularJsBind: '=',
      },
    },
    directiveName: 'piwikImportVersion',
  });

  createAngularJsAdapter({
    component: { plugin: 'TagManager', component: 'ManageInstallTagCode' },
    scope: {
      idContainer: {
        angularJsBind: '@',
      },
    },
    directiveName: 'piwikManageInstallTagCode',
  });

  createAngularJsAdapter({
    component: { plugin: 'TagManager', component: 'TagEdit' },
    scope: {
      idTag: {
        angularJsBind: '=',
      },
      idContainer: {
        angularJsBind: '=',
      },
      idContainerVersion: {
        angularJsBind: '=',
      },
      newTagType: {
        angularJsBind: '=',
      },
    },
    directiveName: 'piwikTagEdit',
  });

  createAngularJsAdapter({
    component: { plugin: 'TagManager', component: 'TagList' },
    scope: {
      idContainer: {
        angularJsBind: '=',
      },
      idContainerVersion: {
        angularJsBind: '=',
      },
    },
    directiveName: 'piwikTagList',
  });

  createAngularJsAdapter({
    component: { plugin: 'TagManager', component: 'TagManage' },
    scope: {
      idContainerVersion: {
        angularJsBind: '@',
        transform: function (value) {
          return value ? parseInt(value, 10) : undefined;
        },
      },
      idContainer: {
        angularJsBind: '@',
      },
    },
    directiveName: 'piwikTagManage',
  });

  createAngularJsAdapter({
    component: { plugin: 'TagManager', component: 'TagmanagerTrackingCode' },
    directiveName: 'matomoTagmanagerTrackingCode',
  });

  createAngularJsAdapter({
    component: { plugin: 'TagManager', component: 'TriggerEdit' },
    scope: {
      idTrigger: {
        angularJsBind: '=',
      },
      idContainer: {
        angularJsBind: '=',
      },
      idContainerVersion: {
        angularJsBind: '=',
      },
      newTriggerType: {
        angularJsBind: '=',
      },
      isEmbedded: {
        'default': function (scope) {
          return !!scope.onChangeTrigger;
        },
      },
      onChangeTrigger: {
        angularJsBind: '&?',
        vue: 'changeTrigger',
      },
    },
    directiveName: 'piwikTriggerEdit',
    events: {
      onChangeTrigger: function ($event, vm, scope) {
        scope.idTrigger = $event.trigger.idtrigger;
      },
    },
    postCreate: function (vm, scope) {
      scope.$on('$destroy', function () {
        scope.idTrigger = null;
      });
    },
  });

  createAngularJsAdapter({
    component: { plugin: 'TagManager', component: 'TriggerList' },
    scope: {
      idContainer: {
        angularJsBind: '=',
      },
      idContainerVersion: {
        angularJsBind: '=',
      },
    },
    directiveName: 'piwikTriggerList',
  });

  createAngularJsAdapter({
    component: { plugin: 'TagManager', component: 'TriggerManage' },
    scope: {
      idContainerVersion: {
        angularJsBind: '@',
        transform: function (v) {
          return typeof v === 'string' ? parseInt(v, 10) : v;
        },
      },
      idContainer: {
        angularJsBind: '@',
      },
    },
    directiveName: 'piwikTriggerManage',
  });

  createAngularJsAdapter({
    component: { plugin: 'TagManager', component: 'VariableEdit' },
    scope: {
      idVariable: {
        angularJsBind: '=',
      },
      idContainer: {
        angularJsBind: '=',
      },
      idContainerVersion: {
        angularJsBind: '=',
      },
      variableType: {
        angularJsBind: '=?',
      },
      isEmbedded: {
        'default': function (scope) {
          return !!scope.onChangeVariable;
        },
      },
      onChangeVariable: {
        angularJsBind: '&?',
        vue: 'changeVariable',
      },
    },
    directiveName: 'piwikVariableEdit',
    events: {
      onChangeVariable: function ($event, vm, scope) {
        scope.idVariable = $event.variable.idvariable;
      },
    },
    postCreate: function (vm, scope) {
      scope.$on('$destroy', () => {
        scope.idVariable = null;
      });
    },
  });

  createAngularJsAdapter({
    component: { plugin: 'TagManager', component: 'VariableList' },
    scope: {
      idContainer: {
        angularJsBind: '=',
      },
      idContainerVersion: {
        angularJsBind: '=',
      },
    },
    directiveName: 'piwikVariableList',
  });

  createAngularJsAdapter({
    component: { plugin: 'TagManager', component: 'VariableManage' },
    scope: {
      idContainerVersion: {
        angularJsBind: '@',
        transform: function (value) {
          return value ? parseInt(value, 10) : undefined;
        },
      },
      idContainer: {
        angularJsBind: '@',
      },
    },
    directiveName: 'piwikVariableManage',
  });

  createAngularJsAdapter({
    component: { plugin: 'TagManager', component: 'VariableSelect' },
    scope: {
      idContainer: {
        angularJsBind: '=',
      },
      idContainerVersion: {
        angularJsBind: '=',
      },
      onSelectVariable: {
        angularJsBind: '&?',
        vue: 'selectVariable',
      },
    },
    directiveName: 'piwikVariableSelect',
  });

  createAngularJsAdapter({
    component: { plugin: 'TagManager', component: 'VariableSelectType' },
    scope: {
      variableTypeName: {
        angularJsBind: '@',
      },
      variable: {
        angularJsBind: '=',
        vue: 'modelValue',
        'default': function (scope) {
          return scope.variable;
        },
      },
      variableType: {
        angularJsBind: '@',
      },
    },
    directiveName: 'piwikVariableSelectType',
    $inject: ['$timeout'],
    events: {
      'update:modelValue': function (newValue, vm, scope, el, attrs, controller, $timeout) {
        scope.variable = CoreHome.clone(newValue);
        $timeout();
      },
    },
    postCreate: function (vm, scope) {
      scope.$watch('variable', (newValue, oldValue) => {
        if (newValue !== oldValue) {
          nextTick(function () {
            vm.modelValue = CoreHome.clone(newValue);
          });
        }
      });
    },
  });

  createAngularJsAdapter({
    component: { plugin: 'TagManager', component: 'VersionEdit' },
    scope: {
      idContainerVersion: {
        angularJsBind: '=',
      },
      idContainer: {
        angularJsBind: '=',
      },
      onChangeVersion: {
        angularJsBind: '&?',
        vue: 'changeVersion',
      },
    },
    directiveName: 'piwikVersionEdit',
  });

  createAngularJsAdapter({
    component: { plugin: 'TagManager', component: 'VersionList' },
    scope: {
      idContainer: {
        angularJsBind: '=',
      },
    },
    directiveName: 'piwikVersionList',
  });

  createAngularJsAdapter({
    component: { plugin: 'TagManager', component: 'VersionManage' },
    scope: {
      idContainer: {
        angularJsBind: '@',
      },
    },
    directiveName: 'piwikVersionManage',
  });
});
