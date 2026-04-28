/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

function setCapabilities(capabilities)
{
    testEnvironment.testUseMockAuth = 1;
    testEnvironment.idSitesCapabilities = capabilities;
    testEnvironment.save();
}

function setAdminUser()
{
    testEnvironment.testUseMockAuth = 1;
    delete testEnvironment.idSitesViewAccess;
    delete testEnvironment.idSitesWriteAccess;
    testEnvironment.idSitesAdminAccess = [1,2,5];
    testEnvironment.save();
}

function setViewUser()
{
    testEnvironment.testUseMockAuth = 1;
    delete testEnvironment.idSitesAdminAccess;
    delete testEnvironment.idSitesWriteAccess;
    testEnvironment.idSitesViewAccess = [1,2,5];
    testEnvironment.save();
}

function setWriteUser()
{
    testEnvironment.testUseMockAuth = 1;
    delete testEnvironment.idSitesAdminAccess;
    delete testEnvironment.idSitesViewAccess;
    testEnvironment.idSitesWriteAccess = [1,2,5];
    testEnvironment.save();
}

function resetUser()
{
    testEnvironment.testUseMockAuth = 1;
    delete testEnvironment.idSitesViewAccess;
    delete testEnvironment.idSitesWriteAccess;
    delete testEnvironment.idSitesAdminAccess;
    delete testEnvironment.idSitesCapabilities;
    testEnvironment.save();
}

function setSuperUser()
{
    testEnvironment.testUseMockAuth = 1;
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
