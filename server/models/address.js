const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
    user: {type:Schema.Types.ObjectId,ref:"User"},
    country: String,
    city: String,
    state:String,
    zipCode: Number,
    streetAddress:String,
    fullName: String,
    phoneNumber:String,
    deliverInstructions:String,
    securityCode:String

});

module.exports = mongoose.model("Address", AddressSchema);
