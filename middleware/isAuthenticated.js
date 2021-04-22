const User = require("../models/user.model")

const isAuthenticated = async (req, res, next) => {
    const {authToken} = req.headers
    if(authToken){
        try{
            const user = await User.findById(authToken)
            if (user) {
                req.user = user;
                next()
            } else {
                return res.status(401).json({success: false, message:"Invalid Auth Token"})
            }
        } catch(err) {
            return res.status(403).json({success: false, errorMessage: err})
        }
    } else{
        return res.status(401).json({success:false, message:"User Not Logged In"})
    }
}

module.exports = { isAuthenticated }