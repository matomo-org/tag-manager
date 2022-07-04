<!--
  Matomo - free/libre analytics platform
  @link https://matomo.org
  @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
-->

<template>
  <div class="tagManagerManageSelect tagManagerVariableSelect">
    <ActivityIndicator :loading="isLoading" />
    <div class="tableActionBar">
      <a
        class="createNewVariable"
        v-show="!isLoading"
        @click="createVariable()"
      >
        <span class="icon-add" />
        {{ translate('TagManager_CreateNewVariable') }}
      </a>
    </div>
    <ul class="collection with-header">
      <li class="collection-header">
        <h4>{{ translate('TagManager_CustomVariables') }}</h4>
      </li>
      <li
        class="collection-item"
        @click="selectVariable(variable)"
        v-for="(variable, index) in containerVariables"
        :key="index"
      >
        <span class="title">
          {{ variable.name }} ({{ translate('TagManager_Type') }}: {{ variable.type }})
        </span>
        <span class="secondary-content">
          <i
            class="icon-edit"
            @click.stop="editVariable(variable)"
            :title="translate('General_Edit')"
          />
        </span>
      </li>
    </ul>
    <h2>{{ translate('TagManager_PreconfiguredVariables') }}</h2>
    <ul
      class="collection with-header"
      v-for="variableCategory in preconfiguredVariables"
      :key="variableCategory.name"
    >
      <li class="collection-header">
        <h4>{{ variableCategory.name }}</h4>
      </li>
      <li
        class="collection-item"
        v-for="(variableTemplate, index) in variableCategory.types"
        :key="index"
        v-show="variableTemplate.is_pre_configured"
        @click="selectVariable(variableTemplate)"
      >
        <span class="title">{{ variableTemplate.name }}</span>
        <span
          class="secondary-content"
          v-show="!!variableTemplate.description"
        >
          <i
            class="icon-help"
            :title="variableTemplate.description"
          />
        </span>
      </li>
    </ul>
    <div class="tableActionBar">
      <a
        class="createNewVariable"
        v-show="!isLoading"
        @click="createVariable()"
      >
        <span class="icon-add" />
        {{ translate('TagManager_CreateNewVariable', translate('TagManager_Variable')) }}
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  AjaxHelper,
  ActivityIndicator,
} from 'CoreHome';
import {
  Container,
  ContainerVariableCategory,
  ContainerVariableType,
} from '../types';

interface VariableSelectState {
  preconfiguredVariables: ContainerVariableCategory[];
  containerVariables: ContainerVariableType[];
  isLoading: boolean;
  actualIdContainerVersion?: number;
}

type GetAvailableContainerVariablesResponse = ContainerVariableCategory[];

const { tagManagerHelper } = window;

export default defineComponent({
  props: {
    idContainer: {
      type: String,
      required: true,
    },
    idContainerVersion: Number,
  },
  components: {
    ActivityIndicator,
  },
  data(): VariableSelectState {
    return {
      preconfiguredVariables: [],
      containerVariables: [],
      isLoading: false,
      actualIdContainerVersion: this.idContainerVersion,
    };
  },
  emits: ['selectVariable'],
  created() {
    this.fetchAvailableVariables();
  },
  watch: {
    idContainerVersion(newValue) {
      this.actualIdContainerVersion = newValue;
    },
  },
  methods: {
    fetchAvailableVariables() {
      this.preconfiguredVariables = [];
      this.containerVariables = [];

      this.fetchContainer().then((container) => {
        this.isLoading = true;
        this.actualIdContainerVersion = container.draft.idcontainerversion;

        return AjaxHelper.fetch<GetAvailableContainerVariablesResponse>({
          method: 'TagManager.getAvailableContainerVariables',
          filter_limit: '-1',
          idContainer: this.idContainer,
          idContainerVersion: this.actualIdContainerVersion,
        }).then((variables) => {
          this.preconfiguredVariables = [];
          this.containerVariables = [];
          this.isLoading = false;

          variables.forEach((category) => {
            const preConfig: ContainerVariableCategory = {
              ...category,
              types: category.types.filter((c) => c.is_pre_configured),
            };

            this.containerVariables.push(...category.types.filter((c) => !c.is_pre_configured));

            if (preConfig.types.length) {
              this.preconfiguredVariables.push(preConfig);
            }
          });
        }).catch(() => {
          this.isLoading = false;
        });
      });
    },
    editVariable(variable: ContainerVariableType) {
      if (!this.actualIdContainerVersion) {
        return;
      }

      tagManagerHelper.editVariable(
        null,
        this.idContainer,
        this.actualIdContainerVersion,
        variable.idvariable,
        () => {
          this.fetchAvailableVariables();
        },
      );
    },
    createVariable() {
      if (!this.actualIdContainerVersion) {
        return;
      }

      tagManagerHelper.editVariable(
        null,
        this.idContainer,
        this.actualIdContainerVersion,
        0,
        () => {
          this.fetchAvailableVariables();
        },
      );
    },
    selectVariable(variable: ContainerVariableType) {
      this.$emit('selectVariable', { variable });
    },
    fetchContainer() {
      this.isLoading = true;
      return AjaxHelper.fetch<Container>({
        method: 'TagManager.getContainer',
        filter_limit: '-1',
        idContainer: this.idContainer,
      });
    },
  },
});
</script>
