/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

import { reactive, computed, readonly } from 'vue';
import { AjaxHelper } from 'CoreHome';

interface Environment {
  id: string;
  name: string;
  disabled: boolean;
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
      // eslint-disable-next-line
      ({ id, name, disabled }) => ({ key: id, value: name, disabled: false }),
    ),
  );

  private initializePromise: Promise<void>|null = null;

  init() {
    if (!this.initializePromise) {
      this.initializePromise = this.fetchEnvironments();
    }

    return this.initializePromise;
  }

  private fetchEnvironments() {
    this.privateState.isLoading = true;
    return AjaxHelper.fetch<Environment[]|Record<string, Environment>>({
      method: 'TagManager.getAvailableEnvironmentsWithPublishCapability',
      filter_limit: '-1',
    }).then((environmentsWithPublish) => {
      let entities: Environment[];
      if (Array.isArray(environmentsWithPublish)) {
        entities = environmentsWithPublish as Environment[];
      } else {
        entities = Object.values(environmentsWithPublish as Record<string, Environment>);
      }

      this.privateState.environmentsWithPublish = entities;
    }).finally(() => {
      this.privateState.isLoading = false;
    });
  }
}

export default new AvailableEnvironmentStore();
