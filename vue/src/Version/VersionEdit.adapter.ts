/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

import { createAngularJsAdapter } from 'CoreHome';
import VersionEdit from './VersionEdit.vue';

export default createAngularJsAdapter({
  component: VersionEdit,
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
