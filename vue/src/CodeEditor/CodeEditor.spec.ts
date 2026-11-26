/*!
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

import { flushPromises, mount } from '@vue/test-utils';
import type { CodeEditorHandle, CodeEditorOptions } from './loadCodeEditor';

const { loadCodeEditorMock } = vi.hoisted(() => ({ loadCodeEditorMock: vi.fn() }));

vi.mock('CoreHome', () => ({
  translate: (key: string) => key,
}));

vi.mock('./loadCodeEditor', () => ({
  loadCodeEditor: loadCodeEditorMock,
}));

import CodeEditor from './CodeEditor.vue';

function createHandle(): CodeEditorHandle {
  return {
    getValue: vi.fn(),
    setValue: vi.fn(),
    insertAtCursor: vi.fn(),
    focus: vi.fn(),
    destroy: vi.fn(),
  };
}

describe('TagManager/CodeEditor/CodeEditor', () => {
  beforeEach(() => {
    loadCodeEditorMock.mockReset();
  });

  it('creates the editor with the current value and options', async () => {
    const handle = createHandle();
    const create = vi.fn(() => handle);
    loadCodeEditorMock.mockResolvedValue({ create });

    const wrapper = mount(CodeEditor as any, {
      props: {
        modelValue: '<div></div>',
        language: 'html',
        labelledBy: 'customHtml_label',
        placeholder: 'Enter code',
        ignoreTemplateVariables: true,
      },
    });
    await flushPromises();

    expect(create).toHaveBeenCalledTimes(1);
    const options = (create.mock.calls[0] as unknown[])[1] as CodeEditorOptions;
    expect(options).toMatchObject({
      value: '<div></div>',
      language: 'html',
      ignoreTemplateVariables: true,
      placeholder: 'Enter code',
      syntaxErrorMessage: 'TagManager_CodeEditorPossibleSyntaxError',
      contentAttributes: { 'aria-labelledby': 'customHtml_label' },
    });
    expect(wrapper.find('textarea').exists()).toBe(false);
  });

  it('emits changes from the editor and sends new values to the editor', async () => {
    const handle = createHandle();
    const create = vi.fn(() => handle);
    loadCodeEditorMock.mockResolvedValue({ create });

    const wrapper = mount(CodeEditor as any, {
      props: { modelValue: 'a', language: 'javascript' },
    });
    await flushPromises();

    const options = (create.mock.calls[0] as unknown[])[1] as CodeEditorOptions;
    options.onChange('ab');
    expect(wrapper.emitted('update:modelValue')).toEqual([['ab']]);

    await wrapper.setProps({ modelValue: 'abc' });
    expect(handle.setValue).toHaveBeenCalledWith('abc');

    (wrapper.vm as any).insertAtCursor('{{PageUrl}}');
    expect(handle.insertAtCursor).toHaveBeenCalledWith('{{PageUrl}}');

    wrapper.unmount();
    expect(handle.destroy).toHaveBeenCalledTimes(1);
  });

  it('keeps a working textarea when the editor cannot load', async () => {
    loadCodeEditorMock.mockRejectedValue(new Error('failed'));

    const wrapper = mount(CodeEditor as any, {
      props: { modelValue: 'abc', language: 'javascript' },
    });
    await flushPromises();

    const textarea = wrapper.find('textarea');
    expect(textarea.exists()).toBe(true);
    expect((textarea.element as HTMLTextAreaElement).value).toBe('abc');

    await textarea.setValue('abcd');
    expect(wrapper.emitted('update:modelValue')).toEqual([['abcd']]);
  });

  it('inserts text at the cursor of the textarea when the editor is not ready', async () => {
    loadCodeEditorMock.mockRejectedValue(new Error('failed'));

    const wrapper = mount(CodeEditor as any, {
      props: { modelValue: 'ab', language: 'html' },
    });
    await flushPromises();

    const textarea = wrapper.find('textarea').element as HTMLTextAreaElement;
    textarea.setSelectionRange(1, 1);
    (wrapper.vm as any).insertAtCursor('X');

    expect(wrapper.emitted('update:modelValue')).toEqual([['aXb']]);
  });

  it('does not create the editor when it was unmounted during the load', async () => {
    const create = vi.fn(() => createHandle());
    let resolveLoad: (value: unknown) => void = () => undefined;
    loadCodeEditorMock.mockReturnValue(new Promise((resolve) => {
      resolveLoad = resolve;
    }));

    const wrapper = mount(CodeEditor as any, {
      props: { modelValue: '', language: 'html' },
    });
    wrapper.unmount();
    resolveLoad({ create });
    await flushPromises();

    expect(create).not.toHaveBeenCalled();
  });
});
