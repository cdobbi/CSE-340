const express = require("express")
const router = new express.Router()
const upgradesController = require("../controllers/upgradesController")
const utilities = require("../utilities")

// Route for upgrade pages
router.get("/:upgradeName", utilities.handleErrors(upgradesController.buildUpgrade));

module.exports = router;
