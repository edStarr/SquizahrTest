const mongoose = require ("mongoose")

const ownerSchema = new mongoose.Schema({
    OwnerName: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Owner", ownerSchema)