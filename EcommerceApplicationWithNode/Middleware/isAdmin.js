module.exports=
    function(req,res,next){
        if(req.query.role=='admin'){
            next();
        }
        else{
            next({
                msg:"you dont have access",
                status:403
            })
        }
    }

// 401unathorize 403 forbidden