const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.isAuthenticated = async (req, res, next) =>{
    try {
        const { token } = req.cookies;
        if(!token){
            return res.status(401).json({
                message: "Please Login first",
            });
        }

        const decoded = await jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded._id);

        next();
    } catch (error) {
       return res.status(501).json({
        success: false,
        message: error.message,
       }) 
    }
}

