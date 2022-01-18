/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

import { reactive, computed, readonly } from 'vue';
import { Variable } from '../types';
import {AjaxHelper} from '../../../../../@types/CoreHome';

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

  readonly variables = computed(() => this.state.value.variables);

  private fetchPromise: Promise<Variable[]>|null = null;

  fetchVariablesIfNotLoaded(idContainer: string|number, idContainerVersion: string|number) {
    if (!this.fetchPromise) {
      // needed for suggestNameForType() to make sure it is aware of all names
      this.fetchVariables(idContainer, idContainerVersion);
    }
  }

  fetchVariables(idContainer: string|number, idContainerVersion: string|number) {
    this.privateState.isLoading = true;
    this.privateState.variables = [];

    if (!this.fetchPromise) {
      this.fetchPromise = AjaxHelper.fetch<Variable[]>({
        method: 'TagManager.getContainerVariables',
        idContainer: idContainer,
        idContainerVersion: idContainerVersion,
        filter_limit: '-1',
      });
    }

    return Promise.resolve(this.fetchPromise).then((variables) => {
      this.privateState.variables = variables;
      this.privateState.isLoading = false;
      return variables;
    }).finally(() => {
      this.privateState.isLoading = false;
    });
  }
}

export default new VariablesStore();
