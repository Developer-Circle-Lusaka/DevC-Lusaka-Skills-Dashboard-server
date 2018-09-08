import mongoose  from 'mongoose'
const Schema = mongoose.Schema;

 const userSchema = new Schema({
    name: String,
    projects:[{
        title:String,
        description:String
      }],
    skills:[{
        skill:String,
        duration:String 
    }],
    image:String,
    linkdedIn:String,
    github:String,
  
});
let Model = mongoose.model('Developer', userSchema,'developers');
exports = Model;