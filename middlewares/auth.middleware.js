var jwt = require('jsonwebtoken');

const auth = (req,res,next)=>{
    const token = req.headers.authorization.split(" ")[1]
    try {
        if(token){
            var decoded = jwt.verify(token, 'sb143');
            if(decoded){
                req.body.userID=decoded.userID
                next()
            }else{
                res.status(400).send({"msg":"Login is required"})
            }
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports={auth}