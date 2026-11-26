/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

import { AjaxHelper } from 'CoreHome';
import { Container, ContainerVariableCategory } from '../types';
import { CodeEditorVariable } from '../CodeEditor/loadCodeEditor';

const AJAX_OPTIONS = { createErrorNotification: false };

export function fetchContainerVariables(idContainer: string): Promise<CodeEditorVariable[]> {
  return AjaxHelper.fetch<Container>({
    method: 'TagManager.getContainer',
    idContainer,
  }, AJAX_OPTIONS).then((container) => AjaxHelper.fetch<ContainerVariableCategory[]>({
    method: 'TagManager.getAvailableContainerVariables',
    filter_limit: '-1',
    idContainer,
    idContainerVersion: container.draft.idcontainerversion,
  }, AJAX_OPTIONS)).then((categories) => categories.flatMap(
    (category) => category.types.map((variable) => ({
      id: variable.id,
      category: variable.category,
      description: variable.description,
    })),
  ));
}

export function createVariableLoader(idContainer: string): () => Promise<CodeEditorVariable[]> {
  let variablesPromise: Promise<CodeEditorVariable[]>|null = null;

  return () => {
    if (!variablesPromise) {
      variablesPromise = fetchContainerVariables(idContainer).catch((error) => {
        variablesPromise = null;
        throw error;
      });
    }

    return variablesPromise;
  };
}
