// Needed Resources
const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")
const utilities = require("../utilities")

// Route to build inventory management view
router.get("/", utilities.handleErrors(invController.buildManagement));

// Route to build inventory classification page
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));

// Route to build inventory detail page
router.get("/detail/:invId", utilities.handleErrors(invController.buildDetail));

module.exports = router;
