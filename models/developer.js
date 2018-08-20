import mongoose  from 'mongoose'
const Schema = mongoose.Schema;

 const userSchema = new Schema({
    name: String,
    age:String,
    skills:String
  
});
let Model = mongoose.model('Developer', userSchema,'developers');
module.exports = Model;