<!--
  Matomo - free/libre analytics platform
  @link https://matomo.org
  @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
-->

<template>
  <ContentBlock
    class="editContainer tagManagerManageEdit"
    feature="Tag Manager"
    :content-title="editTitle"
  >
    <p v-show="isLoading">
      <span class="loadingPiwik">
        <img src="plugins/Morpheus/images/loading-blue.gif" />
        {{ translate('General_LoadingData') }}
      </span>
    </p>
    <p v-show="isUpdating">
      <span class="loadingPiwik">
        <img src="plugins/Morpheus/images/loading-blue.gif" />
        {{ translate('TagManager_UpdatingData') }}
      </span>
    </p>
    <form @submit="edit ? updateContainer() : createContainer()">
      <div>
        <div>
          <Field
            uicontrol="text"
            name="idcontainer"
            v-show="edit"
            :model-value="container.idcontainer"
            :disabled="true"
            :title="translate('General_Id')"
          />
        </div>
        <div>
          <Field
            uicontrol="select"
            name="context"
            :model-value="container.context"
            @update:model-value="container.context = $event; setValueHasChanged()"
            :disabled="true"
            :options="contexts"
            :title="translate('TagManager_Context')"
            :inline-help="translate('TagManager_ContainerContextHelp')"
          />
        </div>
        <div>
          <Field
            uicontrol="text"
            name="name"
            :model-value="container.name"
            @update:model-value="container.name = $event; setValueHasChanged()"
            :maxlength="50"
            :title="translate('General_Name')"
            :inline-help="translate('TagManager_ContainerNameHelp')"
          />
        </div>
        <div>
          <Field
            uicontrol="textarea"
            name="description"
            :model-value="container.description"
            @update:model-value="container.description = $event; setValueHasChanged()"
            :title="translate('General_Description')"
            :inline-help="translate('TagManager_ContainerDescriptionHelp')"
          />
        </div>
        <SaveButton
          class="createButton"
          @confirm="edit ? updateContainer() : createContainer()"
          :disabled="isUpdating || !isDirty"
          :saving="isUpdating"
          :value="edit
            ? translate('CoreUpdater_UpdateTitle')
            : translate('TagManager_CreateNewContainer')"
        >
        </SaveButton>
        <div class="entityCancel">
          <a @click="cancel()">{{ translate('General_Cancel') }}</a>
        </div>
      </div>
    </form>
  </ContentBlock>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  translate,
  Matomo,
  ContentBlock,
  NotificationsStore,
  NotificationType,
  clone, MatomoUrl,
} from 'CoreHome';
import { Field, SaveButton } from 'CorePluginsAdmin';
import AvailableContextsStore from '../AvailableContexts.store';
import VariablesStore from '../Variable/Variables.store';
import AvailableComparisonsStore from '../AvailableComparisons.store';
import { Container } from '../types';
import ContainersStore from './Containers.store';

interface ContainerEditState {
  isDirty: boolean;
  editTitle: string;
  isUpdatingVersion: boolean;
  container: Container;
}

const notificationId = 'containertagmanagement';

export default defineComponent({
  props: {
    idContainer: String,
  },
  components: {
    ContentBlock,
    Field,
    SaveButton,
  },
  data(): ContainerEditState {
    return {
      isDirty: false,
      editTitle: '',
      isUpdatingVersion: false,
      container: {} as unknown as Container,
    };
  },
  created() {
    AvailableContextsStore.init();
    AvailableComparisonsStore.init();

    this.initIdContainer();
  },
  watch: {
    idContainer(newValue: string) {
      if (newValue === null) {
        return;
      }

      this.initIdContainer();
    },
  },
  methods: {
    removeAnyContainerNotification() {
      NotificationsStore.remove(notificationId);
      NotificationsStore.remove('ajaxHelper');
    },
    showNotification(message: string, context: NotificationType['context']) {
      const notificationInstanceId = NotificationsStore.show({
        message,
        context,
        id: notificationId,
        type: 'transient',
      });
      setTimeout(() => {
        NotificationsStore.scrollToNotification(notificationInstanceId);
      }, 200);
    },
    showErrorFieldNotProvidedNotification(title: string) {
      const message = translate('TagManager_ErrorXNotProvided', [title]);
      this.showNotification(message, 'error');
    },
    initIdContainer() {
      this.container = {} as unknown as Container;

      Matomo.helper.lazyScrollToContent();

      if (this.edit && this.idContainer) {
        this.editTitle = translate('TagManager_EditContainer');
        ContainersStore.findContainer(this.idContainer).then((container) => {
          if (!container) {
            return;
          }

          this.container = clone(container) as unknown as Container;
          this.isDirty = false;
        });
      } else if (this.create) {
        this.editTitle = translate('TagManager_CreateNewContainer');
        this.container = {
          idSite: Matomo.idSite,
          name: '',
          context: 'web',
          description: '',
        } as unknown as Container;
        this.isDirty = false;
      }
    },
    cancel() {
      const newParams = { ...MatomoUrl.hashParsed.value };
      delete newParams.idContainer;
      MatomoUrl.updateHash(newParams);
    },
    createContainer() {
      this.removeAnyContainerNotification();

      if (!this.checkRequiredFieldsAreSet()) {
        return;
      }

      this.isUpdatingVersion = true;
      ContainersStore.createOrUpdateContainer(
        this.container,
        'TagManager.addContainer',
      ).then((response) => {
        this.isUpdatingVersion = false;

        if (!response) {
          return;
        }

        this.isDirty = false;

        const idContainer = response.value;
        this.showNotification(
          translate('TagManager_CreatedX', translate('TagManager_Container')),
          'success',
        );

        MatomoUrl.updateUrl({
          ...MatomoUrl.urlParsed.value,
          module: 'TagManager',
          action: 'dashboard',
          idContainer,
        });
      }).finally(() => {
        this.isUpdatingVersion = false;
      });
    },
    setValueHasChanged() {
      this.isDirty = true;
    },
    updateContainer() {
      this.removeAnyContainerNotification();

      if (!this.checkRequiredFieldsAreSet()) {
        return;
      }

      this.isUpdating = true;
      ContainersStore.createOrUpdateContainer(
        this.container,
        'TagManager.updateContainer',
      ).then((response) => {
        if (!response) {
          return;
        }

        this.isDirty = false;
        this.container = {} as unknown as Container;

        ContainersStore.reload().then(() => {
          this.initIdContainer();
        });

        this.showNotification(
          translate(
            'TagManager_UpdatedX',
            translate('TagManager_Container'),
          ),
          'success',
        );
      });
    },
    checkRequiredFieldsAreSet() {
      if (!this.container.name) {
        const title = translate('General_Name');
        this.showErrorFieldNotProvidedNotification(title);
        return false;
      }

      return true;
    },
  },
  computed: {
    contexts() {
      return AvailableContextsStore.contextsOptions.value;
    },
    create() {
      return this.idContainer === '0';
    },
    edit() {
      return !this.create;
    },
    isLoading() {
      return VariablesStore.isLoading.value || AvailableComparisonsStore.isLoading.value;
    },
    isUpdating() {
      return VariablesStore.isUpdating.value || this.isUpdatingVersion;
    },
  },
});
</script>
