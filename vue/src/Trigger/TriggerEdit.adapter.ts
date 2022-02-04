/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

import { createAngularJsAdapter } from 'CoreHome';
import TriggerEdit from './TriggerEdit.vue';

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
    onChangeTrigger: {
      angularJsBind: '&?',
    },
  },
  directiveName: 'piwikTriggerEdit',
});
