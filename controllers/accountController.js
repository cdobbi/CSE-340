const utilities = require("../utilities")

/* * ***********************
* Deliver login view
* *********************** */
async function buildLogin(req, res, next) {
    res.render("account/login", {
        title: "Login",
        nav,
    })
}

module.exports = { buildLogin }
