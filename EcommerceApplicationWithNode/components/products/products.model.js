const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const reviewSchema=new Schema({
    point:{
        type:Number,
        min:1,
        max:5,
        require:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    message:{
        type:String,
        require:true
    }
},{
    timestamps:true
})
const ProductSchema=new Schema({
    name:{
        type:String,
        require:true
    },
    category:{
        type:String,
        require:true
    },
    size:String,
    brand:String,
    image:[String],  //array of string hunxa
    price:Number,
    quantity:Number,

    status:{
        type:String,
        enum:["out of stock","available","booked"],
        default:'available'
    },
    modelNo:String,
    vendor:{
        type:Schema.Types.ObjectId, 
        ref:'user'                 

    },
    warrentyStatus:Boolean,
    warrentyPeriod:String,
    discount:{
        discountedItem:Boolean,
        discountType:{
            type:String,
            enum:["percentage","quantity","value"]
        },
        discountedvalue:String
    },
    color:String,
    isReturnEligible:Boolean,
    offer:[String],    //yo poni array of String hunxa
    tags:[String],
    manuDate:Date,
    expiryDate:Date,
    purchasedDate:Date,
    returnedDate:Date,
    salesDate:Date,
    reviews:[reviewSchema]  //array of object



},{
    timestamps:true
})
const ProductModel=mongoose.model('product',ProductSchema);
module.exports=ProductModel;