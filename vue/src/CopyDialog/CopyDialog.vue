<template>
  <div class="copyMtmObjectDialog">
    <h2>{{ getCopyDialogTitle }}</h2>
    <p>
      {{ getCopyDescription }}&nbsp;
      <span v-html="$sanitize(getLearnMoreLink)" class="learnMore"></span>
    </p>
    <div v-form>
      <Field
        uicontrol="site"
        name="destinationSite"
        :title="translate('TagManager_ChooseWebsite')"
        v-model="site"
      />
      <Field
        uicontrol="select"
        name="idDestinationContainer"
        v-if="copyType.toLowerCase() !== 'container'"
        :options="containerOptions"
        :disabled="containerOptions.length <= 1"
        :full-width="true"
        :title="translate('TagManager_Container')"
        v-model="idDestinationContainer"
      />
      <p
        v-if="copyType.toLowerCase() === 'container'"
        class="copyNote" v-html="$sanitize(getCopyContainerNote)"></p>
      <button class="btn" @click="performCopy">{{ translate('General_Copy') }}</button>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
} from 'vue';
import {
  AjaxHelper,
  MatomoUrl,
  NotificationsStore,
  SiteRef,
  translate,
  externalLink,
} from 'CoreHome';
import {
  Form,
  Field,
} from 'CorePluginsAdmin';
import { Container } from '../types.ts';
import TagsStore from '../Tag/Tags.store';
import ContainersStore from '../Container/Containers.store';
import TriggersStore from '../Trigger/Triggers.store';
import VariablesStore from '../Variable/Variables.store';

interface Option {
  key: string;
  value: string;
}

interface CopyDialogState {
  idDestinationContainer: string;
  containerOptions: Option[];
  site: SiteRef|null;
}

interface CopyRequestParams {
  module: string;
  action: string;
  idSite: number;
  idDestinationSite: string|number;
  nonce: string;
  idDestinationContainer: string;
  idSourceContainer: string;
  idContainerVersion: number;
  idContainer: string|number;
  idTag: string|number;
  idTrigger: string|number;
  idVariable: string|number;
}

export default defineComponent({
  props: {
    defaultSite: {
      type: Object,
      required: true,
    },
    copyType: {
      type: String,
      required: true,
    },
    copyNonce: {
      type: String,
      required: false,
      default: '',
    },
    idToCopy: {
      type: [String, Number],
      required: true,
    },
    idSourceContainer: {
      type: String,
      required: false,
      default: '',
    },
    idContainerVersion: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  directives: {
    Form,
  },
  components: {
    Field,
  },
  data(): CopyDialogState {
    return {
      site: this.defaultSite as SiteRef,
      idDestinationContainer: '',
      containerOptions: [],
    };
  },
  created() {
    this.onSiteChange();
    this.idDestinationContainer = this.idSourceContainer;
  },
  watch: {
    site() {
      this.onSiteChange();
    },
  },
  methods: {
    onSiteChange() {
      // Return because there's no need to look up containers for container copy
      if (this.copyType.toLowerCase() === 'container') {
        return;
      }

      this.containerOptions = [];
      this.idDestinationContainer = '';

      if (!this.site?.id) {
        return;
      }

      AjaxHelper.fetch<Container[]>({
        method: 'TagManager.getContainers',
        filter_limit: '-1',
        idSite: this.site.id,
      }).then((containers: Container[]) => {
        this.containerOptions = [];

        if (!containers?.length) {
          this.idDestinationContainer = '';
          this.containerOptions.push({
            key: '',
            value: this.translate('TagManager_NoContainersFound'),
          });
          return;
        }

        containers.forEach((container: Container) => {
          if (!this.idDestinationContainer) {
            this.idDestinationContainer = container.idcontainer;
          }

          this.containerOptions.push({
            key: container.idcontainer,
            value: container.name,
          });
        });
      });
    },
    performCopy() {
      const requestParams: CopyRequestParams = {
        module: 'TagManager',
        action: '',
        idSite: this.defaultSite.id,
        idDestinationSite: this.site?.id ? this.site.id : 0,
        nonce: this.copyNonce,
        idDestinationContainer: '',
        idSourceContainer: '',
        idContainerVersion: 0,
        idContainer: 0,
        idTag: 0,
        idTrigger: 0,
        idVariable: 0,
      };

      switch (this.copyType.toLowerCase()) {
        case 'container':
          requestParams.action = 'copyContainer';
          requestParams.idContainer = this.idToCopy;
          break;
        case 'tag':
          requestParams.action = 'copyTag';
          requestParams.idTag = this.idToCopy;
          break;
        case 'trigger':
          requestParams.action = 'copyTrigger';
          requestParams.idTrigger = this.idToCopy;
          break;
        case 'variable':
          requestParams.action = 'copyVariable';
          requestParams.idVariable = this.idToCopy;
          break;
        default:
          throw Error('Unrecognised copy object type.');
      }

      if (this.idDestinationContainer) {
        requestParams.idDestinationContainer = this.idDestinationContainer;
      }

      if (this.idSourceContainer) {
        requestParams.idSourceContainer = this.idSourceContainer;
      }

      if (this.idContainerVersion > 0) {
        requestParams.idContainerVersion = this.idContainerVersion;
      }

      AjaxHelper.fetch(requestParams).then((response) => {
        // If there was an issue with the response, display a generic error
        if (!response || !response.isSuccess || !response.urlToNewCopy) {
          const message = response.message ?? translate('General_ErrorRequest', '', '');
          const notificationInstanceId = NotificationsStore.show({
            message,
            id: 'CopyDialogResultNotification',
            context: 'error',
            type: 'transient',
          });
          NotificationsStore.scrollToNotification(notificationInstanceId);

          window.Piwik_Popover.close();
          return;
        }

        // Close the modal, reload the store, and display notification
        this.reloadEntityStore();
        this.displaySuccessNotification(response.urlToNewCopy);
        window.Piwik_Popover.close();
      });
    },
    reloadEntityStore() {
      switch (this.copyType.toLowerCase()) {
        case 'container':
          ContainersStore.reload();
          break;
        case 'tag':
          TagsStore.reload(this.idSourceContainer, this.idContainerVersion);
          break;
        case 'trigger':
          TriggersStore.reload(this.idSourceContainer, this.idContainerVersion);
          break;
        case 'variable':
          VariablesStore.reload(this.idSourceContainer, this.idContainerVersion);
          break;
        default:
          throw Error('Unrecognised copy object type.');
      }
    },
    displaySuccessNotification(urlToNewCopy: string) {
      const mainTranslation = 'TagManager_CopyXSuccess';
      let typeTranslation = '';

      switch (this.copyType.toLowerCase()) {
        case 'container':
          typeTranslation = 'TagManager_ContainerLowercase';
          break;
        case 'tag':
          typeTranslation = 'TagManager_TagLowercase';
          break;
        case 'trigger':
          typeTranslation = 'TagManager_TriggerLowercase';
          break;
        case 'variable':
          typeTranslation = 'TagManager_VariableLowercase';
          break;
        default:
          throw Error('Unrecognised copy object type.');
      }

      const message = translate(
        mainTranslation,
        [
          `<a href="${urlToNewCopy}">`,
          translate(typeTranslation),
          '</a>',
        ],
      );

      const notificationInstanceId = NotificationsStore.show({
        message,
        id: 'CopyDialogResultNotification',
        context: 'success',
        type: 'transient',
      });
      NotificationsStore.scrollToNotification(notificationInstanceId);
    },
  },
  computed: {
    getCopyDialogTitle() {
      let objectTypeTranslation = '';
      switch (this.copyType.toLowerCase()) {
        case 'container':
          objectTypeTranslation = translate('TagManager_Container');
          break;
        case 'tag':
          objectTypeTranslation = translate('TagManager_Tag');
          break;
        case 'trigger':
          objectTypeTranslation = translate('TagManager_Trigger');
          break;
        case 'variable':
          objectTypeTranslation = translate('TagManager_Variable');
          break;
        default:
          throw Error('Unrecognised copy object type.');
      }

      return translate('TagManager_CopyX', objectTypeTranslation);
    },
    getCopyDescription() {
      if (this.copyType.toLowerCase() === 'container') {
        return translate('TagManager_CopyContainerDescription');
      }

      let objectTypeTranslation = '';
      switch (this.copyType.toLowerCase()) {
        case 'tag':
          objectTypeTranslation = translate('TagManager_TagLowercase');
          break;
        case 'trigger':
          objectTypeTranslation = translate('TagManager_TriggerLowercase');
          break;
        case 'variable':
          objectTypeTranslation = translate('TagManager_VariableLowercase');
          break;
        default:
          throw Error('Unrecognised copy object type.');
      }

      return translate('TagManager_CopyXDescription', objectTypeTranslation);
    },
    getCopyContainerNote() {
      return translate('TagManager_CopyContainerNote', '<strong>', '</strong>');
    },
    getCopyUrl() {
      const requestParams: CopyRequestParams = {
        module: 'TagManager',
        action: '',
        idSite: this.defaultSite.id,
        idDestinationSite: this.site?.id ? this.site.id : 0,
        nonce: this.copyNonce,
        idDestinationContainer: '',
        idSourceContainer: '',
        idContainerVersion: 0,
        idContainer: 0,
        idTag: 0,
        idTrigger: 0,
        idVariable: 0,
      };

      switch (this.copyType.toLowerCase()) {
        case 'container':
          requestParams.action = 'copyContainer';
          requestParams.idContainer = this.idToCopy;
          break;
        case 'tag':
          requestParams.action = 'copyTag';
          requestParams.idTag = this.idToCopy;
          break;
        case 'trigger':
          requestParams.action = 'copyTrigger';
          requestParams.idTrigger = this.idToCopy;
          break;
        case 'variable':
          requestParams.action = 'copyVariable';
          requestParams.idVariable = this.idToCopy;
          break;
        default:
          throw Error('Unrecognised copy object type.');
      }

      if (this.idDestinationContainer) {
        requestParams.idDestinationContainer = this.idDestinationContainer;
      }

      if (this.idSourceContainer) {
        requestParams.idSourceContainer = this.idSourceContainer;
      }

      if (this.idContainerVersion > 0) {
        requestParams.idContainerVersion = this.idContainerVersion;
      }

      return `?${MatomoUrl.stringify(requestParams)}`;
    },
    getLearnMoreLink() {
      let faqLink = '';
      switch (this.copyType.toLowerCase()) {
        case 'container':
          faqLink = 'https://matomo.org/faq/tag-manager/how-to-copy-a-matomo-tag-manager-container-and-its-components';
          break;
        case 'tag':
          faqLink = 'https://matomo.org/faq/tag-manager/how-to-copy-a-tag-in-matomo-tag-manager ';
          break;
        case 'trigger':
          faqLink = 'https://matomo.org/faq/tag-manager/how-to-copy-a-trigger-in-matomo-tag-manager';
          break;
        case 'variable':
          faqLink = 'https://matomo.org/faq/tag-manager/how-to-copy-a-variable-in-matomo-tag-manager';
          break;
        default:
          throw Error('Unrecognised copy object type.');
      }

      const linkString = externalLink(faqLink);
      return translate('TagManager_LearnMoreFullStop', linkString, '</a>');
    },
  },
});
</script>
