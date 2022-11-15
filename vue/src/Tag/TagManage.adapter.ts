/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

import { createAngularJsAdapter } from 'CoreHome';
import TagManage from './TagManage.vue';

export default createAngularJsAdapter({
  component: TagManage,
  scope: {
    idContainerVersion: {
      angularJsBind: '@',
      transform(value: unknown) {
        return value ? parseInt(value as string, 10) : undefined;
      },
    },
    idContainer: {
      angularJsBind: '@',
    },
    tagsHelpText: {
      angularJsBind: '@',
    },
  },
  directiveName: 'piwikTagManage',
});
