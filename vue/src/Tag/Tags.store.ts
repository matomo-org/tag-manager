/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

import {
  computed,
  DeepReadonly,
  reactive,
  readonly,
} from 'vue';
import {TagTypeCategory, Tag, VariableCategory, Variable} from '../types';
import {AjaxHelper} from '../../../../../@types/CoreHome';

interface TagsStoreState {
  tags: Tag[];
  isLoadingTags: boolean;
  isLoadingSingle: boolean;
  isUpdating: boolean;
}

type AvailableTagPromises = Record<string, Promise<DeepReadonly<TagTypeCategory[]>>>;

class TagsStore {
  private privateState = reactive<TagsStoreState>({
    tags: [],
    isLoadingTags: false,
    isLoadingSingle: false,
    isUpdating: false,
  });

  private state = computed(() => readonly(this.privateState));

  readonly isLoading = computed(() => {
    const state = this.state.value;
    return state.isLoadingTags || state.isLoadingSingle;
  });

  readonly isUpdating = computed(() => this.state.value.isUpdating);

  readonly tags = computed(() => this.state.value.tags);

  private fetchPromise: Promise<Tag[]> | null = null;

  private availableTagsPromises: AvailableTagPromises = {};

  fetchTags(idContainer: string, idContainerVersion: number): Tag[] {
    this.privateState.isLoadingTags = true;
    this.privateState.tags = [];

    if (!this.fetchPromise) {
      this.fetchPromise = AjaxHelper.fetch<Tag[]>({
        method: 'TagManager.getContainerTags',
        idContainer,
        idContainerVersion,
        filter_limit: '-1',
      });
    }

    return Promise.resolve(this.fetchPromise).then((tags) => {
      this.privateState.tags = tags;
      this.privateState.isLoadingTags = false;
      return this.tags.value;
    }).finally(() => {
      this.privateState.isLoadingTags = false;
    });
  }

  reload(
    idContainer: string,
    idContainerVersion: number,
  ): ReturnType<TagsStore['fetchTags']> {
    this.privateState.tags = [];
    this.fetchPromise = null;
    this.availableTagsPromises = {};
    return this.fetchTags(idContainer, idContainerVersion);
  }

  findTag(
    idContainer: string,
    idContainerVersion: number,
    idTag: number,
  ): Promise<DeepReadonly<Tag>> {
    // before going through an API request we first try to find it in loaded variables
    const found = this.tags.value.find((v) => v.idtag === idTag);
    if (found) {
      return Promise.resolve(found);
    }

    // otherwise we fetch it via API
    this.privateState.isLoadingSingle = true;
    return AjaxHelper.fetch<Tag>({
      idTag,
      idContainer,
      idContainerVersion,
      method: 'TagManager.getContainerTag',
      filter_limit: '-1',
    }).then((record) => {
      this.privateState.tags = [...this.privateState.tags, record];
      return readonly(record);
    }).finally(() => {
      this.privateState.isLoadingSingle = false;
    });
  }

  fetchAvailableTags(idContext: string): TagsStore['availableTagsPromises'][''] {
    if (!this.availableTagsPromises[idContext]) {
      this.availableTagsPromises[idContext] = AjaxHelper.fetch<TagTypeCategory[]>({
        method: 'TagManager.getAvailableTagTypesInContext',
        idContext,
        filter_limit: '-1',
      }).then((tags) => readonly(tags));
    }

    return Promise.resolve(this.availableTagsPromises[idContext]);
  }

  createOrUpdateTag(
    tag: DeepReadonly<Tag>|Tag,
    method: string,
    idContainer: string,
    idContainerVersion: number,
    parameterValues: Record<string, unknown>,
    fireTriggerIds: number[],
    blockTriggerIds: number[],
  ): Promise<{ value: number }> {
    this.privateState.isUpdating = true;

    const mappedEntries = Object.entries(parameterValues).map(([key, value]) => {
      let newValue = value;
      if (typeof value === 'boolean') {
        newValue = (+value).toString();
      }
      return [key, newValue];
    });

    const parameters = Object.fromEntries(mappedEntries);

    return AjaxHelper.post<{ value: number }>(
      {
        idTag: tag.idtag,
        method,
        idContainer,
        idContainerVersion,
        type: tag.type,
        name: tag.name,
        startDate: tag.start_date,
        endDate: tag.end_date,
        fireLimit: tag.fire_limit,
        fireDelay: tag.fire_delay,
      },
      {
        parameters,
        fireTriggerIds,
        blockTriggerIds,
      },
      { withTokenInUrl: true },
    ).finally(() => {
      this.privateState.isUpdating = false;
    });
  }
}

export default new VariablesStore();
