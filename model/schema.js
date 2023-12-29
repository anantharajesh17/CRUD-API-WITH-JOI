var mongoose = require("mongoose");
var schema = new mongoose.Schema({
  name: {
    type: String,
    //required: [true, "username must requried"],
    unique: true,
  },
  email: {
    type: String,
    //required:[true,'email must req']
  },
  password: {
    type: String,
    //required:[true,'password must req']
  },
  isactive: {
    type: Boolean,
  },
});
var user = new mongoose.model("User", schema);

module.exports = user;
