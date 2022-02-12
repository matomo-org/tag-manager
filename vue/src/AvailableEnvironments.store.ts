/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

import { reactive, computed, readonly } from 'vue';
import { AjaxHelper, lazyInitSingleton } from 'CoreHome';

interface Environment {
  id: string;
  name: string;
}

interface AvailableEnvironmentStoreState {
  environmentsWithPublish: Environment[];
  isLoading: boolean;
}

class AvailableEnvironmentStore {
  private privateState = reactive<AvailableEnvironmentStoreState>({
    environmentsWithPublish: [],
    isLoading: false,
  });

  private state = computed(() => readonly(this.privateState));

  readonly isLoading = computed(() => this.state.value.isLoading);

  readonly environmentsWithPublish = computed(() => this.state.value.environmentsWithPublish);

  readonly environmentsWithPublishOptions = computed(
    () => this.environmentsWithPublish.value.map(
      ({ id, name }) => ({ key: id, value: name }),
    ),
  );

  constructor() {
    this.fetchEnvironments();
  }

  private fetchEnvironments() {
    this.privateState.isLoading = true;
    AjaxHelper.fetch<Environment[]>({
      method: 'TagManager.getAvailableEnvironmentsWithPublishCapability',
      filter_limit: '-1',
    }).then((environmentsWithPublish) => {
      this.privateState.environmentsWithPublish = environmentsWithPublish;
    }).finally(() => {
      this.privateState.isLoading = false;
    });
  }
}

export default lazyInitSingleton(AvailableEnvironmentStore) as AvailableEnvironmentStore;
