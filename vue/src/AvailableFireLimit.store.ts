/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

import { reactive, computed, readonly } from 'vue';
import { AjaxHelper } from 'CoreHome';

interface FireLimit {
  id: string;
  name: string;
}

interface AvailableFireLimitStoreState {
  fireLimits: FireLimit[];
  isLoading: boolean;
}

class AvailableFireLimitStore {
  private privateState = reactive<AvailableFireLimitStoreState>({
    fireLimits: [],
    isLoading: false,
  });

  private state = computed(() => readonly(this.privateState));

  readonly isLoading = computed(() => this.state.value.isLoading);

  readonly fireLimits = computed(() => this.state.value.fireLimits);

  readonly fireLimitsOptions = computed(() => this.fireLimits.value.map(
    ({ id, name }) => ({ key: id, value: name }),
  ));

  private initializePromise: Promise<void>|null = null;

  init() {
    if (!this.initializePromise) {
      this.initializePromise = this.fetchAvailableFireLimits();
    }

    return this.initializePromise;
  }

  private fetchAvailableFireLimits() {
    this.privateState.isLoading = true;
    return AjaxHelper.fetch<FireLimit[]|Record<string, FireLimit>>({
      method: 'TagManager.getAvailableTagFireLimits',
      filter_limit: '-1',
    }).then((fireLimits) => {
      let entities: FireLimit[];
      if (Array.isArray(fireLimits)) {
        entities = fireLimits as FireLimit[];
      } else {
        entities = Object.values(fireLimits as Record<string, FireLimit>);
      }

      this.privateState.fireLimits = entities;
    }).finally(() => {
      this.privateState.isLoading = false;
    });
  }
}

export default new AvailableFireLimitStore();
