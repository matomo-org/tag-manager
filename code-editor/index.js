/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

import { Annotation, EditorState, Transaction } from '@codemirror/state';
import {
  EditorView,
  drawSelection,
  highlightActiveLineGutter,
  highlightSpecialChars,
  keymap,
  lineNumbers,
  placeholder,
} from '@codemirror/view';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import {
  HighlightStyle,
  bracketMatching,
  ensureSyntaxTree,
  indentOnInput,
  syntaxHighlighting,
  syntaxTree,
} from '@codemirror/language';
import { tags } from '@lezer/highlight';
import { highlightSelectionMatches, search, searchKeymap } from '@codemirror/search';
import { linter, lintGutter, lintKeymap } from '@codemirror/lint';
import { autocompletion, startCompletion } from '@codemirror/autocomplete';
import { html } from '@codemirror/lang-html';
import { javascript } from '@codemirror/lang-javascript';

const PARSE_TIMEOUT_MS = 500;
const MAX_DIAGNOSTICS = 100;
const TEMPLATE_VARIABLE_PATTERN = /\{\{[^{}\n]*\}\}/g;
const OPEN_TEMPLATE_VARIABLE_PATTERN = /\{\{[^{}\n]*/;
const TEMPLATE_VARIABLE_NAME_PATTERN = /^[^{}\n]*$/;

const externalChange = Annotation.define();

const highlightStyle = HighlightStyle.define([
  {
    tag: [tags.keyword, tags.operatorKeyword, tags.self, tags.null, tags.bool, tags.atom],
    class: 'codeEditor__tokenKeyword',
  },
  { tag: [tags.string, tags.special(tags.string), tags.regexp], class: 'codeEditor__tokenString' },
  { tag: [tags.number, tags.tagName], class: 'codeEditor__tokenTag' },
  { tag: [tags.attributeName, tags.propertyName], class: 'codeEditor__tokenAttribute' },
  { tag: [tags.comment, tags.meta, tags.documentMeta], class: 'codeEditor__tokenComment' },
  { tag: tags.variableName, class: 'codeEditor__tokenVariable' },
  { tag: [tags.punctuation, tags.bracket, tags.angleBracket, tags.operator], class: 'codeEditor__tokenPunctuation' },
  { tag: tags.invalid, class: 'codeEditor__tokenInvalid' },
]);

function getLanguageSupport(language) {
  return language === 'html' ? html() : javascript();
}

function getTemplateVariableRanges(text) {
  const ranges = [];
  let match = TEMPLATE_VARIABLE_PATTERN.exec(text);
  while (match) {
    ranges.push([match.index, match.index + match[0].length]);
    match = TEMPLATE_VARIABLE_PATTERN.exec(text);
  }
  TEMPLATE_VARIABLE_PATTERN.lastIndex = 0;
  return ranges;
}

function isInRanges(position, ranges) {
  return ranges.some(([from, to]) => position >= from && position <= to);
}

function findSyntaxErrors(state, ignoreTemplateVariables) {
  const tree = ensureSyntaxTree(state, state.doc.length, PARSE_TIMEOUT_MS) || syntaxTree(state);
  const variableRanges = ignoreTemplateVariables ? getTemplateVariableRanges(state.doc.toString()) : [];
  const errors = [];

  tree.iterate({
    enter(node) {
      if (errors.length >= MAX_DIAGNOSTICS) {
        return false;
      }
      const previous = errors[errors.length - 1];
      if (
        node.type.isError
        && !isInRanges(node.from, variableRanges)
        && !(previous && previous.from === node.from && previous.to === node.to)
      ) {
        errors.push({ from: node.from, to: node.to });
      }
      return true;
    },
  });

  return errors;
}

function createSyntaxErrorLinter(message, ignoreTemplateVariables) {
  return linter((view) => findSyntaxErrors(view.state, ignoreTemplateVariables).map((error) => ({
    from: error.from,
    to: error.to,
    severity: 'warning',
    message,
  })));
}

const COMPLETION_INFO_MIN_SPACE = 280;

function getCompletionListInset(view, list) {
  const listElement = view.dom.querySelector('.cm-tooltip-autocomplete ul');
  if (!listElement) {
    return 0;
  }
  const paddingTop = parseFloat(window.getComputedStyle(listElement).paddingTop) || 0;
  return listElement.getBoundingClientRect().top - list.top + paddingTop;
}

function positionCompletionInfo(view, list, option, info, space) {
  const spaceRight = space.right - list.right;
  const spaceLeft = list.left - space.left;
  const side = spaceRight >= COMPLETION_INFO_MIN_SPACE || spaceRight >= spaceLeft ? 'right' : 'left';

  const optionOffset = option.top - list.top - getCompletionListInset(view, list);
  const maxOffset = space.bottom - list.top - info.height;
  const top = Math.max(0, Math.min(optionOffset, maxOffset));

  return { style: `top: ${Math.round(top)}px;`, class: `cm-completionInfo-${side}` };
}

function createVariableCompletionSource(getVariables) {
  return (context) => {
    const match = context.matchBefore(OPEN_TEMPLATE_VARIABLE_PATTERN);
    if (!match) {
      return null;
    }

    return getVariables().then(
      (variables) => createVariableCompletions(context, match, variables),
      () => null,
    );
  };
}

function createVariableCompletions(context, match, variables) {
  if (context.aborted || !variables || !variables.length) {
    return null;
  }

  const hasClosingBraces = context.state.sliceDoc(context.pos, context.pos + 2) === '}}';

  return {
    from: match.from + 2,
    validFor: TEMPLATE_VARIABLE_NAME_PATTERN,
    options: variables.map((variable) => ({
      label: variable.id,
      detail: variable.category || undefined,
      info: variable.description || undefined,
      type: 'variable',
      apply: hasClosingBraces ? variable.id : `${variable.id}}}`,
    })),
  };
}

const startCompletionAfterOpeningBraces = EditorView.updateListener.of((update) => {
  if (!update.docChanged || !update.transactions.some((transaction) => transaction.isUserEvent('input.type'))) {
    return;
  }
  const { head } = update.state.selection.main;
  if (update.state.sliceDoc(head - 2, head) === '{{') {
    queueMicrotask(() => startCompletion(update.view));
  }
});

function create(parent, options) {
  const extensions = [
    lineNumbers(),
    highlightActiveLineGutter(),
    highlightSpecialChars(),
    history(),
    drawSelection(),
    indentOnInput(),
    syntaxHighlighting(highlightStyle),
    bracketMatching(),
    highlightSelectionMatches(),
    search({ top: true }),
    keymap.of([
      ...defaultKeymap,
      ...searchKeymap,
      ...historyKeymap,
      ...lintKeymap,
    ]),
    getLanguageSupport(options.language),
    lintGutter(),
    createSyntaxErrorLinter(options.syntaxErrorMessage || '', !!options.ignoreTemplateVariables),
    placeholder(options.placeholder || ''),
    EditorView.contentAttributes.of(options.contentAttributes || {}),
    options.getVariables
      ? [
        autocompletion({
          override: [createVariableCompletionSource(options.getVariables)],
          activateOnTyping: false,
          icons: false,
          positionInfo: positionCompletionInfo,
        }),
        startCompletionAfterOpeningBraces,
      ]
      : [],
    EditorView.updateListener.of((update) => {
      if (!update.docChanged || !options.onChange) {
        return;
      }
      if (update.transactions.some((transaction) => transaction.annotation(externalChange))) {
        return;
      }
      options.onChange(update.state.doc.toString());
    }),
  ];

  const view = new EditorView({
    parent,
    state: EditorState.create({
      doc: options.value || '',
      extensions,
    }),
  });

  return {
    getValue() {
      return view.state.doc.toString();
    },
    setValue(value, setOptions) {
      const newValue = value || '';
      if (newValue === view.state.doc.toString()) {
        return;
      }
      const addToHistory = !setOptions || setOptions.addToHistory !== false;
      view.dispatch({
        changes: { from: 0, to: view.state.doc.length, insert: newValue },
        annotations: [externalChange.of(true), Transaction.addToHistory.of(addToHistory)],
      });
    },
    getViewState() {
      const { anchor, head } = view.state.selection.main;
      return { anchor, head, scroll: view.scrollSnapshot() };
    },
    setViewState(viewState) {
      const length = view.state.doc.length;
      view.dispatch({
        selection: {
          anchor: Math.min(viewState.anchor, length),
          head: Math.min(viewState.head, length),
        },
        effects: viewState.scroll,
        annotations: externalChange.of(true),
      });
    },
    insertAtCursor(text) {
      view.dispatch(view.state.replaceSelection(text));
      view.focus();
    },
    focus() {
      view.focus();
    },
    destroy() {
      view.destroy();
    },
  };
}

window.TagManagerCodeEditor = {
  create,
  findSyntaxErrors(text, language, ignoreTemplateVariables) {
    const state = EditorState.create({ doc: text, extensions: [getLanguageSupport(language)] });
    return findSyntaxErrors(state, !!ignoreTemplateVariables);
  },
};
