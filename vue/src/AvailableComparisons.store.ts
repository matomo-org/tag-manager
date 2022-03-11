/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

import { reactive, computed, readonly } from 'vue';
import { AjaxHelper } from 'CoreHome';

interface Comparison {
  id: string;
  name: string;
}

interface AvailableComparisonsStoreState {
  comparisons: Comparison[];
  isLoading: boolean;
}

class AvailableComparisonsStore {
  private privateState = reactive<AvailableComparisonsStoreState>({
    comparisons: [],
    isLoading: false,
  });

  private state = computed(() => readonly(this.privateState));

  readonly isLoading = computed(() => this.state.value.isLoading);

  readonly comparisons = computed(() => this.state.value.comparisons);

  readonly comparisonOptions = computed(() => this.comparisons.value.map(
    ({ id, name }) => ({ key: id, value: name }),
  ));

  private initializePromise: Promise<void>|null = null;

  init() {
    if (!this.initializePromise) {
      this.initializePromise = this.fetchAvailableComparisons();
    }

    return this.initializePromise;
  }

  private fetchAvailableComparisons() {
    this.privateState.isLoading = true;
    return AjaxHelper.fetch<Comparison[]>({
      method: 'TagManager.getAvailableComparisons',
      filter_limit: '-1',
    }).then((comparisons) => {
      this.privateState.comparisons = comparisons;
    }).finally(() => {
      this.privateState.isLoading = false;
    });
  }
}

export default new AvailableComparisonsStore();
