const express = require("express")
const router = new express.Router()
const favoritesController = require("../controllers/favoritesController")
const utilities = require("../utilities")

// View all favorites (must be logged in)
// GET /favorites/
router.get("/", utilities.checkLogin, utilities.handleErrors(favoritesController.buildFavoritesList))

// Add a favorite (must be logged in)
// POST /favorites/add
router.post("/add", utilities.checkLogin, utilities.handleErrors(favoritesController.addFavorite))

// Remove a favorite (must be logged in)
// POST /favorites/remove
router.post("/remove", utilities.checkLogin, utilities.handleErrors(favoritesController.removeFavorite))

module.exports = router
