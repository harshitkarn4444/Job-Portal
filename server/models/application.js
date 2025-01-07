const mongoose =require('mongoose')

const ApplicationSchema = new mongoose.Schema({
    name:String,
    emailid:String,
    company_chosen:String,
    position_chosen:String
})

const ApplicationModel = mongoose.model("applications",ApplicationSchema)
module.exports = ApplicationModel