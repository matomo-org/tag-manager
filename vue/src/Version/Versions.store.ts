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
import { Version } from '../types';

interface VersionsStoreState {
  versions: Version[];
  isLoadingVersions: boolean;
  isLoadingSingle: boolean;
  isUpdating: boolean;
}

class VersionsStore {
  private privateState = reactive<VersionsStoreState>({
    versions: [],
    isLoadingVersions: false,
    isLoadingSingle: false,
    isUpdating: false,
  });

  private state = computed(() => readonly(this.privateState));

  readonly isLoading = computed(() => {
    const state = this.state.value;
    return state.isLoadingVersions || state.isLoadingSingle;
  });

  readonly isUpdating = computed(() => this.state.value.isUpdating);

  readonly versions = computed(() => this.state.value.versions);

  private fetchPromise: Promise<Version[]> | null = null;

  reload(
    idContainer: string,
  ): ReturnType<VersionsStore['fetchVersions']> {
    this.privateState.versions = [];
    this.fetchPromise = null;
    return this.fetchVersions(idContainer);
  }

  fetchVersions(
    idContainer: string|number,
  ): Promise<VersionsStore['versions']['value']> {
    this.privateState.isLoadingVersions = true;
    this.privateState.versions = [];

    if (!this.fetchPromise) {
      this.fetchPromise = AjaxHelper.fetch<Version[]>({
        method: 'TagManager.getContainerVersions',
        idContainer,
        filter_limit: '-1',
      });
    }

    return Promise.resolve(this.fetchPromise).then((versions) => {
      this.privateState.versions = versions;
      this.privateState.isLoadingVersions = false;
      return this.versions.value;
    }).finally(() => {
      this.privateState.isLoadingVersions = false;
    });
  }

  findVersion(
    idContainer: string,
    idContainerVersion: number,
  ): Promise<DeepReadonly<Version>> {
    // before going through an API request we first try to find it in loaded versions
    const found = this.versions.value.find((v) => v.idcontainerversion === idContainerVersion);
    if (found) {
      return Promise.resolve(found);
    }

    // otherwise we fetch it via API
    this.privateState.isLoadingSingle = true;
    return AjaxHelper.fetch<Version>({
      idContainerVersion,
      idContainer,
      method: 'TagManager.getContainerVersion',
      filter_limit: '-1',
    }).then((record) => {
      this.privateState.versions = [...this.privateState.versions, record];
      return readonly(record);
    }).finally(() => {
      this.privateState.isLoadingSingle = false;
    });
  }

  deleteVersion(
    idContainer: string,
    idContainerVersion: number,
  ): Promise<void> {
    this.privateState.isUpdating = true;
    this.privateState.versions = [];

    return AjaxHelper.fetch(
      {
        idContainerVersion,
        idContainer,
        method: 'TagManager.deleteContainerVersion',
      },
      { withTokenInUrl: true },
    ).finally(() => {
      this.privateState.isUpdating = false;
    });
  }

  publishVersion(
    idContainer: string,
    idContainerVersion: number,
    environment: string,
  ): Promise<void> {
    this.privateState.isUpdating = true;
    return AjaxHelper.fetch({
      idContainer,
      idContainerVersion,
      environment,
      method: 'TagManager.publishContainerVersion',
    }).finally(() => {
      this.privateState.isUpdating = false;
    });
  }

  createOrUpdateVersion(
    version: DeepReadonly<Version>|Version,
    method: string,
    idContainer: string,
  ): Promise<{ value: number }> {
    this.privateState.isUpdating = true;

    return AjaxHelper.post<{ value: number }>(
      {
        method,
        idContainer,
        idContainerVersion: version.idcontainerversion,
      },
      {
        name: version.name,
        description: version.description,
      },
      { withTokenInUrl: true },
    ).finally(() => {
      this.privateState.isUpdating = false;
    });
  }
}

export default new VersionsStore();
