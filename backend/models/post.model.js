const {Schema, model} = require('mongoose');

const postSchema = Schema({
   title : {type : String, required : true},
   description : {type: String, required : true},
   image : {type : String},
   user : {type :Schema.Types.ObjectId , ref : 'User', required : true }
})


postSchema.method('toJSON',function(){
  const {__v, ...object} = this.toObject()
  return object
})

module.exports = model('Post',postSchema);
