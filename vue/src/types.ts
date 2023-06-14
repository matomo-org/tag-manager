/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

import { IScope } from 'angular';
import { DeepReadonly } from 'vue';

export interface InstallInstructions {
  description: string;
  embedCode: string;
  helpUrl: string;
  pageViewTriggerEditUrl: string;
}

// variable types
export interface LookupTableEntry {
  match_value: string;
  comparison: string;
  out_value: string;
}

export type LookupTable = LookupTableEntry[];

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
  description: string;
  status?: string;
  type: string;
  updated_date?: string;
  updated_date_pretty?: string;
  typeMetadata: DeepReadonly<VariableType>;
}

export interface ContainerVariableType {
  category: string;
  description: string;
  id: string;
  idvariable: number;
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
  parameters: Record<string, unknown>[];
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

// trigger types
export interface TriggerType {
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

export interface TriggerCategory {
  name: string;
  types: TriggerType[];
}

export interface TriggerCondition {
  actual: string;
  comparison: string;
  expected: string;
}

export interface Trigger {
  conditions: TriggerCondition[];
  created_date?: string;
  created_date_pretty?: string;
  idcontainerversion: number;
  idsite: number;
  idtrigger?: number;
  name: string;
  description: string;
  status?: string;
  type: string;
  typeMetadata: TriggerType;
  updated_date?: string;
  updated_date_pretty?: string;
}

export interface TriggerReference {
  referenceId: number;
  referenceTypeName: string;
  referenceName: string;
}

// tag types
export interface TagType {
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

export interface TagTypeCategory {
  name: string;
  types: TagType[];
}

export interface Tag {
  block_trigger_ids: number[];
  created_date?: string;
  created_date_pretty?: string;
  end_date: string|null;
  fire_delay: number;
  fire_limit: string;
  fire_trigger_ids: number[];
  idcontainerversion: number;
  idsite: number;
  idtag: number;
  name: string;
  description: string;
  priority: number;
  start_date: null|string;
  status: string;
  type: string;
  typeMetadata: TagType;
  updated_date?: string;
  updated_date_pretty?: string;
}

// container types
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
}

export interface Version {
  created_date?: string;
  created_date_pretty?: string;
  description: string;
  environments: string[];
  idcontainer: string;
  idcontainerversion: number;
  idsite: number;
  name: string;
  revision: number;
  status: string;
  updated_date?: string;
  updated_date_pretty?: string;
  releases: Release[];
}

export interface ExportedVersion extends Version {
  tags: Tag[];
  triggers: Trigger[];
  variables: Variable[];
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
    idContainer: string,
    idContainerVersion: number,
    idVariable: number,
    callback: (variable: Variable) => void,
    variableType?: string,
  ): void;
  selectVariable(callback: (variable: ContainerVariableType) => void): void;
  insertTextSnippetAtElement(inputField: HTMLTextAreaElement|HTMLInputElement, textToAdd: string): void;

  editTrigger(
    $scope: IScope|null,
    idContainer: string,
    idContainerVersion: number,
    idTag: number,
    callback: (trigger: Trigger) => void,
  ): void;

  importVersion($scope: IScope|null, idContainer: string): void;

  enablePreviewMode(idContainer: string, idContainerVersion: number): void;

  showInstallCode(idContainer: string): void;

  truncateText(text: string, maxLength: number): string;
}

declare global {
  interface Window {
    tagManagerHelper: TagManagerHelper;
  }
}
