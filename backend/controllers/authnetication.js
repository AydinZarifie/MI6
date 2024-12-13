const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {check} = require("../utils/checktoken")

exports.signup = async(req,res) => {
    
    if(req.role == 'manager'){
        try {
            const username = req.body.username;
            const password = req.body.password;
            const role = req.body.role;
        
            const passHash = await bcrypt.hash(password,12);
        
            //check username is unique
            const user = new User({
                username:username,
                password:passHash,
                role:role
            })
            //store in database
            await user.save();
            res.status(201).json({
                message:"Signup successfully"
            })
        } catch (error) {
            const err = new Error("Signup Failed");
            err.statusCode = 422;
            throw err;
        }
    }

    else{
        const err = new Error("Invalid access");
        err.statusCode = 422;
        throw err;
    }
}

exports.login = async(req,res) => {
    
    console.log("Login");
    
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.findOne({username:username});

    if(!user){
        const err = new Error("Email or password worng");
        err.statusCode = 401;
        throw err;
    }

    const isEqual = await bcrypt.compare(password,user.password);

    if(!isEqual){
        const errr = new Error("Email or password worng");
        errr.statusCode = 401;
        throw errr; 
    }

    const token = jwt.sign({username:user.username , role:user.role , userid:user._id},process.env.PRIVATE_KEY,{
        expiresIn:'1h'
    });

    res.status(200).json({
        token:token,
        userid:user._id,
        message: "Login Successfully"
    })


}

exports.getDashbord = async(req,res) => {
    const user = await User.findById({_id : req.userid});
    
    if(!user){
        const error = new Error('Invalid user');
        error.statusCode = 401;
        throw error
    }

    res.status(200).json({
        data:user
    });
}

exports.checkToken = async(req,res) =>{
    const token = req.body.token;
    const status = check(token);
    console.log(status);
    res.json(status);
}