<!--
  Matomo - free/libre analytics platform

  @link    https://matomo.org
  @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
-->

<template>
  <div class="enablePreviewConfirm">
    <h2 class="enablePreviewConfirm__title">
      {{ translate('TagManager_ConfirmEnablePreviewTitle') }}
    </h2>
    <div class="alert alert-warning enablePreviewConfirm__warning">
      <p v-html="$sanitize(previewDescription)"></p>
      <p>{{ translate('TagManager_EnablePreviewRiskWarning') }}</p>
    </div>
    <div class="enablePreviewConfirm__changes">
      <div v-if="loadFailed" class="alert alert-danger">
        {{ translate('TagManager_PreviewChangesLoadError') }}
      </div>
      <p v-else-if="!loading && !comparedVersionName">
        {{ noVersionToCompareMessage }}
      </p>
      <template v-else>
        <h3 v-if="comparedVersionName">{{ changesHeading }}</h3>
        <VersionChangesTable
          :changes="changes"
          :loading="loading"
        />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  AjaxHelper,
  translate,
  externalLink,
} from 'CoreHome';
import diffDraftVersion, { SingleDiff } from '../Version/diffDraftVersion';
import VersionChangesTable from '../Version/VersionChangesTable.vue';
import { Version } from '../types';

interface EnablePreviewConfirmState {
  loading: boolean;
  changes: SingleDiff[];
  comparedVersionName: string|null;
  isComparedToLive: boolean;
  loadFailed: boolean;
}

const LIVE_ENVIRONMENT = 'live';

export default defineComponent({
  props: {
    idContainer: {
      type: String,
      required: true,
    },
    // 0 previews the draft
    idContainerVersion: {
      type: Number,
      default: 0,
    },
  },
  components: {
    VersionChangesTable,
  },
  data(): EnablePreviewConfirmState {
    return {
      loading: true,
      changes: [],
      comparedVersionName: null,
      isComparedToLive: false,
      loadFailed: false,
    };
  },
  created() {
    AjaxHelper.fetch<Version[]>({
      method: 'TagManager.getContainerVersions',
      idContainer: this.idContainer,
      filter_limit: '-1',
    }).then((versions) => {
      let compareTo = versions.find((v) => (v.releases || []).some(
        (r) => r.environment === LIVE_ENVIRONMENT,
      ));
      this.isComparedToLive = !!compareTo;

      if (!compareTo) {
        // The draft is compared with the newest version, a saved version with the one before it
        const previewed = versions.find((v) => v.idcontainerversion === this.idContainerVersion);
        compareTo = versions
          .filter((v) => !previewed || v.revision < previewed.revision)
          .reduce<Version|undefined>(
            (latest, v) => (!latest || v.revision > latest.revision ? v : latest),
            undefined,
          );
      }

      if (!compareTo) {
        return undefined;
      }

      this.comparedVersionName = compareTo.name;

      return diffDraftVersion(
        this.idContainer,
        this.idContainerVersion,
        compareTo.idcontainerversion,
      ).then((diff) => {
        diff.sort((a, b) => (
          new Date(b.lastChanged).valueOf() - new Date(a.lastChanged).valueOf()));
        this.changes = diff;
      });
    }).catch(() => {
      this.loadFailed = true;
    }).finally(() => {
      this.loading = false;
    });
  },
  computed: {
    previewDescription() {
      return translate(
        'TagManager_PreviewModeEnabledDescription',
        externalLink('https://matomo.org/faq/tag-manager/preview-debug-a-tag-manager-container/'),
        '</a>',
      );
    },
    changesHeading() {
      if (this.isComparedToLive) {
        return translate('TagManager_ChangesComparedToLiveVersion', this.comparedVersionName!);
      }

      if (this.idContainerVersion) {
        return translate('TagManager_ChangesComparedToPreviousVersion', this.comparedVersionName!);
      }

      // Same suffix as the existing heading in VersionEdit.vue, which shares this key
      return `${translate('TagManager_ChangesSinceLastVersion')}:`;
    },
    noVersionToCompareMessage() {
      if (this.idContainerVersion) {
        return translate('TagManager_PreviewNoEarlierVersionToCompare');
      }

      return translate('TagManager_PreviewNoVersionToCompare');
    },
  },
});
</script>
