import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
    title:{
        type:String,
    },
    content:{
        type:String,
        required: true,
    },
},{timestamps:true});

const UserSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required:true,
    },
    notes:[noteSchema]
});

export default mongoose.model('User', UserSchema);