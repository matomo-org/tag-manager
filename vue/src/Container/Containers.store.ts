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
import { Container } from '../types';

interface ContainersStoreState {
  containers: Container[];
  isLoadingContainers: boolean;
  isLoadingSingle: boolean;
  isUpdating: boolean;
}

class ContainersStore {
  private privateState = reactive<ContainersStoreState>({
    containers: [],
    isLoadingContainers: false,
    isLoadingSingle: false,
    isUpdating: false,
  });

  private state = computed(() => readonly(this.privateState));

  readonly isLoading = computed(() => {
    const state = this.state.value;
    return state.isLoadingContainers || state.isLoadingSingle;
  });

  readonly isUpdating = computed(() => this.state.value.isUpdating);

  readonly containers = computed(() => this.state.value.containers);

  private fetchPromise: Promise<Container[]> | null = null;

  reload(): ReturnType<ContainersStore['fetchContainers']> {
    this.privateState.containers = [];
    this.fetchPromise = null;
    return this.fetchContainers();
  }

  fetchContainers(): Promise<ContainersStore['containers']['value']> {
    this.privateState.isLoadingContainers = true;
    this.privateState.containers = [];

    if (!this.fetchPromise) {
      this.fetchPromise = AjaxHelper.fetch<Container[]>({
        method: 'TagManager.getContainers',
        filter_limit: '-1',
      });
    }

    return Promise.resolve(this.fetchPromise).then((containers) => {
      this.privateState.containers = containers;
      this.privateState.isLoadingContainers = false;
      return this.containers.value;
    }).finally(() => {
      this.privateState.isLoadingContainers = false;
    });
  }

  findContainer(idContainer: string): Promise<DeepReadonly<Container>> {
    // before going through an API request we first try to find it in loaded containers
    const found = this.containers.value.find((v) => v.idcontainer === idContainer);
    if (found) {
      return Promise.resolve(found);
    }

    // otherwise we fetch it via API
    this.privateState.isLoadingSingle = true;
    return AjaxHelper.fetch<Container>({
      idContainer,
      method: 'TagManager.getContainer',
      filter_limit: '-1',
    }).then((record) => {
      this.privateState.containers = [...this.privateState.containers, record];
      return readonly(record);
    }).finally(() => {
      this.privateState.isLoadingSingle = false;
    });
  }

  deleteContainer(idContainer: string): Promise<void> {
    this.privateState.isUpdating = true;
    this.privateState.containers = [];

    return AjaxHelper.fetch(
      {
        idContainer,
        method: 'TagManager.deleteContainer',
      },
      { withTokenInUrl: true },
    ).finally(() => {
      this.privateState.isUpdating = false;
    });
  }

  createOrUpdateContainer(
    container: DeepReadonly<Container>|Container,
    method: string,
  ): Promise<{ value: number }> {
    this.privateState.isUpdating = true;

    return AjaxHelper.post<{ value: number }>(
      {
        method,
        idContainer: container.idcontainer,
      },
      {
        name: container.name,
        description: container.description,
        context: container.context,
      },
      { withTokenInUrl: true },
    ).finally(() => {
      this.privateState.isUpdating = false;
    });
  }
}

export default new ContainersStore();
