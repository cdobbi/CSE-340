const utilities = require("../utilities")

const upgradesCont = {}

// Upgrade names and titles mapping
const upgradeDetails = {
    "flux-cap": {
        title: "Flux Capacitor",
        description: "Travel through time at 88 miles per hour!",
        image: "flux-cap.png"
    },
    "flame": {
        title: "Flame Decals",
        description: "Go faster with this hot custom flame decal package!",
        image: "flame.jpg"
    },
    "bumper-sticker": {
        title: "Bumper Stickers",
        description: "Express yourself with our custom bumper sticker collection.",
        image: "bumper_sticker.jpg"
    },
    "hub-cap": {
        title: "Hub Caps",
        description: "Premium stainless steel hub caps to complete your ride.",
        image: "hub-cap.jpg"
    }
}

/* ***************************
 *  Build upgrade page
 * ************************** */
upgradesCont.buildUpgrade = async function (req, res, next) {
    const upgradeName = req.params.upgradeName
    const upgrade = upgradeDetails[upgradeName]
    let nav = await utilities.getNav()

    if (upgrade) {
        res.render("./upgrades/upgrade", {
            title: upgrade.title,
            nav,
            upgrade,
        })
    } else {
        res.status(404).render("error", { message: "Upgrade not found", nav })
    }
}

module.exports = upgradesCont
