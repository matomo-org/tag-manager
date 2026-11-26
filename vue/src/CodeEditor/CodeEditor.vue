<!--
  Matomo - free/libre analytics platform
  @link https://matomo.org
  @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
-->

<template>
  <div class="codeEditor">
    <textarea
      v-if="!isEditorReady"
      ref="fallback"
      class="codeEditor__fallback browser-default"
      :value="modelValue"
      :aria-labelledby="labelledBy"
      :placeholder="placeholder"
      spellcheck="false"
      @input="onFallbackInput($event)"
    ></textarea>
    <div
      ref="container"
      class="codeEditor__editor"
    ></div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  markRaw,
  nextTick,
  PropType,
} from 'vue';
import { translate } from 'CoreHome';
import {
  CodeEditorHandle,
  CodeEditorLanguage,
  CodeEditorVariable,
  loadCodeEditor,
} from './loadCodeEditor';

export interface CodeEditorState {
  isEditorReady: boolean;
  isUnmounted: boolean;
  editor: CodeEditorHandle|null;
}

export default defineComponent({
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    language: {
      type: String as PropType<CodeEditorLanguage>,
      required: true,
    },
    labelledBy: String,
    placeholder: String,
    ignoreTemplateVariables: Boolean,
    getVariables: Function as PropType<() => Promise<CodeEditorVariable[]>>,
  },
  emits: ['update:modelValue'],
  data(): CodeEditorState {
    return {
      isEditorReady: false,
      isUnmounted: false,
      editor: null,
    };
  },
  mounted() {
    loadCodeEditor().then((factory) => {
      if (this.isUnmounted) {
        return;
      }

      const editor = factory.create(this.$refs.container as HTMLElement, {
        value: this.modelValue || '',
        language: this.language,
        ignoreTemplateVariables: this.ignoreTemplateVariables,
        syntaxErrorMessage: translate('TagManager_CodeEditorPossibleSyntaxError'),
        placeholder: this.placeholder || '',
        contentAttributes: this.labelledBy ? { 'aria-labelledby': this.labelledBy } : {},
        onChange: (value: string) => {
          this.$emit('update:modelValue', value);
        },
        getVariables: this.getVariables,
      });

      this.editor = markRaw(editor);
      this.isEditorReady = true;
    }).catch(() => {
      // the plain textarea stays in place and keeps working
    });
  },
  beforeUnmount() {
    this.isUnmounted = true;
    if (this.editor) {
      this.editor.destroy();
      this.editor = null;
    }
  },
  watch: {
    modelValue(newValue: string) {
      if (this.editor) {
        this.editor.setValue(newValue || '');
      }
    },
  },
  methods: {
    onFallbackInput(event: Event) {
      this.$emit('update:modelValue', (event.target as HTMLTextAreaElement).value);
    },
    insertAtCursor(text: string) {
      if (this.editor) {
        this.editor.insertAtCursor(text);
        return;
      }

      const fallback = this.$refs.fallback as HTMLTextAreaElement|undefined;
      if (!fallback) {
        return;
      }

      const { selectionStart, selectionEnd, value } = fallback;
      const cursorPosition = selectionStart + text.length;
      this.$emit('update:modelValue', value.substring(0, selectionStart) + text + value.substring(selectionEnd));

      nextTick(() => {
        fallback.focus();
        fallback.setSelectionRange(cursorPosition, cursorPosition);
      });
    },
  },
});
</script>
