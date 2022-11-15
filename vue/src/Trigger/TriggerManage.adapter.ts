/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

import { createAngularJsAdapter } from 'CoreHome';
import TriggerManage from './TriggerManage.vue';

export default createAngularJsAdapter({
  component: TriggerManage,
  scope: {
    idContainerVersion: {
      angularJsBind: '@',
      transform(v: unknown) {
        return typeof v === 'string' ? parseInt(v, 10) : v;
      },
    },
    idContainer: {
      angularJsBind: '@',
    },
    triggersHelpText: {
      angularJsBind: '@',
    },
  },
  directiveName: 'piwikTriggerManage',
});
