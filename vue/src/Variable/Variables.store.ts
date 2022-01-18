/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

import { reactive, computed, readonly } from 'vue';
import { Variable } from '../types';

interface VariablesStoreState {
  variables: Variable[];
  isLoading: boolean;
  isUpdating: boolean;
}

class VariablesStore {
  private privateState = reactive<VariablesStoreState>({
    variables: [],
    isLoading: false,
    isUpdating: false,
  });

  private state = computed(() => readonly(this.privateState));

  readonly isLoading = computed(() => this.state.value.isLoading);

  readonly isUpdating = computed(() => this.state.value.isUpdating);
}

export default new VariablesStore();
