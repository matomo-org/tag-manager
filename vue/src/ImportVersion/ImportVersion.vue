<!--
  Matomo - free/libre analytics platform
  @link https://matomo.org
  @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
-->

<template>
  <div class="tagManagerImportVersion">
    <ContentBlock :content-title="translate('TagManager_ImportVersion')">
      <p>{{ translate('TagManager_VersionImportInfo') }}</p>
      <ActivityIndicator
        :loading="isUpdating"
        :loading-message="translate('TagManager_UpdatingData')"
      />
      <div>
        <Field
          uicontrol="text"
          v-model="backupName"
          name="backupName"
          :placeholder="' '"
          :title="backupNameTitle"
          :inline-help="translate('TagManager_BackupVersionNameHelp')"
        />
      </div>
      <div>
        <Field
          uicontrol="textarea"
          v-model="importContent"
          name="importContent"
          :placeholder="' '"
          :full-width="true"
          :title="translate('TagManager_VersionImportContentTitle')"
        />
      </div>
      <SaveButton
        class="importVersion"
        :disabled="!importContent"
        @confirm="importVersion(backupName, importContent)"
        :value="translate('TagManager_VersionImportOverwriteContent')"
      >
      </SaveButton>
    </ContentBlock>
    <div
      class="ui-confirm"
      id="confirmImportContainerVersion"
      ref="confirmImportContainerVersion"
    >
      <h2>{{ translate('TagManager_ConfirmImportContainerVersion') }} </h2>
      <input
        role="yes"
        type="button"
        :value="translate('General_Yes')"
      />
      <input
        role="no"
        type="button"
        :value="translate('General_No')"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  Matomo,
  translate,
  AjaxHelper,
  ContentBlock,
  ActivityIndicator,
  NotificationsStore,
  NotificationType,
} from 'CoreHome';
import { Field, SaveButton } from 'CorePluginsAdmin';

const NOTIFICATION_ID = 'importContainerVersion';

interface ContainerImportInput {
  tags?: unknown;
  triggers?: unknown;
  variables?: unknown;
  idcontainer?: unknown;
  context?: unknown;
}

interface ImportVersionState {
  isUpdating: boolean;
  backupName: string;
  importContent: string,
}

export default defineComponent({
  props: {
    idContainer: {
      type: String,
      required: true,
    },
  },
  components: {
    ContentBlock,
    ActivityIndicator,
    Field,
    SaveButton,
  },
  data(): ImportVersionState {
    return {
      isUpdating: false,
      backupName: '',
      importContent: '',
    };
  },
  methods: {
    showNotification(message: string, context: NotificationType['context']) {
      const instanceId = NotificationsStore.show({
        message,
        context,
        type: 'transient',
        id: NOTIFICATION_ID,
      });

      setTimeout(() => {
        NotificationsStore.scrollToNotification(instanceId);
      }, 200);
    },
    importVersion(backupName: string, version: string) {
      if (!version) {
        return;
      }

      let parsed: ContainerImportInput;
      try {
        parsed = JSON.parse(version);
      } catch (e) {
        this.showNotification(translate('TagManager_ErrorInvalidContainerImportFormat'), 'error');
        return;
      }

      if ('tags' in parsed
        && 'triggers' in parsed
        && 'variables' in parsed
        && 'idcontainer' in parsed
        && 'context' in parsed
      ) {
        Matomo.helper.modalConfirm(
          this.$refs.confirmImportContainerVersion as HTMLElement,
          {
            yes: () => {
              this.isUpdating = true;

              const post = {
                exportedContainerVersion: version,
              };

              AjaxHelper.post(
                {
                  method: 'TagManager.importContainerVersion',
                  idContainer: this.idContainer,
                  backupName: this.backupName,
                },
                post,
              ).then(() => {
                this.showNotification(translate('TagManager_VersionImportSuccess'), 'success');
                this.isUpdating = false;
                window.location.reload();
              }).catch(() => {
                this.isUpdating = false;
              });
            },
          },
        );
      } else {
        this.showNotification(translate('TagManager_ErrorContainerVersionImportIncomplete'), 'error');
      }
    },
  },
  computed: {
    backupNameTitle() {
      return `${translate('TagManager_BackupVersionName')} (${translate('General_Recommended')})`;
    },
  },
});
</script>
