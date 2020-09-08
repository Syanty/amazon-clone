const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  
  type: {type:String, unique:true, required:true},
  
});

module.exports = mongoose.Schema("Category", CategorySchema);
