/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

import { createAngularJsAdapter } from 'CoreHome';
import TriggerEdit from './TriggerEdit.vue';
import { Trigger } from '../types';

export default createAngularJsAdapter({
  component: TriggerEdit,
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      default(scope: any) {
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
    onChangeTrigger($event, vm, scope) {
      scope.idTrigger = ($event.trigger as Trigger).idtrigger;
    },
  },
  postCreate(vm, scope) {
    scope.$on('$destroy', () => {
      scope.idTrigger = null;
    });
  },
});
