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

// req is the request object, which the client sends to the server. params is an Express function, used to represent data that is passed in the URL from the client to the server. classificationId is the name that was given to the classification_id value in the inventoryRoute.js file (see line 7 of that file).

module.exports = invCont