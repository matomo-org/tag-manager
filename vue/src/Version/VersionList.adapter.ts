/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

import { createAngularJsAdapter } from 'CoreHome';
import VersionList from './VersionList.vue';

export default createAngularJsAdapter({
  component: VersionList,
  scope: {
    idContainer: {
      angularJsBind: '=',
    },
  },
  directiveName: 'piwikVersionList',
});
