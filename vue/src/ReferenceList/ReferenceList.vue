<!--
  Matomo - free/libre analytics platform
  @link https://matomo.org
  @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
-->

<template>
  <div class="tagManagerReferenceList">
    <ul class="collection">
      <li
        class="collection-item"
        v-for="reference in references"
        :key="`${reference.referenceType}.${reference.referenceId}`"
      >
        <a
          :href="editUrl(reference)"
          target="_blank"
          rel="noreferrer noopener"
        >{{ reference.referenceTypeName }}: {{ reference.referenceName }}</a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { MatomoUrl } from 'CoreHome';
import { ReferenceType, TriggerReference, VariableReference } from '../types';

const EDIT_TARGETS: Record<ReferenceType, { action: string, idParam: string }> = {
  tag: { action: 'manageTags', idParam: 'idTag' },
  trigger: { action: 'manageTriggers', idParam: 'idTrigger' },
  variable: { action: 'manageVariables', idParam: 'idVariable' },
};

export default defineComponent({
  props: {
    references: {
      type: Array as PropType<(TriggerReference | VariableReference)[]>,
      required: true,
    },
  },
  methods: {
    editUrl(reference: TriggerReference | VariableReference): string {
      const target = EDIT_TARGETS[reference.referenceType];
      const url = MatomoUrl.stringify({
        ...MatomoUrl.urlParsed.value,
        module: 'TagManager',
        action: target.action,
      });
      const hash = MatomoUrl.stringify({ [target.idParam]: reference.referenceId });

      return `?${url}#?${hash}`;
    },
  },
});
</script>
