/*!
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

import type { CodeEditorFactory } from './loadCodeEditor';

const findEditorScripts = () => Array.from(document.head.querySelectorAll('script'))
  .filter((script) => script.src.includes('code-editor.min.js'));

describe('TagManager/CodeEditor/loadCodeEditor', () => {
  let loadCodeEditor: () => Promise<CodeEditorFactory>;

  beforeEach(async () => {
    vi.resetModules();
    findEditorScripts().forEach((script) => script.remove());
    delete window.TagManagerCodeEditor;
    window.piwik.cacheBuster = 'abc';
    ({ loadCodeEditor } = await import('./loadCodeEditor'));
  });

  it('adds the script one time and resolves with the registered factory', async () => {
    const factory = { create: vi.fn() } as unknown as CodeEditorFactory;

    const first = loadCodeEditor();
    const second = loadCodeEditor();
    const scripts = findEditorScripts();

    expect(scripts).toHaveLength(1);
    expect(scripts[0].getAttribute('src'))
      .toBe('plugins/TagManager/vue/lib/code-editor/code-editor.min.js?cb=abc');

    window.TagManagerCodeEditor = factory;
    scripts[0].dispatchEvent(new Event('load'));

    await expect(first).resolves.toBe(factory);
    await expect(second).resolves.toBe(factory);
  });

  it('does not add a script when the factory is already registered', async () => {
    const factory = { create: vi.fn() } as unknown as CodeEditorFactory;
    window.TagManagerCodeEditor = factory;

    await expect(loadCodeEditor()).resolves.toBe(factory);
    expect(findEditorScripts()).toHaveLength(0);
  });

  it('rejects when the script fails and adds a new script on the next call', async () => {
    const first = loadCodeEditor();
    findEditorScripts()[0].dispatchEvent(new Event('error'));

    await expect(first).rejects.toThrow();
    expect(findEditorScripts()).toHaveLength(0);

    loadCodeEditor().catch(() => undefined);
    expect(findEditorScripts()).toHaveLength(1);
  });

  it('rejects when the script loads but does not register the factory', async () => {
    const promise = loadCodeEditor();
    findEditorScripts()[0].dispatchEvent(new Event('load'));

    await expect(promise).rejects.toThrow();
  });
});
