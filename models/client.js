import mongoose, { Schema } from "mongoose";

const clientSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true,index:true},
    phone:{type:String,required:true,unique:true},
    providers:[
        {_id:{type:mongoose.Schema.Types.ObjectId,ref:'Provider'}},
    ],
})

export default mongoose.model('Client',clientSchema)