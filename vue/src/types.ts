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

export interface VariableTypeMetadata {
  category: string;
  contexts: string[];
  description: string;
  hasAdvancedSettings: boolean;
  help: string;
  icon: string;
  id: string;
  isCustomTemplate: boolean;
  name: string;
  order: number;
  parameters: Record<string, unknown>[];
}

export interface Variable {
  created_date?: string;
  created_date_pretty?: string;
  default_value: string|number;
  idcontainer: string;
  idcontainerversion: number;
  idsite: number;
  idvariable?: number;
  lookup_table: LookupTable;
  name: string;
  status?: string;
  type: string;
  updated_date?: string;
  updated_date_pretty?: string;
  typeMetadata: VariableTypeMetadata;
}

export interface ContainerVariableType {
  category: string;
  description: string;
  id: string;
  idvariable: string;
  is_pre_configured: boolean;
  name: string;
  order: number;
  type: string;
}

export interface ContainerVariableCategory {
  name: string;
  types: ContainerVariableType[];
}

export interface VariableType {
  category: string;
  contexts: string[];
  description: string;
  hasAdvancedSettings: boolean;
  help: string;
  icon: string;
  id: string;
  isCustomTemplate: boolean;
  name: string;
  order: number;
  parameters: Record<string, unknown>;
}

export interface VariableCategory {
  name: string;
  types: VariableType[];
}

export interface VariableReference {
  referenceId: number;
  referenceName: string;
  referenceType: string;
  referenceTypeName: string;
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
  selectVariable(callback: (variable: ContainerVariableType) => void): void;
  insertTextSnippetAtElement(inputField: HTMLTextAreaElement|HTMLInputElement, textToAdd: string): void;
}

declare global {
  interface Window {
    tagManagerHelper: TagManagerHelper;
  }
}
