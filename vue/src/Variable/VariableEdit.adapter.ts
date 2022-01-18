/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

import { createAngularJsAdapter } from 'CoreHome';
import VariableEdit from './VariableEdit.vue';

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
    onChangeVariable: {
      angularJsBind: '&?',
    },
  },
  directiveName: 'piwikVariableEdit',
});
