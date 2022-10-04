/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

import { createAngularJsAdapter } from 'CoreHome';
import ContainerDashboard from './ContainerDashboard.vue';

export default createAngularJsAdapter({
  component: ContainerDashboard,
  scope: {
    idContainer: {
      angularJsBind: '@',
    },
    dashboardHelpText: {
      angularJsBind: '@',
    },
    tagsHelpText: {
      angularJsBind: '@',
    },
    triggersHelpText: {
      angularJsBind: '@',
    },
    variablesHelpText: {
      angularJsBind: '@',
    },
    versionsHelpText: {
      angularJsBind: '@',
    },
  },
  directiveName: 'piwikContainerDashboard',
});
