/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

import './ImportVersion/ImportVersion.adapter';
import './VariableSelect/VariableSelect.adapter';
import './VariableSelectType/VariableSelectType.adapter';
import './Variable/VariableEdit.adapter';
import './Variable/VariableList.adapter';
import './Variable/VariableManage.adapter';
import './Trigger/Triggers.store.adapter';
import './Trigger/TriggerEdit.adapter';
import './Trigger/TriggerList.adapter';
import './Trigger/TriggerManage.adapter';
import './Tag/TagEdit.adapter';
import './Tag/TagList.adapter';
import './Tag/TagManage.adapter';

export { default as ImportVersion } from './ImportVersion/ImportVersion.vue';
export { default as VariableSelect } from './VariableSelect/VariableSelect.vue';
export { default as VariableSelectType } from './VariableSelectType/VariableSelectType.vue';
export { default as FieldTextareaVariable } from './Field/FieldTextareaVariable.vue';
export { default as FieldVariableTemplate } from './Field/FieldVariableTemplate.vue';
export { default as FieldVariableTypeTemplate } from './Field/FieldVariableTypeTemplate.vue';
export { default as VariableEdit } from './Variable/VariableEdit.vue';
export { default as VariableList } from './Variable/VariableList.vue';
export { default as VariableManage } from './Variable/VariableManage.vue';
export { default as TriggerEdit } from './Trigger/TriggerEdit.vue';
export { default as TriggerList } from './Trigger/TriggerList.vue';
export { default as TriggerManage } from './Trigger/TriggerManage.vue';
export { default as TagEdit } from './Tag/TagEdit.vue';
export { default as TagList } from './Tag/TagList.vue';
export { default as TagManage } from './Tag/TagManage.vue';
