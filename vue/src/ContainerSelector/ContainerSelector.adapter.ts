/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

import { createAngularJsAdapter } from 'CoreHome';
import ContainerSelector from './ContainerSelector.vue';

export default createAngularJsAdapter({
  component: ContainerSelector,
  scope: {
    containerName: {
      angularJsBind: '@?',
    },
  },
  directiveName: 'piwikContainerSelector',
});
