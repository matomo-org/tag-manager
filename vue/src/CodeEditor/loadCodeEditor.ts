/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

export type CodeEditorLanguage = 'html' | 'javascript';

export interface CodeEditorVariable {
  id: string;
  category?: string;
  description?: string;
}

export interface CodeEditorOptions {
  value: string;
  language: CodeEditorLanguage;
  ignoreTemplateVariables: boolean;
  syntaxErrorMessage: string;
  placeholder: string;
  contentAttributes: Record<string, string>;
  onChange: (value: string) => void;
  getVariables?: () => Promise<CodeEditorVariable[]>;
}

export interface CodeEditorViewState {
  anchor: number;
  head: number;
  scroll: unknown;
}

export interface CodeEditorHandle {
  getValue(): string;
  setValue(value: string, options?: { addToHistory?: boolean }): void;
  getViewState(): CodeEditorViewState;
  setViewState(viewState: CodeEditorViewState): void;
  insertAtCursor(text: string): void;
  focus(): void;
  destroy(): void;
}

export interface CodeEditorFactory {
  create(parent: HTMLElement, options: CodeEditorOptions): CodeEditorHandle;
}

declare global {
  interface Window {
    TagManagerCodeEditor?: CodeEditorFactory;
  }
}

const SCRIPT_PATH = 'plugins/TagManager/vue/lib/code-editor/code-editor.min.js';

let loadingPromise: Promise<CodeEditorFactory>|null = null;

export function loadCodeEditor(): Promise<CodeEditorFactory> {
  if (window.TagManagerCodeEditor) {
    return Promise.resolve(window.TagManagerCodeEditor);
  }

  if (!loadingPromise) {
    loadingPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `${SCRIPT_PATH}?cb=${encodeURIComponent(window.piwik.cacheBuster)}`;
      script.async = true;
      script.onload = () => {
        if (window.TagManagerCodeEditor) {
          resolve(window.TagManagerCodeEditor);
        } else {
          loadingPromise = null;
          reject(new Error('The code editor script did not register itself.'));
        }
      };
      script.onerror = () => {
        loadingPromise = null;
        script.remove();
        reject(new Error('The code editor script could not be loaded.'));
      };
      document.head.appendChild(script);
    });
  }

  return loadingPromise;
}
