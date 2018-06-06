/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

function setAdminUser()
{
    delete testEnvironment.idSitesViewAccess;
    testEnvironment.idSitesAdminAccess = [1,2,5];
    testEnvironment.save();
}

function setViewUser()
{
    delete testEnvironment.idSitesAdminAccess;
    testEnvironment.idSitesViewAccess = [1,2,5];
    testEnvironment.save();
}

function resetUser()
{
    delete testEnvironment.idSitesViewAccess;
    delete testEnvironment.idSitesAdminAccess;
    testEnvironment.save();
}

function setSuperUser()
{
    delete testEnvironment.idSitesViewAccess;
    delete testEnvironment.idSitesAdminAccess;
    testEnvironment.save();
}

exports.setAdminUser = setAdminUser;
exports.setSuperUser = setSuperUser;
exports.setViewUser = setViewUser;
exports.resetUser = resetUser;