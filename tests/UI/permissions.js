/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

function setCapabilities(capabilities)
{
    testEnvironment.idSitesCapabilities = capabilities;
    testEnvironment.save();
}

function setAdminUser()
{
    delete testEnvironment.idSitesViewAccess;
    delete testEnvironment.idSitesWriteAccess;
    testEnvironment.idSitesAdminAccess = [1,2,5];
    testEnvironment.save();
}

function setViewUser()
{
    delete testEnvironment.idSitesAdminAccess;
    delete testEnvironment.idSitesWriteAccess;
    testEnvironment.idSitesViewAccess = [1,2,5];
    testEnvironment.save();
}

function setWriteUser()
{
    delete testEnvironment.idSitesAdminAccess;
    delete testEnvironment.idSitesViewAccess;
    testEnvironment.idSitesWriteAccess = [1,2,5];
    testEnvironment.save();
}

function resetUser()
{
    delete testEnvironment.idSitesViewAccess;
    delete testEnvironment.idSitesWriteAccess;
    delete testEnvironment.idSitesAdminAccess;
    delete testEnvironment.idSitesCapabilities;
    testEnvironment.save();
}

function setSuperUser()
{
    delete testEnvironment.idSitesViewAccess;
    delete testEnvironment.idSitesWriteAccess;
    delete testEnvironment.idSitesAdminAccess;
    delete testEnvironment.idSitesCapabilities;
    testEnvironment.save();
}

function setWritePublishUser()
{
    resetUser();
    setWriteUser();
    setCapabilities({"tagmanager_publish_live_container": [1,2,5]});
    testEnvironment.save();
}

exports.setCapabilities = setCapabilities;
exports.setAdminUser = setAdminUser;
exports.setSuperUser = setSuperUser;
exports.setWritePublishUser = setWritePublishUser;
exports.setWriteUser = setWriteUser;
exports.setViewUser = setViewUser;
exports.resetUser = resetUser;
