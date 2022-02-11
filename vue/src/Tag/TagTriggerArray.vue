<!--
  Matomo - free/libre analytics platform
  @link https://matomo.org
  @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
-->

<template>
  <div class="form-group row" :class="`${type}Triggers`">
    <div class="col s12 m6">
      <div>
        <label :for="`${type}_triggers`">{{ title }}</label>
        <p v-show="containerTriggers.length === 0">
          <br />
          {{ translate('TagManager_NoTriggersFound') }}.
          <a
            class="createNewTrigger"
            @click="$emit('create')"
          >{{ translate('TagManager_CreateNewTriggerNow') }}</a>
        </p>
        <div
          class="multiple valign-wrapper"
          v-for="(idTrigger, index) in modelValue"
          :key="index"
          :class="`${type}Trigger ${type}Trigger${index}`"
          v-show="containerTriggers.length"
        >
          <div class="innerFormField" :name="`${type}_triggers`">
            <Field
              uicontrol="select"
              :name="`${type}_triggers`"
              :model-value="idTrigger"
              @update:model-value="onChangeTrigger($event, index)"
              :full-width="true"
              :options="containerTriggers"
            />
          </div>
          <span
            class="icon-edit valign"
            v-show="idTrigger"
            @click="$emit('edit', idTrigger)"
            :title="translate('General_Edit')"
          />
          <span
            class="icon-minus valign"
            @click="removeTrigger(index)"
            v-show="(index + 1) !== modelValue.length"
            :title="translate('General_Remove')"
          />
        </div>
      </div>
    </div>
    <div class="col s12 m6">
      <div class="form-help">
        <span class="inline-help">
          {{ help }}
          <br /><br />
          <a
            class="createTriggerInHelp"
            @click="$emit('create')"
          >{{ translate('TagManager_CreateNewTriggerNow') }}</a>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Field } from 'CorePluginsAdmin';

export default defineComponent({
  props: {
    type: {
      type: String,
      required: true,
    },
    help: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    containerTriggers: {
      type: Array,
      required: true,
    },
    modelValue: {
      type: Array,
      required: true,
    },
  },
  components: {
    Field,
  },
  emits: ['update:modelValue', 'create', 'edit'],
  methods: {
    onChangeTrigger(idTrigger: string, index: number) {
      const newValue = [...this.modelValue];
      newValue[index] = parseInt(idTrigger, 10);
      this.$emit('update:modelValue', newValue);
    },
    removeTrigger(index: number) {
      const newValue = [...this.modelValue];
      newValue.splice(index, 1);
      this.$emit('update:modelValue', newValue);
    },
  },
});
</script>
