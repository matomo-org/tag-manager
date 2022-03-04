/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

import { ITimeoutService } from 'angular';
import { nextTick } from 'vue';
import { createAngularJsAdapter, clone } from 'CoreHome';
import VariableSelectType from './VariableSelectType.vue';

export default createAngularJsAdapter<[ITimeoutService]>({
  component: VariableSelectType,
  scope: {
    variableTypeName: {
      angularJsBind: '@',
    },
    variable: {
      angularJsBind: '=',
      vue: 'modelValue',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      default(scope: any) {
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
    'update:modelValue': (newValue: string|null, vm, scope, el, attrs, controller, $timeout) => {
      scope.variable = clone(newValue);
      $timeout();
    },
  },
  postCreate(vm, scope) {
    scope.$watch('variable', (newValue: string|null, oldValue: string|null) => {
      if (newValue !== oldValue) {
        nextTick(() => {
          vm.modelValue = clone(newValue);
        });
      }
    });
  },
});
