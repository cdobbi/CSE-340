const invModel = require("../models/inventory-model")
const utilities = require("../utilities")

const invCont = {}

/* ***************************
 *  Build inventory classification page
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
    const classification_id = req.params.classificationId
    const data = await invModel.getInventoryByClassificationId(classification_id)
    const grid = await utilities.buildClassificationGrid(data)
    let nav = await utilities.getNav()
    const className = data[0].classification_name
    res.render("./inventory/classification", {
        title: className + " vehicles",
        nav,
        grid,
    })
}

/* ***************************
 *  Build inventory detail page
 * ************************** */
invCont.buildDetail = async function (req, res, next) {
    const inv_id = req.params.invId
    const data = await invModel.getInventoryById(inv_id)
    let nav = await utilities.getNav()
    if (data.length > 0) {
        const detail = utilities.buildVehicleDetail(data[0])
        res.render("./inventory/detail", {
            title: data[0].inv_make + " " + data[0].inv_model,
            nav,
            detail,
        })
    } else {
        res.status(404).render("error", { message: "vehicle not found", nav })
    }
}

/* ***************************
 *  Build inventory management view
 * ************************** */
invCont.buildManagement = async function (req, res, next) {
    let nav = await utilities.getNav()
    res.render("./inventory/management", {
        title: "Vehicle Management",
        nav,
        errors: null,
    })
}

/* ***************************
 *  Build add classification view
 * ************************** */
invCont.buildAddClassification = async function (req, res, next) {
    let nav = await utilities.getNav()
    res.render("./inventory/add-classification", {
        title: "Add New Classification",
        nav,
        errors: null,
    })
}

/* ***************************
 *  Process add classification
 * ************************** */
invCont.addClassification = async function (req, res) {
    const { classification_name } = req.body
    const result = await invModel.addClassification(classification_name)

    if (result.rowCount) {
        let nav = await utilities.getNav()
        req.flash("notice", `The "${classification_name}" classification was successfully added.`)
        res.status(201).render("inventory/management", {
            title: "Vehicle Management",
            nav,
            errors: null,
        })
    } else {
        let nav = await utilities.getNav()
        req.flash("notice", "Sorry, adding the classification failed.")
        res.status(501).render("inventory/add-classification", {
            title: "Add New Classification",
            nav,
            errors: null,
            classification_name,
        })
    }
}

module.exports = invCont