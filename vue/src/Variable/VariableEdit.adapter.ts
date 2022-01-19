/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

import { createAngularJsAdapter } from 'CoreHome';
import VariableEdit from './VariableEdit.vue';
import { Variable } from '../types';

export default createAngularJsAdapter({
  component: VariableEdit,
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      default(scope: any) {
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
    onChangeVariable($event, vm, scope) {
      scope.idVariable = ($event.variable as Variable).idvariable;
    },
  },
  postCreate(vm, scope) {
    scope.$on('$destroy', () => {
      scope.idVariable = null;
    });
  },
});
