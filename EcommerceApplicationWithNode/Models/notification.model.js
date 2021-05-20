const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
    message:{
        type:String,
        require:true
    },
    user_id:{
        type:Schema.Types.ObjectId, //database ma baseko hex code
        ref:'user'

    },
    category:String,
    seen:{
        type:Boolean,
        default:false
    }
}, {
    timestamps: true
}

)
module.exports= mongoose.model('notification', NotificationSchema);
