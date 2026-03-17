// Needed Resources
const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")

// Route to build inventory classification page
router.get("/type/:classificationId", invController.buildByClassificationId);

// Route to build inventory detail page
router.get("/detail/:invId", invController.buildDetail);

module.exports = router;