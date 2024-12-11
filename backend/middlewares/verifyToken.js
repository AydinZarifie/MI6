const jwt = require('jsonwebtoken');
const { login } = require('../controllers/authnetication');

module.exports = (req,res,next) => {

    const authHeader = req.get("Authorization");
    
    if(!authHeader){
        const error = new Error('Inavlid Authorization');
        error.statusCode = 401;
        throw error;
    }    
    const token = authHeader.split(" ")[1];        
    
    let decodetoken;

    try {    
        decodetoken = jwt.verify(token,process.env.PRIVATE_KEY);       
        
        
    } catch (error) {
        error.statusCode = 402;
        throw error; 
    }

    if(!decodetoken){
        const error = new Error("Invalid token");
        error.statusCode = 402;
        throw error;
    }
    
    req.userid = decodetoken.userid;
    req.role = decodetoken.role;
    req.username = decodetoken.username;

    console.log(req.role);
    
    next();

}   