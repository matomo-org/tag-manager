/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

import { reactive, computed, readonly } from 'vue';
import { AjaxHelper } from 'CoreHome';

interface Context {
  id: string;
  name: string;
}

interface AvailableContextStoreState {
  contexts: Context[];
  isLoading: boolean;
}

class AvailableContextStore {
  private privateState = reactive<AvailableContextStoreState>({
    contexts: [],
    isLoading: false,
  });

  private state = computed(() => readonly(this.privateState));

  readonly isLoading = computed(() => this.state.value.isLoading);

  readonly contexts = computed(() => this.state.value.contexts);

  readonly contextsOptions = computed(() => this.contexts.value.map(
    ({ id, name }) => ({ key: id, value: name }),
  ));

  private initializePromise: Promise<void>|null = null;

  init() {
    if (!this.initializePromise) {
      this.initializePromise = this.fetchAvailableContexts();
    }

    return this.initializePromise;
  }

  private fetchAvailableContexts() {
    this.privateState.isLoading = true;
    return AjaxHelper.fetch<Context[]|Record<string, Context>>({
      method: 'TagManager.getAvailableContexts',
      filter_limit: '-1',
    }).then((contexts) => {
      let entities: Context[];
      if (Array.isArray(contexts)) {
        entities = contexts as Context[];
      } else {
        entities = Object.values(contexts as Record<string, Context>);
      }

      this.privateState.contexts = entities;
    }).finally(() => {
      this.privateState.isLoading = false;
    });
  }
}

export default new AvailableContextStore();
