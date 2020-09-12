const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bycrypt = require('bcrypt')

const UserSchema = new Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  address: { type: Schema.Types.ObjectId, ref: "Address" },
});


UserSchema.pre("save", function (next) {
  let user = this
  if(this.isModified("password") || this.isNew){
    bycrypt.genSalt(10,function (err,salt) {
      if(err){
        return next(err)
      }
      bycrypt.hash(user.password, salt,null,function (err, hash) {
        if(err){
          return next(err)
        }

        user.password = hash
        next()
      })
    })
  }else{
    return next()
  }
})

module.exports = mongoose.model('User', UserSchema)