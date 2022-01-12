<!--
  Matomo - free/libre analytics platform
  @link https://matomo.org
  @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
-->

<template>
  <div class="fieldVariableTemplate">
    <textarea
      :class="`control_${uiControl} materialize-textarea`"
      :type="uiControl"
      :id="name"
      :name="name"
      :value="modelValue"
      @keydown="onKeydown($event)"
      @change="onKeydown($event)"
      placeholder=""
      style="width: calc(100% - 40px);"
      v-bind="uiControlAttributes"
    ></textarea>
    <span
      class="icon-code"
      style="margin-top: 14px;position: absolute;"
      :title="translate('TagManager_ChooseVariable')"
      @click="selectVariable()"></span>
    <label :for="name" v-html="$sanitize(title)"></label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { debounce } from 'CoreHome';

export default defineComponent({
  props: {
    name: String,
    uiControlAttributes: Object,
    modelValue: String,
    title: String,
    uiControl: {
      type: String,
      required: true,
    },
  },
  inheritAttrs: false,
  emits: ['update:modelValue'],
  created() {
    this.onKeydown = debounce(this.onKeydown.bind(this), 50);
  },
  methods: {
    onKeydown(event: Event) {
      this.$emit('update:modelValue', (event.target as HTMLTextAreaElement).value);
    },
    selectVariable() {
      tagManagerHelper.selectVariable((function (ele) { return function (variable) { tagManagerHelper.insertTextSnippetAtElement(ele.previousElementSibling, '{' + '{' + variable.id + '}' + '}'); }  })(this))
    },
  },
  watch: {
    modelValue() {
      setTimeout(() => {
        window.Materialize.textareaAutoResize(this.$refs.textarea);
        window.Materialize.updateTextFields();
      });
    },
  },
  mounted() {
    setTimeout(() => {
      window.Materialize.textareaAutoResize(this.$refs.textarea);
      window.Materialize.updateTextFields();
    });
  },
});

</script>
