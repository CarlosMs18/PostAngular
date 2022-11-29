const {Schema, model} = require('mongoose');

const userSchema = Schema({
   nombre : {type : String, required : true},
   email : {type : String, required : true},
   password : {type :String, required : true}
})


userSchema.method('toJSON', function(){
  const {__v, _id , password , ...object} = this.toObject();
  object.uid = _id;
  return object;
})



module.exports = model('User',userSchema);
