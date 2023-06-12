const userModel = require('../models/userModels');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


const registerController = async (req,res) => {
   try {
    const exisitinguser = await userModel.findOne({email:req.body.email});
    if(exisitinguser){
        return res.status(200).send({message:"User already exists", success: false});
    }
    const  Password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(Password, salt);
    req.body.password = hashedPassword;
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).send({message:"User created successfully", success: true});
    
    
    
   } catch (error) {
     console.log(error);
     return res.status(500).send({success :false,message : `register controller ${error.message}`});
   }
};
const loginController = async (req,res) => {
    try {
      const user = await userModel.findOne({email:req.body.email});
      if(!user){
        res.status(200).send({message :`user not found` , success:false})
      }
      const isMatch = await bcrypt.compare(req.body.password,user.password);
      if(!isMatch){
        res.status(200).send({message :`Invalid Email or Password`, success : false})
      }
      const token = jwt.sign({_id:user._id},process.env.JWT_SECRET_KEY,{expiresIn :'1d'});
      res.status(200).send({message:'Login Success',success:true,token});
      return true;

    } catch (error) {
        console.log(error);
        res.status(500).send({message :`Error in Login Ctrl ${error.message}`});
    }
};
const authController = async (req,res) => {
    try {
      
    const user = await userModel.findOne(req.body.userId);
     
      if (!user) {
        return res.status(200).send({
          message: "User not found",
          success: false
        });
      }else{
        res.status(200).send({
        success : true,
        data:{
          name : user.name,
          email : user.email
        }
        });
      }
      
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message:'Auth error',
        success:false
      })
    }
};


module.exports = {loginController,registerController,authController}; 