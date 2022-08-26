<!--
  Matomo - free/libre analytics platform
  @link https://matomo.org
  @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
-->

<template>
  <ContentBlock
    anchor="tagmanager"
    :content-title="translate('TagManager_TagManager')"
  >
    <p v-html="$sanitize(trackingInfoText)"></p>
    <TagmanagerTrackingCode />
  </ContentBlock>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ContentBlock, translate, MatomoUrl } from 'CoreHome';
import TagmanagerTrackingCode from './TagmanagerTrackingCode.vue';

export default defineComponent({
  props: {},
  components: {
    ContentBlock,
    TagmanagerTrackingCode,
  },
  computed: {
    trackingInfoText() {
      const gettingStartedLink = `?${MatomoUrl.stringify({
        ...MatomoUrl.urlParsed.value,
        module: 'TagManager',
        action: 'gettingStarted',
      })}`;

      const manageContainersLink = `?${MatomoUrl.stringify({
        ...MatomoUrl.urlParsed.value,
        module: 'TagManager',
        action: 'manageContainers',
      })}`;

      return translate(
        'TagManager_TagManagerTrackingInfo',
        `<a href="${gettingStartedLink}">`,
        '</a>',
        `<a href="${manageContainersLink}">`,
        '</a>',
      );
    },
  },
});
</script>
