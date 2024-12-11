const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const missionSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
},{timestamps:true});


module.exports = mongoose.model("Mission",missionSchema);