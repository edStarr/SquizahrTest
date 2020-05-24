const express = require ("express")
const router = express.Router()
const Owner = require ("../models/owner")

//AllOwners

router.get("/", async (req, res) => {
    let searchOptions = {}
    if (req.query.OwnersName != null && req.query.OwnersName !== "") {
        searchOptions.OwnersName = new RegExp(req.query.OwnersName, "i")
    }
    try {
        const owners = await Owner.find({searchOptions})  
        res.render("owners/index", {
            owners: owners,
            searchOptions: req.query })
    } catch {
        res.redirect("/")
    }
})


//New owner

router.get("/new", (req, res) => {
    res.render("owners/new", { owner: new Owner() })
})


// Create new owner

router.post("/", async (req, res) => {
    const owner = new Owner({
        OwnersName: req.body.OwnersName
    })
    try{
        const newOwner = await owner.save()
        //res.redirect(`owners/${newOwner.id}`)
        res.redirect("owners")
    } catch {
        res.render("owners/new", {
          owner: owner,
          errorMessage: "oh dear, looks like we couldn't create that owner"
        })
    }
})


module.exports = router