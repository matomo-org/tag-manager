/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */
import { IScope } from 'angular';

export interface LookupTableEntry {
  match_value: string;
  comparison: string;
  out_value: string;
}

export type LookupTable = LookupTableEntry[];

export interface Variable {
  // TODO: check api response
  id: string|number;
  name: string;
  description: string;
  is_pre_configured?: boolean;
  category: string;
  idvariable: number;
  order: string;
  type: string;
  hasAdvancedSettings?: boolean;
  lookup_table: LookupTable;
  isCustomTemplate?: boolean;
  default_value: unknown;
}

export interface VariableCategory {
  name: string;
  types: Variable[];
}

export interface Draft {
  idcontainerversion: number;
  idcontainer: string;
  idsite: number;
  status: string;
  revision: number;
  name: string;
  created_date: string;
  created_date_pretty: string;
  description: string;
  updated_date: string;
  updated_date_pretty: string;
}

export interface Release {
  environment: string;
  idcontainer: string;
  idcontainerrelease: number;
  idcontainerversion: number;
  idsite: number;
  release_date: string;
  release_date_pretty: string;
  release_login: string;
  status: string;
  version_name: string;
}

export interface Version {
  created_date: string;
  created_date_pretty: string;
  description: string;
  environments: string[];
  idcontainer: string;
  idcontainerversion: number;
  idsite: number;
  name: string;
  revision: number;
  status: string;
  updated_date: string;
  updated_date_pretty: string;
}

export interface Container {
  context: string;
  created_date: string;
  created_date_pretty: string;
  description: string;
  draft: Draft;
  idcontainer: string;
  idsite: string|number;
  name: string;
  releases: Release[];
  status: string;
  updated_date: string;
  updated_date_pretty: string;
  versions: Version[];
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
  insertTextSnippetAtElement(inputField: HTMLTextAreaElement|HTMLInputElement, textToAdd: string): void;
}

declare global {
  interface Window {
    tagManagerHelper: TagManagerHelper;
  }
}
