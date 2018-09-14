import mongoose  from 'mongoose'
const Schema = mongoose.Schema;

 const developerSchema = new Schema({
    name: String,
    email:String,
    projects:[{
        title:String,
        description:String
      }],
    skills:[{
        skill:String,
        rating:Number 
    }],
    profile_img:String,
    linkdedIn:String,
    github:String,
    website:String,
    twitter:String,
    facebook:String,
    bio:String,
    password:String
  
});
let Model = mongoose.model('Developer', developerSchema,'developers');
module.exports = Model;