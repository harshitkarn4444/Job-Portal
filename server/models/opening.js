const mongoose =require('mongoose')

const OpeningSchema = new mongoose.Schema({
    company_name:String,
    position:String,
    skills:String,
    salary:String
})

const OpeningModel = mongoose.model("openings",OpeningSchema)
module.exports = OpeningModel