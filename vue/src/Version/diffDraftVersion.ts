/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

import { AjaxHelper } from 'CoreHome';
import { ExportedVersion, Tag, Trigger } from '../types';

type Entity = Record<string, unknown>;

export interface SingleDiff {
  entityType: string;
  type: string;
  name: string;
  lastChanged: string;
}

interface MixedInTag extends Tag {
  block_triggers?: string[];
  fire_triggers?: string[];
}

export default function diffDraftVersion(
  idContainer: string,
  idContainerVersionNew: number,
  idContainerVersionPrevious: number,
): Promise<SingleDiff[]> {
  function findEntryInArray(array: Entity[], name: string) {
    return array.find((v) => v.name === name);
  }

  function getDifference(
    entityType: string,
    array1: Entity[],
    array2: Entity[],
    keysToCheck: string[],
  ) {
    const diff: SingleDiff[] = [];

    array1.forEach((array1Item) => {
      const matchingEntry = findEntryInArray(array2, array1Item.name as string);
      if (matchingEntry) {
        keysToCheck.some((key) => {
          if (JSON.stringify(array1Item[key]) !== JSON.stringify(matchingEntry[key])) {
            // matching, check if different
            diff.push({
              entityType,
              type: 'TagManager_DiffModified',
              name: array1Item.name as string,
              lastChanged: array1Item.updated_date_pretty as string,
            });

            return true;
          }

          return false;
        });

        return;
      }

      diff.push({
        entityType,
        type: 'TagManager_DiffAdded',
        name: array1Item.name as string,
        lastChanged: array1Item.updated_date_pretty as string,
      });
    });

    array2.forEach((array2Item) => {
      if (!findEntryInArray(array1, array2Item.name as string)) {
        diff.push({
          entityType,
          type: 'TagManager_DiffDeleted',
          name: array2Item.name as string,
          lastChanged: array2Item.updated_date_pretty as string,
        });
      }
    });

    return diff;
  }

  function mixinTagTriggers(tags: MixedInTag[], triggers: Trigger[]) {
    tags.forEach((tag) => {
      tag.fire_triggers = [];
      tag.block_triggers = [];

      tag.fire_trigger_ids.forEach((idtrigger) => {
        const trigger = triggers.find((t) => t.idtrigger === idtrigger);
        if (trigger) {
          tag.fire_triggers!.push(trigger.name);
        }
      });

      tag.block_trigger_ids.forEach((idtrigger) => {
        const trigger = triggers.find((t) => t.idtrigger === idtrigger);
        if (trigger) {
          tag.block_triggers!.push(trigger.name);
        }
      });
    });
  }

  const draftVersion: QueryParameters = {
    module: 'API',
    method: 'TagManager.exportContainerVersion',
    format: 'json',
    idContainer,
    filter_limit: -1,
  };
  if (idContainerVersionNew) {
    draftVersion.idContainerVersion = idContainerVersionNew;
  }

  const lastVersion: QueryParameters = {
    module: 'API',
    method: 'TagManager.exportContainerVersion',
    format: 'json',
    idContainer,
    idContainerVersion: idContainerVersionPrevious,
    filter_limit: -1,
  };

  return AjaxHelper.fetch<ExportedVersion[]>(
    [draftVersion, lastVersion],
  ).then(([draft, last]) => {
    mixinTagTriggers(draft.tags, draft.triggers);
    mixinTagTriggers(last.tags, last.triggers);

    const diff1 = getDifference(
      'TagManager_Tag',
      draft.tags as unknown as Entity[],
      last.tags as unknown as Entity[],
      [
        'name',
        'type',
        'fire_limit',
        'priority',
        'fire_delay',
        'fire_triggers',
        'block_triggers',
        'parameters',
      ],
    );

    const diff2 = getDifference(
      'TagManager_Trigger',
      draft.triggers as unknown as Entity[],
      last.triggers as unknown as Entity[],
      ['name', 'type', 'conditions', 'parameters'],
    );

    const diff3 = getDifference(
      'TagManager_Variable',
      draft.variables as unknown as Entity[],
      last.variables as unknown as Entity[],
      ['name', 'type', 'lookup_table', 'default_value', 'parameters'],
    );

    return [
      ...diff1,
      ...diff2,
      ...diff3,
    ];
  });
}
