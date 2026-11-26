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
      <div class="fieldCodeEditor__actionList">
        <button
          v-if="canSelectVariable"
          type="button"
          class="fieldCodeEditor__actionButton"
          :title="translate('TagManager_ChooseVariable')"
          :aria-label="translate('TagManager_ChooseVariable')"
          @click="selectVariable('editor')"
        >
          <span
            class="icon-code"
            aria-hidden="true"
          ></span>
        </button>
        <button
          ref="expandButton"
          type="button"
          class="fieldCodeEditor__actionButton"
          :title="translate('TagManager_CodeEditorExpand')"
          :aria-label="translate('TagManager_CodeEditorExpand')"
          @click="expand()"
        >
          <span
            class="icon-fullscreen"
            aria-hidden="true"
          ></span>
        </button>
      </div>
    </div>
    <template v-if="isExpanded">
      <div
        :class="{
          fieldCodeEditor__backdrop: true,
          'fieldCodeEditor__backdrop--closing': isClosing,
        }"
        @click="collapse()"
      ></div>
      <div
        :class="{
          fieldCodeEditor__dialog: true,
          'fieldCodeEditor__dialog--closing': isClosing,
        }"
        role="dialog"
        :aria-labelledby="dialogTitleId"
        @keydown="onDialogKeydown($event)"
      >
        <div class="fieldCodeEditor__header">
          <span
            :id="dialogTitleId"
            class="fieldCodeEditor__title"
            v-html="$sanitize(title || '')"
          ></span>
          <button
            type="button"
            class="fieldCodeEditor__actionButton"
            :title="translate('TagManager_CodeEditorCollapse')"
            :aria-label="translate('TagManager_CodeEditorCollapse')"
            @click="collapse()"
          >
            <span
              class="icon-minimise"
              aria-hidden="true"
            ></span>
          </button>
        </div>
        <div class="fieldCodeEditor__content fieldCodeEditor__content--fill">
          <div class="fieldCodeEditor__editor">
            <CodeEditor
              ref="dialogEditor"
              class="codeEditor--fill"
              :model-value="modelValue"
              :language="language"
              :labelled-by="dialogTitleId"
              :placeholder="uiControlAttributes?.placeholder"
              :ignore-template-variables="canSelectVariable"
              :get-variables="variableLoader"
              @update:model-value="$emit('update:modelValue', $event)"
              @ready="onDialogEditorReady()"
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
              @click="selectVariable('dialogEditor')"
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
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick } from 'vue';
import { MatomoUrl } from 'CoreHome';
import CodeEditor from '../CodeEditor/CodeEditor.vue';
import {
  CodeEditorLanguage,
  CodeEditorVariable,
  CodeEditorViewState,
} from '../CodeEditor/loadCodeEditor';
import { createVariableLoader } from './fetchContainerVariables';
import { ContainerVariableType } from '../types';

interface CodeEditorInstance {
  insertAtCursor(text: string): void;
  focus(): void;
  getViewState(): CodeEditorViewState|null;
  setViewState(viewState: CodeEditorViewState|null): void;
  startEditingElsewhere(): void;
  finishEditingElsewhere(): void;
}

interface FieldCodeEditorState {
  isExpanded: boolean;
  isClosing: boolean;
  closeTimer: number|null;
  viewStateOnExpand: CodeEditorViewState|null;
}

type EditorRef = 'editor'|'dialogEditor';

const CLOSE_ANIMATION_DURATION_MS = 250;

function prefersReducedMotion(): boolean {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
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
  data(): FieldCodeEditorState {
    return {
      isExpanded: false,
      isClosing: false,
      closeTimer: null,
      viewStateOnExpand: null,
    };
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
    dialogTitleId(): string {
      return `${this.name}_dialogTitle`;
    },
  },
  beforeUnmount() {
    if (this.closeTimer !== null) {
      window.clearTimeout(this.closeTimer);
    }
  },
  methods: {
    getEditor(ref: EditorRef): CodeEditorInstance|undefined {
      return this.$refs[ref] as CodeEditorInstance|undefined;
    },
    selectVariable(ref: EditorRef) {
      window.tagManagerHelper.selectVariable((variable: ContainerVariableType) => {
        this.getEditor(ref)?.insertAtCursor(`{{${variable.id}}}`);
      });
    },
    expand() {
      const editor = this.getEditor('editor');
      this.viewStateOnExpand = editor?.getViewState() || null;
      editor?.startEditingElsewhere();
      this.isExpanded = true;
    },
    onDialogEditorReady() {
      const dialogEditor = this.getEditor('dialogEditor');
      dialogEditor?.setViewState(this.viewStateOnExpand);
      dialogEditor?.focus();
    },
    collapse() {
      if (!this.isExpanded || this.isClosing) {
        return;
      }

      this.isClosing = true;
      this.closeTimer = window.setTimeout(
        () => this.finishCollapse(),
        prefersReducedMotion() ? 0 : CLOSE_ANIMATION_DURATION_MS,
      );
    },
    finishCollapse() {
      const viewState = this.getEditor('dialogEditor')?.getViewState() || null;

      this.closeTimer = null;
      this.isClosing = false;
      this.isExpanded = false;
      this.viewStateOnExpand = null;

      nextTick(() => {
        const editor = this.getEditor('editor');
        editor?.finishEditingElsewhere();
        editor?.setViewState(viewState);
        editor?.focus();
      });
    },
    onDialogKeydown(event: KeyboardEvent) {
      if (event.key === 'Escape' && !event.defaultPrevented) {
        event.preventDefault();
        this.collapse();
      }
    },
  },
});
</script>
