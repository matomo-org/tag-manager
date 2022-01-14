/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */
import { IScope } from 'angular';

export interface Variable {
  id: string|number;
  name: string;
  description: string;
  is_pre_configured?: boolean;
  category: string;
  idvariable: string;
  order: string;
  type: string;
}

export interface VariableCategory {
  name: string;
  types: Variable[];
}

export interface Draft {
  idcontainerversion: string|number;
}

export interface Container {
  draft: Draft;
  // TODO
}

// temporary, will be converted later
interface TagManagerHelper {
  editVariable(
    $scope: IScope|null,
    idContainer: string|number,
    idContainerVersion: string|number,
    idVariable: string|number,
    callback: (variable: Variable) => void,
    variableType?: string,
  ): void;
  selectVariable(callback: (variable: Variable) => void): void;
  insertTextSnippetAtElement(inputField: HTMLTextAreaElement, textToAdd: string): void;
}

declare global {
  interface Window {
    tagManagerHelper: TagManagerHelper;
  }
}
