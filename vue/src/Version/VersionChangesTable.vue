<!--
  Matomo - free/libre analytics platform

  @link    https://matomo.org
  @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
-->

<template>
  <table v-content-table>
    <thead>
      <tr>
        <th>{{ translate('SitesManager_Type') }}</th>
        <th>{{ translate('General_Name') }}</th>
        <th>{{ translate('TagManager_Change') }}</th>
        <th>{{ translate('TagManager_LastUpdated') }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="loading">
        <td colspan="4">
          <ActivityIndicator
            :loading-message="translate('TagManager_DetectingChanges')"
            :loading="true"
          />
        </td>
      </tr>
      <tr v-if="!changes.length && !loading">
        <td colspan="4">{{ translate('UserCountryMap_None') }}</td>
      </tr>
      <tr v-for="(change, index) in changes" :key="index">
        <td>{{ translate(change.entityType) }}</td>
        <td>{{ change.name }}</td>
        <td>{{ translate(change.type) }}</td>
        <td class="lastUpdated"><span>{{ change.lastChanged }}</span></td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { ActivityIndicator, ContentTable } from 'CoreHome';
import { SingleDiff } from './diffDraftVersion';

export default defineComponent({
  props: {
    changes: {
      type: Array as PropType<SingleDiff[]>,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    ActivityIndicator,
  },
  directives: {
    ContentTable,
  },
});
</script>
