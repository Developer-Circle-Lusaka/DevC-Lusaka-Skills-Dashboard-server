import mongoose  from 'mongoose'
const Schema = mongoose.Schema;

 const userSchema = new Schema({
    title: String,
    description:String,
    langauges:String
  
});
let Model = mongoose.model('Job', userSchema,'jobs');
module.exports = Model;