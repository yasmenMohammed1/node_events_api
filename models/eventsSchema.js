const mongoose=require("mongoose");
const schema=new mongoose.Schema({
    _id:Number,
    title:{type:String},

    mainSpeaker:{type:Number,ref:"Speakers"},
    students:[{type:Number,ref:"Students"}],
    speakers:[{type:Number,ref:"Speakers"}],
 
})
module.exports=mongoose.model("Events",schema)