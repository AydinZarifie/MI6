const { validationResult } = require("express-validator");
const Mission = require("../models/mission");
const User = require("../models/user");

exports.createMission = async (req, res) => {
    if(req.role == 'manager'){
      //store in database
      const title = req.body.title;
      const username = req.body.username;
      const description = req.body.description;
      
      const isUser = await User.find({username : username});
      
      if(isUser.length == 0){
        const error = new Error("Invalid user");
        error.statusCode = 422;
        throw error;
      }

      const mission = new Mission({
        title: title,
        username: username,
        description: description,
      });
  
      await mission.save();
   
  
      res.status(201).json({
        message: "Mission store successfully",
      });
    }
    else{
      const error = new Error('Invalid access');
      error.statusCode = 422;
      throw error;
    }
}

exports.getMissions = async (req, res) => {
  try {
    let user;
    console.log(req.role);
    
    if(req.role == 'manager' || req.role == 'analysis'){      
      const mission = await Mission.find();
      user = mission;
    }
    if(req.role == 'agent'){
      const  mission = await Mission.find({username : req.username});
      user = mission;
    }
    if(req.role !== 'manager' && req.role !== 'agent' && req.role !== 'analysis'){   
      const error = new Error("Invalid user access");
      error.status = 401;
      throw error
    }

    console.log(3);
    res
      .status(200)
      .json({ message: "Fetch mission successfully", mission: user });
  } catch (error) {
    res.status(422).json({ message: "Fetch mission failed" });
  }
};
