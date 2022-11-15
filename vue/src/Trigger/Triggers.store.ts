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
import { Trigger, TriggerCategory } from '../types';

interface TriggersStoreState {
  triggers: Trigger[];
  isLoadingTriggers: boolean;
  isLoadingSingle: boolean;
  isUpdating: boolean;
}

type AvailableTriggerPromises = Record<string, Promise<DeepReadonly<TriggerCategory[]>>>;

class TriggersStore {
  private privateState = reactive<TriggersStoreState>({
    triggers: [],
    isLoadingTriggers: false,
    isLoadingSingle: false,
    isUpdating: false,
  });

  private state = computed(() => readonly(this.privateState));

  readonly isUpdating = computed(() => this.state.value.isUpdating);

  readonly isLoading = computed(() => {
    const state = this.state.value;
    return state.isLoadingTriggers || state.isLoadingSingle;
  });

  readonly triggers = computed(() => this.state.value.triggers);

  private fetchPromise: Promise<Trigger[]>|null = null;

  private availableTriggersPromises: AvailableTriggerPromises = {};

  fetchTriggers(
    idContainer: string,
    idContainerVersion: number,
  ): Promise<DeepReadonly<Trigger[]>> {
    this.privateState.triggers = [];
    this.privateState.isLoadingTriggers = true;

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
      return this.triggers.value;
    }).finally(() => {
      this.privateState.isLoadingTriggers = false;
    });
  }

  fetchTriggersIfNotLoaded(idContainer: string, idContainerVersion: number) {
    if (!this.fetchPromise) {
      // needed for suggestNameForType() to make sure it is aware of all names
      this.fetchTriggers(idContainer, idContainerVersion);
    }
  }

  fetchAvailableTriggers(idContext: string) {
    if (!this.availableTriggersPromises[idContext]) {
      this.availableTriggersPromises[idContext] = AjaxHelper.fetch({
        method: 'TagManager.getAvailableTriggerTypesInContext',
        idContext,
        filter_limit: '-1',
      });
    }

    return Promise.resolve(this.availableTriggersPromises[idContext]);
  }

  findTrigger(
    idContainer: string,
    idContainerVersion: number,
    idTrigger: number,
  ): Promise<DeepReadonly<Trigger>> {
    // before going through an API request we first try to find it in loaded variables
    const found = this.triggers.value.find((v) => v.idtrigger === idTrigger);
    if (found) {
      return Promise.resolve(found);
    }

    // otherwise we fetch it via API
    this.privateState.isLoadingSingle = true;
    return AjaxHelper.fetch<Trigger>({
      idTrigger,
      idContainer,
      idContainerVersion,
      method: 'TagManager.getContainerTrigger',
      filter_limit: '-1',
    }).then((record) => {
      this.privateState.triggers = [...this.privateState.triggers, record];
      return readonly(record);
    }).finally(() => {
      this.privateState.isLoadingSingle = false;
    });
  }

  suggestNameForType(templateId: string): string|undefined {
    for (let counter = 0; counter < 100; counter += 1) {
      let name = templateId;
      if (counter) {
        name = `${name} (${counter})`;
      }

      const isFree = !this.triggers.value.some((v) => v.name === name);
      if (isFree) {
        return name;
      }
    }
    return undefined;
  }

  createOrUpdateTrigger(
    trigger: DeepReadonly<Trigger>|Trigger,
    method: string,
    idContainer: string,
    idContainerVersion: number,
    parameterValues: Record<string, unknown>,
  ): Promise<{ value: number }> {
    const mappedEntries = Object.entries(parameterValues).map(([key, value]) => {
      let newValue = value;
      if (typeof value === 'boolean') {
        newValue = (+value).toString();
      }
      return [key, newValue];
    });

    const parameters = Object.fromEntries(mappedEntries);
    const conditions = trigger.conditions.filter(
      (c) => c && c.actual && c.comparison && c.expected,
    );

    this.privateState.isUpdating = true;
    return AjaxHelper.post<{ value: number }>(
      {
        idTrigger: trigger.idtrigger,
        method,
        idContainer,
        idContainerVersion,
        type: trigger.type,
        name: trigger.name,
        description: trigger.description,
      },
      {
        parameters,
        conditions,
      },
      { withTokenInUrl: true },
    ).finally(() => {
      this.privateState.isUpdating = false;
    });
  }

  reload(
    idContainer: string,
    idContainerVersion: number,
  ): ReturnType<TriggersStore['fetchTriggers']> {
    this.privateState.triggers = [];
    this.fetchPromise = null;
    this.availableTriggersPromises = {};
    return this.fetchTriggers(idContainer, idContainerVersion);
  }

  deleteTrigger(
    idContainer: string,
    idContainerVersion: number,
    idTrigger: number,
  ): Promise<void> {
    this.privateState.isUpdating = true;
    this.privateState.triggers = [];

    return AjaxHelper.fetch(
      {
        idTrigger,
        idContainerVersion,
        idContainer,
        method: 'TagManager.deleteContainerTrigger',
      },
      { withTokenInUrl: true },
    ).finally(() => {
      this.privateState.isUpdating = false;
    });
  }
}

export default new TriggersStore();
