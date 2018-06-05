/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

(function () {
    angular.module('piwikApp').controller('ContainerListController', ContainerListController);

    ContainerListController.$inject = ['$scope', 'tagManagerContainerModel', 'piwik', 'piwikApi', '$location'];

    function ContainerListController($scope, tagManagerContainerModel, piwik, piwikApi, $location) {

        this.model = tagManagerContainerModel;
        this.hasAdminAccess = piwik.tagManagerAdminAccess;

        if (this.hasAdminAccess) {
            this.containerDefaultAction = 'dashboard';
        } else {
            this.containerDefaultAction = 'manageTags';
        }

        var self = this;
        this.contexts = {};

        this.createContainer = function () {
            this.editContainer(0);
        };

        this.editContainer = function (idContainer) {
            var $search = $location.search();
            $search.idContainer = idContainer;
            $location.search($search);
        };

        this.installCode = function (idContainer) {
            tagManagerHelper.showInstallCode(idContainer);
        };

        this.deleteContainer = function (container) {
            function doDelete() {
                tagManagerContainerModel.deleteContainer(container.idcontainer).then(function () {
                    tagManagerContainerModel.reload();
                });
            }

            piwik.helper.modalConfirm('#confirmDeleteContainer', {yes: doDelete});
        };

        this.truncateText = function(text, length) {
            if (text && (text + '').length > length) {
                return String(text).substr(0, length - 3) + '...';
            }
            return text;
        };

        this.model.fetchContainers();
        this.model.fetchAvailableContexts().then(function (contexts) {
            self.contexts = {};
            angular.forEach(contexts, function (context) {
                self.contexts[context.id] = context.name;
            });
        });

    }
})();