const mongoose=require('mongoose');
const { CONXN_URL } = require('./configs/db.config');
const db_config=require('./configs/db.config');

let conxn_url=  db_config.CONXN_URL + "/" + db_config.DB_NAME;
// mongo "mongodb+srv://ecommerce.hvvfx.mongodb.net/myFirstDatabase" --username PRASHANT
if(process.env.REMOTE){
    conxn_url =  "mongodb+srv://PRASHANT:PRASHANT@123GO@ecommerce.hvvfx.mongodb.net/Ecommerce?retryWrites=true&w=majority";
}
console.log('connection url value ',conxn_url)
mongoose.connect(process.env.MONGODB_URI|| conxn_url,{
useUnifiedTopology:true,useNewUrlParser:true
},function(err,done){
    if(err){
        console.log('database connection failed');
    }
    else{
        console.log('db connection successfully');
    }
})