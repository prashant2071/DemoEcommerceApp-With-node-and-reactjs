const mongoose=require('mongoose');
const db_config=require('./configs/db.config');

mongoose.connect(db_config.CONXN_URL+"/"+db_config.DB_NAME,{
useUnifiedTopology:true,useNewUrlParser:true
},function(err,done){
    if(err){
        console.log('database connection failed');
    }
    else{
        console.log('db connection successfully');
    }
})