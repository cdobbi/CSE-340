const express = require("express")
const router = new express.Router()
const upgradesController = require("../controllers/upgradesController")

// Route for upgrade pages
router.get("/:upgradeName", upgradesController.buildUpgrade);

module.exports = router;
