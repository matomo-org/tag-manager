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
- create PR
</todo>

<template>
  <ContentBlock
    class="editTag tagManagerManageEdit"
    feature="Tag Manager"
    :content-title="editTitle"
  >
    <p v-show="model.isLoading">
      <span class="loadingPiwik"><img src="plugins/Morpheus/images/loading-blue.gif" /> {{ translate('General_LoadingData') }}</span>
    </p>
    <p v-show="model.isUpdating">
      <span class="loadingPiwik"><img src="plugins/Morpheus/images/loading-blue.gif" /> {{ translate('TagManager_UpdatingData') }}</span>
    </p>
    <form
      v-show="!chooseTagType && editTitle"
      @submit="edit ? updateTag() : createTag()"
    >
      <div>
        <div
          class="alert alert-warning"
          v-show="tag.typeMetadata.isDisabled"
        >
          {{ translate('TagManager_UseCustomTemplateCapabilityRequired', translate('TagManager_CapabilityUseCustomTemplates')) }}
        </div>
        <div>
          <Field
            uicontrol="text"
            name="type"
            v-model="tag.typeMetadata.name"
            :disabled="true"
            :inline-help="tag.typeMetadata.description + ' ' + tag.typeMetadata.help"
            :title="translate('TagManager_Type')"
          />
        </div>
        <div>
          <Field
            uicontrol="text"
            name="name"
            v-model="tag.name"
            @change="setValueHasChanged()"
            :maxlength="50"
            :title="translate('General_Name')"
            :inline-help="translate('TagManager_TagNameHelp')"
          />
        </div>
        <div
          class="form-group row"
          v-show="length(tag.typeMetadata.parameters)"
        >
          <div class="col s12">
            <h3>{{ translate('TagManager_ConfigureWhatTagDoes') }}</h3>
          </div>
        </div>
        <div v-for="parameter in tag.typeMetadata.parameters">
          <div
            :piwik-form-field="parameter"
            :all-settings="tag.typeMetadata.parameters"
          />
        </div>
        <div
          class="form-group row"
          v-show="length(tag.typeMetadata.parameters)"
        >
          <div class="col s12">
            <h3>{{ translate('TagManager_ConfigureWhenTagDoes') }}</h3>
          </div>
        </div>
        <div class="form-group row">
          <div class="col s12 m6">
            <div>
              <label for="fire_triggers">{{ translate('TagManager_FireTriggerTitle') }}</label>
              <p v-show="length(containerTriggers) == 0">
                <br />
                {{ translate('TagManager_NoTriggersFound') }}.
                <a
                  class="createNewFireTrigger"
                  @click="onCreateNewFireTrigger()"
                >{{ translate('TagManager_CreateNewTriggerNow') }}</a>
              </p>
              <div
                class="fireTrigger fireTrigger{{ index }} multiple valign-wrapper"
                v-show="length(containerTriggers)"
                v-for="(index, idTrigger) in tag.fire_triggers"
              >
                <div>
                  <Field
                    uicontrol="select"
                    name="fire_triggers"
                    class="innerFormField"
                    v-model="tag.fire_triggers.index.idtrigger"
                    @change="setValueHasChanged(); onFireTriggerChange(index)"
                    :full-width="true"
                    :options="containerTriggers"
                  />
                </div>
                <span
                  class="icon-edit valign"
                  v-show="tag.fire_triggers.index.idtrigger"
                  @click="editTrigger(tag.fire_triggers.index.idtrigger)"
                  :title="translate('General_Edit')"
                />
                <span
                  class="icon-minus valign"
                  @click="removeFireTrigger(index)"
                  v-show="!((index + 1) == (editTag.tag.fire_triggers|length))"
                  :title="translate('General_Remove')"
                />
              </div>
            </div>
          </div>
          <div class="col s12 m6">
            <div class="form-help">
              <span class="inline-help">
                {{ translate('TagManager_FireTriggerHelp', translate('TagManager_FireLimit')) }}
                <br /><br />
                <a
                  class="createFireTriggerInHelp"
                  @click="onCreateNewFireTrigger()"
                >{{ translate('TagManager_CreateNewTriggerNow') }}</a>
              </span>
            </div>
          </div>
        </div>
        <div class="form-group row">
          <div class="col s12 m6">
            <div>
              <label for="block_triggers">{{ translate('TagManager_BlockTriggerTitle') }}</label>
              <p v-show="length(containerTriggers) == 0">
                <br />
                {{ translate('TagManager_NoTriggersFound') }}.
                <a
                  class="createNewBlockTrigger"
                  @click="onCreateNewBlockTrigger()"
                >{{ translate('TagManager_CreateNewTriggerNow') }}</a>
              </p>
              <div
                class="blockTrigger blockTrigger{{ index }} multiple valign-wrapper"
                v-show="length(containerTriggers)"
                v-for="(index, trigger) in tag.block_triggers"
              >
                <div>
                  <Field
                    uicontrol="select"
                    name="block_triggers"
                    class="innerFormField"
                    v-model="tag.block_triggers.index.idtrigger"
                    @change="setValueHasChanged(); onBlockTriggerChange()"
                    :full-width="true"
                    :options="containerTriggers"
                  />
                </div>
                <span
                  class="icon-edit valign"
                  v-show="tag.block_triggers.index.idtrigger"
                  @click="editTrigger(tag.block_triggers.index.idtrigger)"
                  :title="translate('General_Edit')"
                />
                <span
                  class="icon-minus valign"
                  @click="removeBlockTrigger(index)"
                  v-show="!((index + 1) == (editTag.tag.block_triggers|length))"
                  :title="translate('General_Remove')"
                />
              </div>
            </div>
          </div>
          <div class="col s12 m6">
            <div class="form-help">
              <span class="inline-help">
                {{ translate('TagManager_BlockTriggerHelp') }}
                <br /><br />
                <a
                  class="createBlockTriggerInHelp"
                  @click="onCreateNewBlockTrigger()"
                >{{ translate('TagManager_CreateNewTriggerNow') }}</a>
              </span>
            </div>
          </div>
        </div>
        <div
          class="form-group row"
          v-show="tag.typeMetadata.hasAdvancedSettings"
        >
          <div class="col s12">
            <h3>
              <a
                href="javascript:;"
                class="showAdvancedSettings"
                v-show="!showAdvanced"
                @click="showAdvanced = true"
              >{{ translate('TagManager_ShowAdvancedSettings') }}</a>
              <a
                href="javascript:;"
                class="hideAdvancedSettings"
                v-show="showAdvanced"
                @click="showAdvanced = false"
              >{{ translate('TagManager_HideAdvancedSettings') }}</a>
            </h3>
          </div>
        </div>
        <div v-show="showAdvanced && tag.typeMetadata.hasAdvancedSettings">
          <div>
            <Field
              uicontrol="radio"
              name="fire_limit"
              v-model="tag.fire_limit"
              @change="setValueHasChanged()"
              :options="availableFireLimits"
              :title="translate('TagManager_FireLimit')"
              :inline-help="translate('TagManager_FireLimitHelp', translate('TagManager_Unlimited'), translate('TagManager_OncePage'), translate('TagManager_Once24Hours'), translate('TagManager_OnceLifetime'))"
            />
          </div>
          <div>
            <Field
              uicontrol="text"
              name="fire_delay"
              v-model="tag.fire_delay"
              @change="setValueHasChanged()"
              :maxlength="8"
              :title="translate('TagManager_FireDelay')"
              :inline-help="translate('TagManager_FireDelayHelp')"
            />
          </div>
          <div>
            <Field
              uicontrol="text"
              name="priority"
              v-model="tag.priority"
              @change="setValueHasChanged()"
              :maxlength="4"
              :title="translate('TagManager_Priority')"
              :inline-help="translate('TagManager_PriorityHelp')"
            />
          </div>
          <div class="form-group row tagStartDate">
            <div class="col s12 m6">
              <div class="row">
                <div class="col s12">
                  <label
                    for="start_date_date"
                    class="active"
                  >{{ translate('TagManager_StartDate') }}:</label>
                </div>
                <div class="col s12 m6 input-field">
                  <input
                    type="text"
                    name="start_date_date"
                    id="start_date_date"
                    class="tagStartDateInput"
                    v-model="tag.start_date_date"
                    @change="setValueHasChanged(); onAnyDateChange()"
                  >
                  </input>
                </div>
                <div class="col s12 m6 input-field">
                  <input
                    type="text"
                    name="start_date_time"
                    id="start_date_time"
                    class="tagStartTimeInput"
                    v-model="tag.start_date_time"
                    @change="setValueHasChanged(); onAnyDateChange()"
                  >
                  </input>
                </div>
              </div>
            </div>
            <div class="col s12 m6 ">
              <div class="form-help">
                <span class="inline-help">
                  <span>
                    <span v-html="$sanitize(translate('TagManager_TagStartDateHelp', '&lt;strong&gt;', '&lt;/strong&gt;'))" />
                    <br />
                    <span
                      class="currentLocalTime"
                      v-html="$sanitize(translate('TagManager_CurrentTimeInLocalTimezone', '&lt;strong&gt;', currentTime, '&lt;/strong&gt;'))"
                    />
                  </span>
                </span>
              </div>
            </div>
          </div>
          <div class="form-group row tagEndDate">
            <div class="col s12 m6">
              <div class="row">
                <div class="col s12">
                  <label
                    for="end_date_date"
                    class="active"
                  >{{ translate('TagManager_EndDate') }}:</label>
                </div>
                <div class="col s12 m6 input-field">
                  <input
                    type="text"
                    class="tagEndDateInput"
                    name="end_date_date"
                    id="end_date_date"
                    v-model="tag.end_date_date"
                    @change="setValueHasChanged(); onAnyDateChange()"
                  >
                  </input>
                </div>
                <div class="col s12 m6 input-field">
                  <input
                    type="text"
                    class="tagEndTimeInput"
                    name="end_date_time"
                    id="end_date_time"
                    v-model="tag.end_date_time"
                    @change="setValueHasChanged(); onAnyDateChange()"
                  >
                  </input>
                </div>
              </div>
            </div>
            <div class="col s12 m6">
              <div class="form-help">
                <span class="inline-help">
                  <span>
                    <span v-html="$sanitize(translate('TagManager_TagEndDateHelp', '&lt;strong&gt;', '&lt;/strong&gt;'))" />
                    <br />
                    <span
                      class="currentLocalTime"
                      v-html="$sanitize(translate('TagManager_CurrentTimeInLocalTimezone', '&lt;strong&gt;', currentTime, '&lt;/strong&gt;'))"
                    />
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div
          class="alert alert-warning"
          v-show="tag.typeMetadata.isDisabled"
        >
          {{ translate('TagManager_UseCustomTemplateCapabilityRequired', translate('TagManager_CapabilityUseCustomTemplates')) }}
        </div>
        <SaveButton
          class="createButton"
          v-show="!tag.typeMetadata.isDisabled"
          @confirm="edit ? updateTag() : createTag()"
          :disabled="model.isUpdating || !isDirty"
          :saving="model.isUpdating"
          :value="edit ? translate('CoreUpdater_UpdateTitle') : translate('TagManager_CreateNewTag')"
        >
        </SaveButton>
        <div class="entityCancel">
          <a @click="cancel()">{{ translate('General_Cancel') }}</a>
        </div>
      </div>
    </form>
    <div
      id="confirmSelectTagType"
      v-show="chooseTagType"
    >
      <ul
        class="collection with-header"
        v-for="tagCategory in availableTags"
      >
        <li class="collection-header">
          <h4>{{ tagCategory.name }}</h4>
        </li>
        <li
          class="collection-item avatar templateType{{ tagTemplate.id }}"
          @click="createTagType(tagTemplate)"
          :class="{'disabledTemplate': tagTemplate.isDisabled}"
          v-for="tagTemplate in tagCategory.types"
          :title="!tagTemplate.isDisabled ? '' : translate('TagManager_UseCustomTemplateCapabilityRequired', translate('TagManager_CapabilityUseCustomTemplates'))"
        >
          <img
            alt
            class="circle"
            :src="tagTemplate.icon"
            v-if="tagTemplate.icon"
          />
          <span class="title">{{ tagTemplate.name }}</span>
          <p v-show="tagTemplate.description">{{ tagTemplate.description }}</p>
          <span
            class="secondary-content"
            v-show="!!tagTemplate.help"
          ><i
              class="icon-help"
              :title="tagTemplate.help"
            /></span>
          </img>
        </li>
      </ul>
      <div class="entityCancel">
        <a @click="cancel()">{{ translate('General_Cancel') }}</a>
      </div>
    </div>
  </ContentBlock>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { translate, AjaxHelper, ContentBlock } from 'CoreHome';
import { Field, FormField, SaveButton } from 'CorePluginsAdmin';


interface TagEditState {
  isDirty: boolean;
  model: unknown; // TODO
  showAdvanced: boolean;
  chooseTagType: boolean;
  canUseCustomTemplates: unknown; // TODO
  availableTags: unknown[]; // TODO
  availableFireLimits: unknown[]; // TODO
  containerTriggers: unknown[]; // TODO
  currentTime: unknown|null; // TODO
}

export default defineComponent({
  props: {
    idTag: null, // TODO,
    idContainer: null, // TODO,
    idContainerVersion: null, // TODO,
    newTagType: null, // TODO,
  },
  components: {
    ContentBlock,
    Field,
    FormField,
    SaveButton,
  },
  data(): TagEditState {
    return {
      isDirty: false,
      model: tagManagerTagModel,
      showAdvanced: false,
      chooseTagType: false,
      canUseCustomTemplates: piwik.hasUserCapability('tagmanager_use_custom_templates'),
      availableTags: [],
      availableFireLimits: [],
      containerTriggers: [],
      currentTime: null,
    };
  },
  created() {
    ;
    updateAvailableTriggers();
    setCurrentTime();
    this.model.fetchAvailableFireLimits().then(function (fireLimits) {
  this.availableFireLimits = [];
  angular.forEach(fireLimits, function (fireLimit) {
    this.availableFireLimits.push({
      key: fireLimit.id,
      value: fireLimit.name
    });
  });
});
    ;
    this.$on('$destroy', function () {
  this.idTag = null;
  currentId = null;
});
    delete options1.maxDate;
    options1.minDate = new Date();
    $timeout(function () {
  $(".tagStartDateInput").datepicker(options1);
  $(".tagEndDateInput").datepicker(options2);
  $('.tagStartTimeInput').timepicker({
    timeFormat: 'H:i:s'
  });
  $('.tagEndTimeInput').timepicker({
    timeFormat: 'H:i:s'
  });
});
    this.$watch('idTag', function (newValue, oldValue) {
  if (newValue === null) {
    return;
  }

  if (newValue != oldValue || currentId === null) {
    currentId = newValue;
    init(newValue);
  }
});
  },
  methods: {
    // TODO
    prefixDateZeroIfNeeded(number) {
      var datePart = String(number);
    
      if (datePart.length === 1) {
        datePart = '0' + datePart;
      }
    
      return datePart;
    },
    // TODO
    convertLocalDateToUtc(dateTime) {
      if (dateTime) {
        dateTime = dateTime.replace(/-/g, '/');
      }
    
      try {
        var localDate = new Date(dateTime);
        var formatted = '';
        formatted += localDate.getUTCFullYear() + '-' + this.prefixDateZeroIfNeeded(localDate.getUTCMonth() + 1) + '-' + this.prefixDateZeroIfNeeded(localDate.getUTCDate());
        formatted += ' ';
        formatted += this.prefixDateZeroIfNeeded(localDate.getUTCHours()) + ':' + this.prefixDateZeroIfNeeded(localDate.getUTCMinutes()) + ':' + this.prefixDateZeroIfNeeded(localDate.getUTCSeconds());
        return formatted;
      } catch (e) {
        return dateTime;
      }
    },
    // TODO
    convertUtcToLocalDate(dateTime) {
      if (!dateTime) {
        return;
      }
    
      var isoDate = dateTime;
      var result, datePart, timePart, dateParts, timeParts, newTime;
    
      if (isoDate) {
        isoDate = (isoDate + '').replace(/-/g, '/');
    
        try {
          result = new Date(isoDate + ' UTC');
          return result;
        } catch (e) {
          try {
            result = Date.parse(isoDate + ' UTC');
            result = new Date(result);
            return result;
          } catch (ex) {
            // eg phantomjs etc
            datePart = isoDate.substr(0, 10);
            timePart = isoDate.substr(11);
            dateParts = datePart.split('/');
            timeParts = timePart.split(':');
    
            if (dateParts.length === 3 && timeParts.length === 3) {
              result = new Date(dateParts[0], dateParts[1] - 1, dateParts[2], timeParts[0], timeParts[1], timeParts[2]);
              newTime = result.getTime() + result.getTimezoneOffset() * 60000;
              result = new Date(newTime);
              return result;
            }
          }
        }
      }
    },
    // TODO
    convertUtcDateToLocalDatePart(isoDateTime) {
      var localStartDate = this.convertUtcToLocalDate(isoDateTime);
    
      if (localStartDate) {
        return localStartDate.getFullYear() + '-' + this.prefixDateZeroIfNeeded(localStartDate.getMonth() + 1) + '-' + this.prefixDateZeroIfNeeded(localStartDate.getDate());
      }
    
      var parts = isoDateTime.split(' ');
      return parts[0];
    },
    // TODO
    convertUtcDateToLocalTimePart(isoDateTime) {
      var localStartDate = this.convertUtcToLocalDate(isoDateTime);
    
      if (localStartDate) {
        return this.prefixDateZeroIfNeeded(localStartDate.getHours()) + ':' + this.prefixDateZeroIfNeeded(localStartDate.getMinutes()) + ':' + this.prefixDateZeroIfNeeded(localStartDate.getSeconds());
      }
    
      var parts = isoDateTime.split(' ');
      return parts[1];
    },
    // TODO
    enrichTemplateType(template) {
      template.isDisabled = !this.canUseCustomTemplates && template && template.isCustomTemplate;
      return template;
    },
    // TODO
    updateAvailableTriggers() {
      this.model.fetchContainerTriggers(this.idContainer, this.idContainerVersion).then(function (triggers) {
        this.containerTriggers = [];
        angular.forEach(triggers, function (trigger) {
          this.containerTriggers.push({
            key: trigger.idtrigger,
            value: trigger.name
          });
        });
      });
    },
    // TODO
    removeAnyTagNotification() {
      var notification = this.notification;
      notification.remove(notificationId);
      notification.remove('ajaxHelper');
    },
    // TODO
    showNotification(message, context) {
      var notification = this.notification;
      notification.show(message, {
        context: context,
        id: notificationId
      });
      $timeout(function () {
        notification.scrollToNotification();
      }, 200);
    },
    // TODO
    showErrorFieldNotProvidedNotification(title) {
      var message = _pk_translate('TagManager_ErrorXNotProvided', [title]);
    
      this.showNotification(message, 'error');
    },
    // TODO
    init(idTag) {
      this.create = this.idTag == '0';
      this.edit = !this.create;
      this.tag = {};
      this.chooseTagType = false;
      this.editTitle = '';
      var dereg;
    
      for (dereg = 0; dereg < deregisterWatches.length; dereg++) {
        if ('function' === typeof deregisterWatches[dereg]) {
          deregisterWatches[dereg]();
        }
      }
    
      piwik.helper.lazyScrollToContent();
      this.availableTags = [];
      this.model.fetchContainer(this.idContainer).then(function (container) {
        return this.model.fetchAvailableTags(container.context);
      }).then(function (tags) {
        angular.forEach(tags, function (tagsGroup) {
          angular.forEach(tagsGroup.types, function (tag) {
            this.enrichTemplateType(tag);
          });
        });
        this.availableTags = tags;
      }).then(function () {
        if (this.edit && this.idTag) {
          this.editTitle = translate('TagManager_EditTag');
          this.model.findTag(this.idContainer, this.idContainerVersion, this.idTag).then(function (tag) {
            if (!tag) {
              return;
            }
    
            this.tag = angular.copy(tag);
            this.tag.idcontainer = this.idContainer;
            this.tag.block_triggers = [];
            this.tag.fire_triggers = [];
    
            if (this.tag.typeMetadata) {
              this.enrichTemplateType(this.tag.typeMetadata);
            }
    
            if (angular.isArray(this.tag.block_trigger_ids)) {
              angular.forEach(this.tag.block_trigger_ids, function (id) {
                this.tag.block_triggers.push({
                  idtrigger: id
                });
              });
            }
    
            if (!this.tag.block_triggers.length) {
              this.tag.block_triggers.push({
                idtrigger: ''
              });
            }
    
            if (angular.isArray(this.tag.fire_trigger_ids)) {
              angular.forEach(this.tag.fire_trigger_ids, function (id) {
                this.tag.fire_triggers.push({
                  idtrigger: id
                });
              });
            }
    
            if (!this.tag.fire_triggers.length) {
              this.tag.fire_triggers.push({
                idtrigger: ''
              });
            }
    
            if (this.tag.start_date) {
              this.tag.start_date_date = this.convertUtcDateToLocalDatePart(this.tag.start_date);
              this.tag.start_date_time = this.convertUtcDateToLocalTimePart(this.tag.start_date);
            }
    
            if (this.tag.end_date) {
              this.tag.end_date_date = this.convertUtcDateToLocalDatePart(this.tag.end_date);
              this.tag.end_date_time = this.convertUtcDateToLocalTimePart(this.tag.end_date);
            }
    
            this.addParameterWatch();
            this.onFireTriggerChange();
            this.onBlockTriggerChange();
            this.isDirty = false;
          });
        } else if (this.create) {
          this.editTitle = translate('TagManager_ChooseTagToContinue');
          this.chooseTagType = true;
        }
      });
    },
    // TODO
    addParameterWatch() {
      var index;
    
      if (this.tag.typeMetadata && this.tag.typeMetadata.parameters) {
        for (index = 0; index < this.tag.typeMetadata.parameters.length; index++) {
          deregisterWatches.push(this.$watch('editTag.tag.typeMetadata.parameters[' + index + '].value', function (val, oldVal) {
            if (val !== oldVal) {
              this.isDirty = true;
            }
          }));
        }
      }
    },
    // TODO
    onCreateNewBlockTrigger(callback) {
      this.openEditTrigger(function (trigger) {
        var indexLastEntry = this.tag.block_triggers.length - 1;
    
        if (!this.tag.block_triggers[indexLastEntry] || !this.tag.block_triggers[indexLastEntry].idtrigger) {
          this.tag.block_triggers[indexLastEntry] = {
            idtrigger: trigger.idtrigger
          };
        } else {
          this.tag.block_triggers.push({
            idtrigger: trigger.idtrigger
          });
        }
    
        this.onBlockTriggerChange();
      }, 0);
    },
    // TODO
    onCreateNewFireTrigger() {
      this.openEditTrigger(function (trigger) {
        var indexLastEntry = this.tag.fire_triggers.length - 1;
    
        if (!this.tag.fire_triggers[indexLastEntry] || !this.tag.fire_triggers[indexLastEntry].idtrigger) {
          this.tag.fire_triggers[indexLastEntry] = {
            idtrigger: trigger.idtrigger
          };
        } else {
          this.tag.fire_triggers.push({
            idtrigger: trigger.idtrigger
          });
        }
    
        this.onFireTriggerChange();
      }, 0);
    },
    // TODO
    editTrigger(idTrigger) {
      this.openEditTrigger(function (trigger) {//
      }, idTrigger);
    },
    // TODO
    openEditTrigger(callback, idTag) {
      tagManagerHelper.editTrigger(this, this.idContainer, this.idContainerVersion, this.idTag, function (trigger) {
        this.updateAvailableTriggers();
        callback(trigger);
      });
    },
    // TODO
    onBlockTriggerChange() {
      var hasAll = true;
      angular.forEach(this.tag.block_triggers, function (trigger) {
        if (!trigger || !trigger.idtrigger) {
          hasAll = false;
        }
      });
    
      if (hasAll) {
        this.addBlockTrigger();
      }
    },
    // TODO
    addBlockTrigger() {
      this.tag.block_triggers.push({
        idtrigger: ''
      });
      this.isDirty = true;
    },
    // TODO
    removeBlockTrigger(index) {
      if (index > -1) {
        var lastIndex = this.tag.block_triggers.length - 1;
    
        if (lastIndex === index) {
          this.tag.block_triggers[index] = {
            idtrigger: ''
          };
        } else {
          this.tag.block_triggers.splice(index, 1);
        }
    
        this.isDirty = true;
      }
    },
    // TODO
    onFireTriggerChange() {
      var hasAll = true;
      angular.forEach(this.tag.fire_triggers, function (trigger) {
        if (!trigger || !trigger.idtrigger) {
          hasAll = false;
        }
      });
    
      if (hasAll) {
        this.addFireTrigger();
      }
    },
    // TODO
    addFireTrigger() {
      this.tag.fire_triggers.push({
        idtrigger: ''
      });
      this.isDirty = true;
    },
    // TODO
    removeFireTrigger(index) {
      if (index > -1) {
        var lastIndex = this.tag.fire_triggers.length - 1;
    
        if (lastIndex === index) {
          this.tag.block_triggers[index] = {
            idtrigger: ''
          };
        } else {
          this.tag.fire_triggers.splice(index, 1);
        }
    
        this.isDirty = true;
      }
    },
    // TODO
    createTagType(tagTemplate) {
      if (tagTemplate && tagTemplate.isDisabled) {
        return;
      }
    
      this.chooseTagType = false;
      this.editTitle = translate('TagManager_CreateNewTag');
      this.tag = {
        idSite: piwik.idSite,
        name: this.model.suggestNameForType(tagTemplate.name),
        type: tagTemplate.id,
        idcontainer: this.idContainer,
        idcontainerversion: this.idContainerVersion,
        parameters: {},
        fire_limit: 'unlimited',
        priority: 999,
        fire_delay: 0,
        block_triggers: [{
          idtrigger: ''
        }],
        fire_triggers: [{
          idtrigger: ''
        }],
        typeMetadata: tagTemplate
      };
      this.addParameterWatch();
      this.isDirty = false;
      $timeout(function () {
        var editTag = $('.editTag');
    
        if (editTag.length && editTag[0]) {
          editTag[0].scrollIntoView();
        }
    
        $('.editTag #name').focus();
      }, 1);
    },
    // TODO
    cancel() {
      this.idTag = null;
      currentId = null;
      var $search = $location.search();
      delete $search.idTag;
      $location.search($search);
    },
    // TODO
    onAnyDateChange() {
      if (this.tag.start_date_date) {
        if (!this.tag.start_date_time) {
          this.tag.start_date_time = '00:00:00';
        }
    
        this.tag.start_date = this.convertLocalDateToUtc(this.tag.start_date_date + ' ' + this.tag.start_date_time);
      } else {
        this.tag.start_date = null;
      }
    
      if (this.tag.end_date_date) {
        if (!this.tag.end_date_time) {
          this.tag.end_date_time = '23:59:59';
        }
    
        this.tag.end_date = this.convertLocalDateToUtc(this.tag.end_date_date + ' ' + this.tag.end_date_time);
      } else {
        this.tag.end_date = null;
      }
    },
    // TODO
    createTag() {
      this.removeAnyTagNotification();
    
      if (!this.checkRequiredFieldsAreSet) {
        return;
      }
    
      this.isUpdating = true;
      tagManagerTagModel.createOrUpdateTag(this.tag, 'TagManager.addContainerTag').then(function (response) {
        this.isUpdating = false;
    
        if (!response || response.type === 'error' || !response.response) {
          return;
        }
    
        this.isDirty = false;
        var this.idTag = response.response.value;
        tagManagerTagModel.reload(this.idContainer, this.idContainerVersion).then(function () {
          var $search = $location.search();
          $search.idTag = this.idTag;
          $location.search($search);
          $timeout(function () {
            this.showNotification(translate('TagManager_CreatedX', translate('TagManager_Tag')) + ' ' + translate('TagManager_WantToDeployThisChangeCreateVersion', '<a onclick="tagManagerHelper.createNewVersion()">', '</a>'), response.type);
          }, 200);
        });
      }, function () {
        this.isUpdating = false;
      });
    },
    // TODO
    setValueHasChanged() {
      this.isDirty = true;
    },
    // TODO
    updateTag() {
      this.removeAnyTagNotification();
    
      if (!this.checkRequiredFieldsAreSet) {
        return;
      }
    
      this.isUpdating = true;
      tagManagerTagModel.createOrUpdateTag(this.tag, 'TagManager.updateContainerTag').then(function (response) {
        if (response.type === 'error') {
          return;
        }
    
        var this.idTag = this.tag.idtag;
        this.isDirty = false;
        this.tag = {};
        tagManagerTagModel.reload(this.idContainer, this.idContainerVersion).then(function () {
          this.init(this.idTag);
        });
        this.showNotification(translate('TagManager_UpdatedX', translate('TagManager_Tag')) + ' ' + translate('TagManager_WantToDeployThisChangeCreateVersion', '<a onclick="tagManagerHelper.createNewVersion()">', '</a>'), response.type);
      });
    },
  },
  computed: {
    // TODO
    notification() {
      var UI = require('piwik/UI');
    
      return new UI.Notification();
    },
    // TODO
    checkRequiredFieldsAreSet() {
      var title;
    
      if (!this.tag.name) {
        title = translate('General_Name');
        this.showErrorFieldNotProvidedNotification(title);
        return false;
      }
    
      if (!this.tag.fire_triggers || !this.tag.fire_triggers.length) {
        this.showNotification(translate('TagManager_TagFireTriggerRequirement'), 'error');
        return false;
      }
    
      return true;
    },
  },
});
</script>
