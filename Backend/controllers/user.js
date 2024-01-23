const User = require("../models/User");
const JWT_SECRET = process.env.JWT_SECRET ;
const jwt = require('jsonwebtoken');

exports.register = async (req, res) =>{
    try {
        const { email, password } = req.body;
    
        let user = await User.findOne({ email });
        if (user)
          return res.status(404).json({
            success: false,
            message: "User already exists!",
          });
       
        user = await User.create({
          email,
          password
        });
        
        //console.log(user);
    
        const token = jwt.sign({ id: user._id }, JWT_SECRET)


        const cookieOptions = {
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        };
    
        res.status(201).cookie("token", token, cookieOptions).json({
          success: true,
          message: "User Registered Successfully",
          user,
          token,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
}

exports.login = async (req, res)=>{
    try{
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if(!user || user.password!==password){
            return res.status(404).json({
                success: false,
                message: "Invalid Credintials! Try Again",
              });
        }
        

        const token = jwt.sign({_id: user._id}, JWT_SECRET);

        const cookieOptions = {
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            httpOnly: true,
          };
      
          res.status(200).cookie("token", token, cookieOptions).json({
            success: true,
            user,
            token,
          });
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message,
          });
    }
}

exports.logout = async (req, res) => {
    try {
        res
          .status(200)
          .cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
          })
          .json({
            success: true,
            message: "Logged Out!",
          });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
}