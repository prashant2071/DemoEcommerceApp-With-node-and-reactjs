const mongodb=require('mongodb')
const Mongo_Client=mongodb.MongoClient;
const CONXN_URL='mongodb://localhost:27017'
const DB_NAME='Ecommerce';
const oid=mongodb.ObjectID;

module.exports={
    MongoClient:Mongo_Client,
    CONXN_URL:CONXN_URL,
    DB_NAME:DB_NAME,
    OID:oid
}