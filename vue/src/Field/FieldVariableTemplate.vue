<!--
  Matomo - free/libre analytics platform
  @link https://matomo.org
  @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
-->

<template>
  <div class="fieldVariableTemplate">
    <input
      :class="`control_${ uiControl }`"
      :type="uiControl"
      :id="name"
      :name="name"
      :value="modelValueText"
      @keydown="onKeydown($event)"
      @change="onKeydown($event)"
      placeholder=""
      style="width: calc(100% - 40px);"
      v-bind="uiControlAttributes"
      ref="input"
    />
    <span
      class="icon-code"
      :title="translate('TagManager_ChooseVariable')"
      @click="selectVariable()"
    ></span>
    <br/>
    <label :for="name" v-html="$sanitize(title)"></label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { debounce } from 'CoreHome';
import { ContainerVariableType } from '../types';

const { tagManagerHelper } = window;

export default defineComponent({
  props: {
    uiControl: {
      type: String,
      required: true,
    },
    uiControlAttributes: Object,
    name: String,
    title: String,
    modelValue: null,
  },
  inheritAttrs: false,
  emits: ['update:modelValue'],
  computed: {
    modelValueText() {
      if (typeof this.modelValue === 'undefined' || this.modelValue === null) {
        return '';
      }

      return this.modelValue.toString();
    },
  },
  created() {
    // debounce because puppeteer types reeaally fast
    this.onKeydown = debounce(this.onKeydown.bind(this), 50);
  },
  mounted() {
    setTimeout(() => {
      window.Materialize.updateTextFields();
    });
  },
  watch: {
    modelValue() {
      setTimeout(() => {
        window.Materialize.updateTextFields();
      });
    },
  },
  methods: {
    onKeydown(event: Event) {
      this.$emit('update:modelValue', (event.target as HTMLInputElement).value);
    },
    selectVariable() {
      tagManagerHelper.selectVariable((variable: ContainerVariableType) => {
        tagManagerHelper.insertTextSnippetAtElement(
          this.$refs.input! as HTMLInputElement,
          `{{${variable.id}}}`,
        );
      });
    },
  },
});
</script>
