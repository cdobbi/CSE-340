const { body, validationResult } = require("express-validator")
const validate = {}

/*  **********************************
 *  Favorite Data Validation Rules
 *  - inv_id must exist and be a positive integer
 *  - This prevents someone from submitting text, negative numbers,
 *    or other garbage as a vehicle ID
 * ********************************* */
validate.favoriteRules = () => {
    return [
        body("inv_id")
            .trim()
            .isInt({ min: 1 })
            .withMessage("A valid vehicle ID is required."),
    ]
}

/* ******************************
 * Check data and return errors or continue
 * - If validation fails, redirect back with a flash message
 * - If validation passes, call next() to continue to the controller
 * ***************************** */
validate.checkFavoriteData = (req, res, next) => {
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        req.flash("notice", "Invalid vehicle selection.")
        return res.redirect("back")
    }
    next()
}

module.exports = validate
