<!--
  Matomo - free/libre analytics platform
  @link https://matomo.org
  @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
-->

<template>
  <div
    id="versionNameHelpText"
    class="inline-help-node"
  >
    {{ translate('TagManager_VersionNameHelp') }}
    <br /><br />
    <span
      v-show="lastVersion"
      v-html="$sanitize(translate(
              'TagManager_NameOfLatestVersion',
              `<strong>${lastVersion}</strong>`,
            ))"
    ></span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    lastVersion: String,
  },
});
</script>
