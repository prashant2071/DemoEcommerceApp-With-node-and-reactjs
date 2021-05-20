module.exports = 
    function(req, res, next) {
        if (req.query.ticket == "something") {
            next();
        }
        else {
            next({
                msg: "Invalid token",
                status: 400
            })
        }
    }