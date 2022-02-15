<!--
  Matomo - free/libre analytics platform
  @link https://matomo.org
  @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
-->

// TODO
<todo>
- conversion check (mistakes get fixed in quickmigrate)
- property types
- state types
- look over template
- look over component code
- get to build
- test in UI
- check uses:
  ./plugins/TagManager/templates/trackingCode.twig
  ./plugins/TagManager/angularjs/tagmanagerTrackingCode/tagmanager.directive.js
- create PR
</todo>

<template>
  <div class="tagManagerTrackingCode">
    <ActivityIndicator
      :style="{opacity: trackingCode.isLoading ? 1 : 0}"
      :loading="true"
    />
    <div class="row">
      <div class="col s12 m4 ">
        <div class="form-group row">
          <div class="col s12 input-field">
            <label
              for="tagManagerTrackingCodeSite"
              class="siteSelectorLabel"
            >{{ translate('General_Website') }}</label>
            <div class="sites_autocomplete">
              <SiteSelector
                id="tagManagerTrackingCodeSite"
                v-model="site"
                :show-all-sites-item="false"
                :switch-site-on-select="false"
                :show-selected-site="true"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="col s12 m4">
        <div>
          <Field
            uicontrol="select"
            name="containers"
            :model-value="idContainer"
            @update:model-value="idContainer = $event; onContainerChange()"
            :options="containers"
            :disabled="containers.length <= 1"
            :full-width="true"
            :title="translate('TagManager_Container')"
          >
          </Field>
        </div>
      </div>
      <div class="col s12 m4">
        <div>
          <Field
            uicontrol="select"
            name="environment"
            :model-value="environment"
            @update:model-value="environment = $event; fetchInstallInstructions()"
            :options="environments"
            :disabled="environments.length <= 1"
            :full-width="true"
            :title="translate('TagManager_Environment')"
          >
          </Field>
        </div>
      </div>
    </div>
    <div
      class="alert alert-info"
      v-show="idContainer && noReleaseFound"
    >
      {{ translate('TagManager_NoReleasesFoundForContainer') }}
      <a href>{{ translate('TagManager_PublishVersionToEnvironmentToViewEmbedCode') }} </a>
    </div>
    <div
      v-for="installInstruction in installInstructions"
      :key="TODO"
    >
      <p>{{ installInstruction.description }}
        <br />
        <a
          target="_blank"
          v-show="installInstruction.helpUrl"
          :href="installInstruction.helpUrl"
        >{{ translate('TagManager_LearnMore') }}</a>
      </p>
      <pre
        class="codeblock"
        v-text="installInstruction.embedCode"
        v-select-on-focus="{}"
      >
      </pre>
    </div>
    <h3 v-show="idContainer">
      {{ translate('TagManager_CustomizeTracking') }}
    </h3>
    <p v-show="idContainer">{{ translate('TagManager_CustomizeTrackingTeaser') }}</p>
    <ul v-show="idContainer">
      <li v-show="!matomoConfigs.length">{{ translate('TagManager_NoMatomoConfigFoundForContainer') }}</li>
      <li
        v-for="matomoConfig in matomoConfigs"
        :key="TODO"
      ><a :href="linkTo('manageVariables', idContainer, 'idVariable=' + matomoConfig.idvariable)"><span
            class="icon-edit"
          /> {{ matomoConfig.name }}</a></li>
    </ul>
    <p v-show="idContainer">
      <br />
      <a :href="linkTo('dashboard', idContainer)"><span class="icon-show" />
        {{ translate('TagManager_ViewContainerDashboard') }}</a>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  translate,
  AjaxHelper,
  Matomo,
  ActivityIndicator,
  SiteSelector,
  SelectOnFocus
} from 'CoreHome';
import { Field } from 'CorePluginsAdmin';


interface TagmanagerTrackingCodeState {
  containerVariables: unknown[]; // TODO
  isLoading: boolean;
  idContainer: number;
  environment: string;
  environmentNameMap: Record<string, unknown>; // TODO
  environments: unknown[]; // TODO
  containers: unknown[]; // TODO
  containerMap: Record<string, unknown>; // TODO
  site: unknown|null; // TODO
  matomoConfigs: unknown[]; // TODO
  releases: unknown[]; // TODO
  installInstructions: unknown[]; // TODO
  noReleaseFound: boolean;
  firstTime: boolean;
}

export default defineComponent({
  props: {
  },
  components: {
    ActivityIndicator,
    SiteSelector,
    Field,
  },
  directives: {
    SelectOnFocus,
  },
  data(): TagmanagerTrackingCodeState {
    return {
      containerVariables: [],
      isLoading: false,
      idContainer: 0,
      environment: '',
      environmentNameMap: {},
      environments: [],
      containers: [],
      containerMap: {},
      site: null,
      matomoConfigs: [],
      releases: [],
      installInstructions: [],
      noReleaseFound: false,
      firstTime: true,
    };
  },
  created() {
    AjaxHelper.fetch({
      method: 'TagManager.getAvailableEnvironments',
      filter_limit: '-1'
    }).then((environments) => {
      angular.forEach(this.environments, (environment) => {
        this.environmentNameMap[environment.id] = environment.name;
      });
    });
    this.$watch('tagTrackingCode.site.id', (val, oldVal) => {
      if (val !== oldVal || this.firstTime) {
        this.onSiteChange();
      }
    });
  },
  methods: {
    // TODO
    onSiteChange() {
      this.installInstructions = [];
      this.containers = [];
      this.environments = [];
      this.matomoConfigs = [];
      this.idContainer = '';
      this.firstTime = false;

      if (!this.site || !this.site.id) {
        return;
      }

      this.isLoading = true;
      AjaxHelper.fetch({
        method: 'TagManager.getContainers',
        filter_limit: '-1',
        idSite: this.site.id
      }).then((containers) => {
        this.isLoading = false;
        this.containers = [];

        if (!this.containers || !containers.length) {
          this.idContainer = '';
          this.containers.push({
            key: '',
            value: this.translate('TagManager_NoContainersFound')
          });
          return;
        }

        angular.forEach(this.containers, (container) => {
          if (!this.idContainer) {
            this.idContainer = container.idcontainer;
          }

          this.containerMap[container.idcontainer] = container;
          this.containers.push({
            key: container.idcontainer,
            value: container.name
          });
        });
        this.onContainerChange();
      }, () => {
        this.isLoading = false;
      });
    },
    // TODO
    onContainerChange() {
      this.noReleaseFound = false;

      if (!this.idContainer) {
        return;
      }

      this.installInstructions = [];
      const container = this.containerMap[this.idContainer];
      const draftVersion = container.draft.idcontainerversion;
      this.environment = '';
      this.environments = [];
      angular.forEach(container.releases, (release) => {
        if (release.environment === 'live') {
          // we always prefer to pre-select the live environment
          this.environment = release.environment;
        }
      });
      angular.forEach(container.releases, (release) => {
        if (release.environment === 'preview') {
          return; // there is nothing to embed for this environment
        }

        if (!this.environment) {
          this.environment = release.environment;
        }

        const name = this.ucfirst(release.environment);

        if (release.environment in this.environmentNameMap) {
          name = this.environmentNameMap[release.environment];
        }

        this.environments.push({
          key: release.environment,
          value: name
        });
      });

      if (!this.environments.length) {
        this.noReleaseFound = true;
        this.environments.push({
          key: '',
          value: this.translate('TagManager_NoReleasesFound')
        });
      }

      this.fetchInstallInstructions();
      this.fetchVariables(draftVersion);
    },
    // TODO
    linkTo(action, idContainer, hash) {
      const currentUrl = window.location.pathname + window.location.search;
      const newUrl = Matomo.broadcast.updateParamValue('module=TagManager', currentUrl);
      newUrl = Matomo.broadcast.updateParamValue('action=' + action, newUrl);
      newUrl = Matomo.broadcast.updateParamValue('idContainer=' + this.idContainer, newUrl);

      if ('undefined' !== typeof hash && hash) {
        newUrl += '#?' + hash;
      }

      return newUrl;
    },
    // TODO
    fetchInstallInstructions() {
      this.installInstructions = {};

      if (!this.idContainer || !this.environment || !this.site || !this.site.id) {
        return;
      }

      this.isLoading = true;
      AjaxHelper.fetch({
        method: 'TagManager.getContainerInstallInstructions',
        filter_limit: '-1',
        idContainer: this.idContainer,
        environment: this.environment,
        idSite: this.site.id
      }).then((instructions) => {
        this.installInstructions = instructions;
        this.isLoading = false;
        setTimeout(() => {
          const codeBlock = $('.tagManagerTrackingCode .codeblock');
          codeBlock.effect("highlight", {}, 1500);
        });
      }, () => {
        this.isLoading = false;
      });
    },
    // TODO
    fetchVariables(containerDraftVersion) {
      this.matomoConfigs = [];

      if (!this.idContainer || !this.site || !this.site.id || !containerDraftVersion) {
        return;
      }

      AjaxHelper.fetch({
        method: 'TagManager.getContainerVariables',
        filter_limit: '-1',
        idContainer: this.idContainer,
        idContainerVersion: containerDraftVersion,
        idSite: this.site.id
      }).then((variables) => {
        this.matomoConfigs = [];
        angular.forEach(variables, (variable) => {
          if (variable.type === 'MatomoConfiguration') {
            this.matomoConfigs.push(variable);
          }
        });
      }, () => {
        this.isLoading = false;
      });
    },
  },
});
</script>
