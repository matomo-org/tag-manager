<!--
  Matomo - free/libre analytics platform
  @link https://matomo.org
  @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
-->

<template>
  <div
    :id="name"
    class="fieldCodeEditor"
  >
    <label
      :id="labelId"
      class="fieldCodeEditor__label"
      v-html="$sanitize(title || '')"
    ></label>
    <div class="fieldCodeEditor__content">
      <div class="fieldCodeEditor__editor">
        <CodeEditor
          ref="editor"
          :model-value="modelValue"
          :language="language"
          :labelled-by="labelId"
          :placeholder="uiControlAttributes?.placeholder"
          :ignore-template-variables="canSelectVariable"
          :get-variables="variableLoader"
          @update:model-value="$emit('update:modelValue', $event)"
        />
      </div>
      <div
        v-if="canSelectVariable"
        class="fieldCodeEditor__actionList"
      >
        <button
          type="button"
          class="fieldCodeEditor__actionButton"
          :title="translate('TagManager_ChooseVariable')"
          :aria-label="translate('TagManager_ChooseVariable')"
          @click="selectVariable()"
        >
          <span
            class="icon-code"
            aria-hidden="true"
          ></span>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { MatomoUrl } from 'CoreHome';
import CodeEditor from '../CodeEditor/CodeEditor.vue';
import { CodeEditorLanguage, CodeEditorVariable } from '../CodeEditor/loadCodeEditor';
import { createVariableLoader } from './fetchContainerVariables';
import { ContainerVariableType } from '../types';

interface CodeEditorInstance {
  insertAtCursor(text: string): void;
}

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true,
    },
    title: String,
    modelValue: String,
    uiControlAttributes: Object,
  },
  inheritAttrs: false,
  emits: ['update:modelValue'],
  components: {
    CodeEditor,
  },
  computed: {
    language(): CodeEditorLanguage {
      return this.uiControlAttributes?.language === 'html' ? 'html' : 'javascript';
    },
    canSelectVariable(): boolean {
      return !!this.uiControlAttributes?.parseVariables;
    },
    variableLoader(): (() => Promise<CodeEditorVariable[]>)|undefined {
      const idContainer = MatomoUrl.parsed.value.idContainer as string|undefined;
      if (!this.canSelectVariable || !idContainer) {
        return undefined;
      }
      return createVariableLoader(idContainer);
    },
    labelId(): string {
      return `${this.name}_label`;
    },
  },
  methods: {
    selectVariable() {
      window.tagManagerHelper.selectVariable((variable: ContainerVariableType) => {
        (this.$refs.editor as CodeEditorInstance).insertAtCursor(`{{${variable.id}}}`);
      });
    },
  },
});
</script>
