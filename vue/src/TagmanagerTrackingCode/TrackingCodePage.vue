<!--
  Matomo - free/libre analytics platform
  @link https://matomo.org
  @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
-->

<template>
  <div v-if="currentAction === 'siteWithoutDataTabs'">
    <p v-html="$sanitize(trackingInfoTextLine1)"></p>
    <p v-html="$sanitize(trackingInfoTextLine2)"></p>
    <TagmanagerTrackingCode :show-container-row="showContainerRow" :current-action="currentAction"/>
  </div>
  <ContentBlock
    anchor="tagmanager"
    :content-title="translate('TagManager_MatomoTagManager')"
    v-else
  >
    <p>&nbsp;</p>
    <p v-html="$sanitize(trackingInfoTextLine1)"></p>
    <br>
    <p v-html="$sanitize(trackingInfoTextLine2)"></p>
    <TagmanagerTrackingCode :show-container-row="showContainerRow" :current-action="currentAction"/>
  </ContentBlock>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ContentBlock, translate, MatomoUrl } from 'CoreHome';
import TagmanagerTrackingCode from './TagmanagerTrackingCode.vue';

export default defineComponent({
  props: {
    currentAction: String,
    showContainerRow: Boolean,
  },
  components: {
    ContentBlock,
    TagmanagerTrackingCode,
  },
  computed: {
    trackingInfoTextLine1() {
      const manageContainersLink = `?${MatomoUrl.stringify({
        ...MatomoUrl.urlParsed.value,
        module: 'TagManager',
        action: 'manageContainers',
      })}`;

      return translate(
        'TagManager_MatomoTagManagerTrackingInfoLine1',
        `<a href="${manageContainersLink}">`,
        '</a>',
      );
    },
    trackingInfoTextLine2() {
      const gettingStartedLink = `?${MatomoUrl.stringify({
        ...MatomoUrl.urlParsed.value,
        module: 'TagManager',
        action: 'gettingStarted',
      })}`;

      return translate(
        'TagManager_MatomoTagManagerTrackingInfoLine2',
        `<a href="${gettingStartedLink}">`,
        '</a>',
      );
    },
  },
});
</script>
