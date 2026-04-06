const regValidate = require('../utilities/account-validation')

const express = require("express")
const router = new express.Router()
const utilities = require("../utilities")
const accountController = require("../controllers/accountController")


// Default account management view
router.get("/", utilities.checkLogin, utilities.handleErrors(accountController.buildAccountManagement))

// Logout
router.get("/logout", utilities.handleErrors(accountController.accountLogout))

router.get("/login", utilities.handleErrors(accountController.buildLogin))
router.get("/register", utilities.handleErrors(accountController.buildRegister))
// Process the registration data
router.post('/register', regValidate.registationRules(), regValidate.checkRegData, utilities.handleErrors(accountController.registerAccount))

// Process the login attempt
router.post(
    "/login",
    regValidate.loginRules(),
    regValidate.checkLoginData,
    utilities.handleErrors(accountController.accountLogin)
)

// Process account update
router.post(
    "/update-account",
    utilities.checkLogin,
    regValidate.updateAccountRules(),
    regValidate.checkUpdateData,
    utilities.handleErrors(accountController.updateAccount)
)

// Process password update
router.post(
    "/update-password",
    utilities.checkLogin,
    regValidate.updatePasswordRules(),
    regValidate.checkUpdateData,
    utilities.handleErrors(accountController.updatePassword)
)

module.exports = router;
