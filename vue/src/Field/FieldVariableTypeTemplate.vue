<!--
  Matomo - free/libre analytics platform
  @link https://matomo.org
  @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
-->

<template>
  <div>
    <VariableSelectType
      :model-value="modelValue"
      :id="name"
      :name="name"
      :variable-type-name="title"
      :variable-type="uiControlAttributes.variableType"
      @update:model-value="$emit('update:modelValue', $event)"
    />

    <label :for="name" style="font-size: 0.8rem;" v-html="$sanitize(title)"></label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import VariableSelectType from '../VariableSelectType/VariableSelectType.vue';

export default defineComponent({
  props: {
    uiControlAttributes: {
      type: Object,
      required: true,
    },
    name: String,
    title: String,
    modelValue: String,
  },
  components: {
    VariableSelectType,
  },
  emits: ['update:modelValue'],
});

</script>
