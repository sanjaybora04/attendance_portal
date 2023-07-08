const jwt = require('jsonwebtoken')
const keys = require('../config/keys')

const authCheck = (req,res,next)=>{
    try{
        const user = jwt.verify(req.headers.token,keys.jwt.secret)
        if(user){
            req.user = user
            next()
        }
        else{
            res.json({notloggedin:true})
        }
    }catch(err){
        res.json({notloggedin:true, error:err})
    }
};

module.exports=authCheck;