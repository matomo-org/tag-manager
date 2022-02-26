/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

import { createAngularJsAdapter } from 'CoreHome';
import TagEdit from './TagEdit.vue';

export default createAngularJsAdapter({
  component: TagEdit,
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
