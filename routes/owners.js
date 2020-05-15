const express = require ("express")
const router = express.Router()
const Owner = require ("../models/owner")

//AllOwners

router.get("/", (req, res) => {
    res.render("owners/index")
})


//New owner

router.get("/new", (req, res) => {
    res.render("owners/new", { owner: new Owner() })
})


// Create new owner

router.post("/", (req, res) => {
    const owner = new Owner({
        OwnersName: req.body.OwnersName
    })
    owner.save((err, newOwner) =>{
        if (err) {
            res.render("owners/new", {
                owner: owner,
                errorMessage: "oh dear, looks like we couldn't create that owner"
            })
        } else {
            // res.redirect(`owners/${newOwner.id}`)
            res.redirect(`owners`)
        }
    })
})


module.exports = router