const express = require("express")
const router = new express.Router()
const favoritesController = require("../controllers/favoritesController")
const utilities = require("../utilities")
const favValidate = require("../utilities/favorites-validation")

// View all favorites (must be logged in)
// GET /favorites/
router.get("/", utilities.checkLogin, utilities.handleErrors(favoritesController.buildFavoritesList))

// Add a favorite (must be logged in, inv_id must be valid)
// POST /favorites/add
router.post("/add",
    utilities.checkLogin,
    favValidate.favoriteRules(),
    favValidate.checkFavoriteData,
    utilities.handleErrors(favoritesController.addFavorite)
)

// Remove a favorite (must be logged in, inv_id must be valid)
// POST /favorites/remove
router.post("/remove",
    utilities.checkLogin,
    favValidate.favoriteRules(),
    favValidate.checkFavoriteData,
    utilities.handleErrors(favoritesController.removeFavorite)
)

module.exports = router
