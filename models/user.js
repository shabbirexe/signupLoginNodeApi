const mongoose=require('mongoose');
const schema=mongoose.Schema;
const userSchema=new schema({
  name:{
    type:String
  },
  email:{
    type:String
  },
  password:{
    type:String
  },
  phone:{
    type:String
  }

});

const userD = mongoose.model('loginInfo',userSchema);

module.exports = userD;
