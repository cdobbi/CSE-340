// Needed Resources
const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")
const utilities = require("../utilities")
const invValidate = require("../utilities/inventory-validation")

// Route to build inventory management view (Employee/Admin only)
router.get("/", utilities.checkAccountType, utilities.handleErrors(invController.buildManagement));

// Route to build inventory classification page (public)
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));

// Route to build inventory detail page (public)
router.get("/detail/:invId", utilities.handleErrors(invController.buildDetail));

// Route to return inventory items as JSON (Employee/Admin only)
router.get("/getInventory/:classification_id", utilities.checkAccountType, utilities.handleErrors(invController.getInventoryJSON));

// Route to build edit inventory view (Employee/Admin only)
router.get("/edit/:inv_id", utilities.checkAccountType, utilities.handleErrors(invController.buildEditView));

// Route to build add classification view (Employee/Admin only)
router.get("/add-classification", utilities.checkAccountType, utilities.handleErrors(invController.buildAddClassification));

// Route to process add classification (Employee/Admin only)
router.post(
    "/add-classification",
    utilities.checkAccountType,
    invValidate.classificationRules(),
    invValidate.checkClassificationData,
    utilities.handleErrors(invController.addClassification)
);

// Route to build add inventory view (Employee/Admin only)
router.get("/add-inventory", utilities.checkAccountType, utilities.handleErrors(invController.buildAddInventory));

// Route to process add inventory (Employee/Admin only)
router.post(
    "/add-inventory",
    utilities.checkAccountType,
    invValidate.inventoryRules(),
    invValidate.checkInventoryData,
    utilities.handleErrors(invController.addInventory)
);

// Route to process update inventory (Employee/Admin only)
router.post(
    "/update",
    utilities.checkAccountType,
    invValidate.inventoryRules(),
    invValidate.checkUpdateData,
    utilities.handleErrors(invController.updateInventory)
);

module.exports = router;
