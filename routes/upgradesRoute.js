// Needed Resources
const express = require("express")
const router = new express.Router()
const upgradesController = require("../controllers/upgradesController")

// Route to build upgrades page
router.get("/:upgradeName", upgradesController.buildUpgrade);

module.exports = router;
