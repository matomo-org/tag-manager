/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

import {
  reactive,
  computed,
  readonly,
  DeepReadonly,
} from 'vue';
import { AjaxHelper } from 'CoreHome';
import { Trigger } from '../types';

interface TriggersStoreState {
  triggers: Trigger[];
  isLoadingTriggers: boolean;
  isUpdating: boolean;
}

class TriggersStore {
  private privateState = reactive<TriggersStoreState>({
    triggers: [],
    isLoadingTriggers: false,
    isUpdating: false,
  });

  private state = computed(() => readonly(this.privateState));

  readonly isUpdating = computed(() => this.state.value.isUpdating);

  readonly triggers = computed(() => this.state.value.triggers);

  private fetchPromise: Promise<Trigger[]>;

  fetchTriggers(idContainer: string, idContainerVersion: number): Promise<DeepReadonly<Trigger[]>> {
    this.privateState.triggers = [];
    this.privateState.isLoadingTriggers.isLoadingTriggers = true;

    if (!this.fetchPromise) {
      this.fetchPromise = AjaxHelper.fetch<Trigger[]>({
        method: 'TagManager.getContainerTriggers',
        idContainer,
        idContainerVersion,
        filter_limit: '-1',
      });
    }

    return Promise.resolve(this.fetchPromise).then((triggers) => {
      this.privateState.triggers = triggers;
    }).finally(() => {
      this.privateState.isLoadingTriggers = false;
    });
  }

  fetchTriggersIfNotLoaded() {

  }
}

export default new TriggersStore();
