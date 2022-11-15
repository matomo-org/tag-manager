<!--
  Matomo - free/libre analytics platform
  @link https://matomo.org
  @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
-->

<template>
  <div class="tagManagerManageSelect tagManagerVariableSelectType">
    <div>
      <Field
        uicontrol="select"
        :name="`variableType${variableType}`"
        class="selectVariableType"
        :model-value="modelValue"
        @update:model-value="onChange($event)"
        :full-width="true"
        :options="containerVariables"
      />
    </div>
    <a
      class="createNewVariable"
      v-show="!isLoading"
      @click.prevent="createVariable()"
    >
      <span class="icon-add" /> {{ translate('TagManager_CreateNewVariable') }}
    </a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { AjaxHelper, MatomoUrl } from 'CoreHome';
import { Field } from 'CorePluginsAdmin';
import { Container, ContainerVariableCategory } from '../types';

interface Option {
  key: string;
  value: string;
}

interface VariableSelectTypeState {
  containerVariables: Option[];
  isLoading: boolean;
  idContainerVersion: number|null;
}

const { tagManagerHelper } = window;

export default defineComponent({
  props: {
    variableTypeName: {
      type: String,
      required: true,
    },
    modelValue: String,
    variableType: String,
  },
  components: {
    Field,
  },
  emits: ['update:modelValue'],
  data(): VariableSelectTypeState {
    return {
      containerVariables: [],
      isLoading: false,
      idContainerVersion: null,
    };
  },
  created() {
    this.fetchAvailableVariables();
  },
  methods: {
    fetchAvailableVariables() {
      this.containerVariables = [];
      this.fetchContainer().then((container) => {
        this.isLoading = true;
        this.idContainerVersion = container.draft.idcontainerversion;
        return AjaxHelper.fetch<ContainerVariableCategory[]>({
          method: 'TagManager.getAvailableContainerVariables',
          filter_limit: '-1',
          idContainer: MatomoUrl.parsed.value.idContainer as string,
          idContainerVersion: this.idContainerVersion,
        }).then((variables) => {
          this.containerVariables = [];
          this.isLoading = false;

          variables.forEach((category) => {
            const options = category.types
              .filter((t) => t.type === this.variableType)
              .map((t) => ({ key: `{{${t.id}}}`, value: t.name }));

            this.containerVariables.push(...options);
          });

          if (!this.modelValue && this.containerVariables.length === 1) {
            // when no value configured and only one selection is available, we preselect that value
            this.onChange(this.containerVariables[0].key);
          }
        }).catch(() => {
          this.isLoading = false;
        });
      });
    },
    onChange(newValue: string|null) {
      this.$emit('update:modelValue', newValue);
    },
    createVariable() {
      if (!this.idContainerVersion) {
        return;
      }

      tagManagerHelper.editVariable(
        null,
        MatomoUrl.parsed.value.idContainer as string,
        this.idContainerVersion,
        0,
        (variable) => {
          this.fetchAvailableVariables();
          if (variable) {
            this.onChange(`{{${variable.name}}}`);
          }
        },
        this.variableType,
      );
    },
    fetchContainer() {
      this.isLoading = true;
      return AjaxHelper.fetch<Container>({
        method: 'TagManager.getContainer',
        filter_limit: '-1',
        idContainer: MatomoUrl.parsed.value.idContainer as string,
      });
    },
  },
});
</script>
