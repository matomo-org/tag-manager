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
import { Variable, VariableCategory } from '../types';

interface VariablesStoreState {
  variables: Variable[];
  isLoadingVars: boolean;
  isLoadingSingle: boolean;
  isUpdating: boolean;
}

type AvailableVariablePromises = Record<string, Promise<DeepReadonly<VariableCategory[]>>>;

class VariablesStore {
  private privateState = reactive<VariablesStoreState>({
    variables: [],
    isLoadingVars: false,
    isLoadingSingle: false,
    isUpdating: false,
  });

  private state = computed(() => readonly(this.privateState));

  readonly isLoading = computed(() => {
    const state = this.state.value;
    return state.isLoadingVars || state.isLoadingSingle;
  });

  readonly isUpdating = computed(() => this.state.value.isUpdating);

  readonly variables = computed(() => this.state.value.variables);

  private fetchPromise: Promise<Variable[]>|null = null;

  private availableVariablesPromises: AvailableVariablePromises = {};

  fetchVariablesIfNotLoaded(idContainer: string|number, idContainerVersion: string|number) {
    if (!this.fetchPromise) {
      // needed for suggestNameForType() to make sure it is aware of all names
      this.fetchVariables(idContainer, idContainerVersion);
    }
  }

  findVariable(
    idContainer: string,
    idContainerVersion: number,
    idVariable: number,
    ignoreCache: boolean,
  ): Promise<DeepReadonly<Variable>> {
    // before going through an API request we first try to find it in loaded variables
    const found = this.variables.value.find((v) => v.idvariable === idVariable);
    if (found && !ignoreCache) {
      return Promise.resolve(found);
    }

    // otherwise we fetch it via API
    this.privateState.isLoadingSingle = true;
    return AjaxHelper.fetch<Variable>({
      idVariable,
      idContainer,
      idContainerVersion,
      method: 'TagManager.getContainerVariable',
      filter_limit: '-1',
    }).then((record) => {
      this.privateState.variables = [...this.privateState.variables, record];
      return readonly(record);
    }).finally(() => {
      this.privateState.isLoadingSingle = false;
    });
  }

  fetchVariables(
    idContainer: string|number,
    idContainerVersion: string|number,
  ): Promise<VariablesStore['variables']['value']> {
    this.privateState.isLoadingVars = true;
    this.privateState.variables = [];

    if (!this.fetchPromise) {
      this.fetchPromise = AjaxHelper.fetch<Variable[]>({
        method: 'TagManager.getContainerVariables',
        idContainer,
        idContainerVersion,
        filter_limit: '-1',
      });
    }

    return Promise.resolve(this.fetchPromise).then((variables) => {
      this.privateState.variables = variables;
      this.privateState.isLoadingVars = false;
      return this.variables.value;
    }).finally(() => {
      this.privateState.isLoadingVars = false;
    });
  }

  fetchAvailableVariables(idContext: string): VariablesStore['availableVariablesPromises'][''] {
    if (!this.availableVariablesPromises[idContext]) {
      this.availableVariablesPromises[idContext] = AjaxHelper.fetch<VariableCategory[]>({
        method: 'TagManager.getAvailableVariableTypesInContext',
        idContext,
        filter_limit: '-1',
      }).then((variables) => readonly(variables));
    }

    return Promise.resolve(this.availableVariablesPromises[idContext]);
  }

  suggestNameForType(templateId: string): string|undefined {
    for (let counter = 0; counter < 100; counter += 1) {
      let name = templateId;
      if (counter) {
        name = `${name} (${counter})`;
      }

      const isFree = !this.variables.value.some((v) => v.name === name);
      if (isFree) {
        return name;
      }
    }
    return undefined;
  }

  createOrUpdateVariable(
    variable: DeepReadonly<Variable>|Variable,
    method: string,
    idContainer: string,
    idContainerVersion: number,
    parameterValues: Record<string, unknown>,
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
    const lookupTable = variable.lookup_table.filter((l) => l && l.out_value && l.comparison);

    return AjaxHelper.post<{ value: number }>(
      {
        idVariable: variable.idvariable,
        method,
        idContainer,
        idContainerVersion,
        type: variable.type,
        name: variable.name,
        description: variable.description,
        defaultValue: variable.default_value,
      },
      {
        parameters,
        lookupTable,
      },
      { withTokenInUrl: true },
    ).finally(() => { // TODO: test finally() use here in old browser (works in node)
      this.privateState.isUpdating = false;
    });
  }

  reload(
    idContainer: string,
    idContainerVersion: number,
  ): ReturnType<VariablesStore['fetchVariables']> {
    this.privateState.variables = [];
    this.fetchPromise = null;
    this.availableVariablesPromises = {};
    return this.fetchVariables(idContainer, idContainerVersion);
  }

  deleteVariable(
    idContainer: string,
    idContainerVersion: number,
    idVariable: number,
  ): Promise<void> {
    this.privateState.isUpdating = true;
    this.privateState.variables = [];

    return AjaxHelper.fetch(
      {
        idVariable,
        idContainerVersion,
        idContainer,
        method: 'TagManager.deleteContainerVariable',
      },
      { withTokenInUrl: true },
    ).finally(() => {
      this.privateState.isUpdating = false;
    });
  }
}

export default new VariablesStore();
