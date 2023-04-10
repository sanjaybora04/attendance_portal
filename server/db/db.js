const mongoose = require('mongoose');
const keys = require('../config/keys')

const connectToMongo = ()=>{
    mongoose.connect(keys.mongodb.URI,(e)=>{
        if(e == null){
            console.log("Successfully connected to the database...");
        }
        else{
            console.log(e);
        }
        
    });
}

module.exports = connectToMongo;