const utilities = require("../utilities")
const favoritesModel = require("../models/favorites-model")

const favCont = {}

/* ***************************
 *  Add a vehicle to favorites
 *  - Gets account_id from the JWT token (res.locals.accountData)
 *  - Gets inv_id from the form submission (req.body)
 *  - Redirects back to the vehicle detail page after adding
 * ************************** */
favCont.addFavorite = async function (req, res, next) {
    const account_id = res.locals.accountData.account_id
    const { inv_id } = req.body

    // Check if already favorited (Data Validation)
    const exists = await favoritesModel.checkExistingFavorite(account_id, inv_id)
    if (exists) {
        req.flash("notice", "This vehicle is already in your favorites.")
        return res.redirect(`/inv/detail/${inv_id}`)
    }

    const result = await favoritesModel.addFavorite(account_id, inv_id)
    if (result.rowCount) {
        req.flash("notice", "Vehicle added to favorites!")
    } else {
        req.flash("notice", "Sorry, adding to favorites failed.")
    }
    res.redirect(`/inv/detail/${inv_id}`)
}

/* ***************************
 *  Remove a vehicle from favorites
 *  - Same pattern: get IDs, call model, redirect with message
 * ************************** */
favCont.removeFavorite = async function (req, res, next) {
    const account_id = res.locals.accountData.account_id
    const { inv_id } = req.body

    const result = await favoritesModel.removeFavorite(account_id, inv_id)
    if (result.rowCount) {
        req.flash("notice", "Vehicle removed from favorites.")
    } else {
        req.flash("notice", "Sorry, removing from favorites failed.")
    }
    res.redirect(`/inv/detail/${inv_id}`)
}

/* ***************************
 *  Build the "My Favorites" view
 *  - Gets all favorites for the logged-in user
 *  - Passes the data to the view for rendering
 * ************************** */
favCont.buildFavoritesList = async function (req, res, next) {
    let nav = await utilities.getNav()
    const account_id = res.locals.accountData.account_id
    const favorites = await favoritesModel.getFavoritesByAccountId(account_id)
    res.render("./favorites/list", {
        title: "My Favorites",
        nav,
        favorites,
        errors: null,
    })
}

module.exports = favCont
