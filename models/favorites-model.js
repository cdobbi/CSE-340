const pool = require("../database/")

/* *****************************
 *  Add a favorite
 *  - Uses a parameterized query ($1, $2) to prevent SQL injection
 *  - Returns the new row so the controller knows it worked
 * ***************************** */
async function addFavorite(account_id, inv_id) {
    try {
        const sql = "INSERT INTO favorites (account_id, inv_id) VALUES ($1, $2) RETURNING *"
        return await pool.query(sql, [account_id, inv_id])
    } catch (error) {
        return error.message
    }
}

/* *****************************
 *  Remove a favorite
 *  - Deletes based on BOTH account_id AND inv_id
 *  - This ensures a user can only remove their OWN favorites
 * ***************************** */
async function removeFavorite(account_id, inv_id) {
    try {
        const sql = "DELETE FROM favorites WHERE account_id = $1 AND inv_id = $2 RETURNING *"
        return await pool.query(sql, [account_id, inv_id])
    } catch (error) {
        return error.message
    }
}

/* *****************************
 *  Get all favorites for a specific user
 *  - JOINs with inventory table so we get vehicle details (make, model, price, etc.)
 *  - This is like asking: "Show me all the vehicles this user has favorited"
 * ***************************** */
async function getFavoritesByAccountId(account_id) {
    try {
        const sql = `SELECT f.favorite_id, f.inv_id, f.date_added, 
            i.inv_make, i.inv_model, i.inv_year, i.inv_price, i.inv_thumbnail 
            FROM favorites AS f 
            JOIN inventory AS i ON f.inv_id = i.inv_id 
            WHERE f.account_id = $1 
            ORDER BY f.date_added DESC`
        const result = await pool.query(sql, [account_id])
        return result.rows
    } catch (error) {
        console.error("getFavoritesByAccountId error: " + error)
        return []
    }
}

/* *****************************
 *  Check if a specific vehicle is already favorited by a user
 *  - Returns the count (0 or 1)
 *  - Used to show "Add" vs "Remove" button on the detail page
 * ***************************** */
async function checkExistingFavorite(account_id, inv_id) {
    try {
        const sql = "SELECT * FROM favorites WHERE account_id = $1 AND inv_id = $2"
        const result = await pool.query(sql, [account_id, inv_id])
        return result.rowCount
    } catch (error) {
        return error.message
    }
}

module.exports = { addFavorite, removeFavorite, getFavoritesByAccountId, checkExistingFavorite }
