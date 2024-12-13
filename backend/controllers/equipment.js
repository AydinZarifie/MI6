const Equipment = require("../models/equipment");
const User = require("../models/user");


exports.getEquipments = async(req, res) => {
    try {

      let eq;
      if(req.role == 'manager' || req.role == 'equipment'){
        const equipment = await Equipment.find();
        eq = equipment;
      }
      if(req.role == 'agent'){
        const equipment = await Equipment.find({username : req.username});
        eq = equipment;
      }
      if(req.role !== 'manager' && req.role !== 'agent' && req.role !== 'equipment'){
        const err = new Error("Invalid access");
        err.statusCode = 422;
        throw err;
      }
      res.status(200).json({equipment:eq})
    } catch (error) {
      res.status(422).json({ message: "Fetch mission failed" });
    }
};

exports.createEquipments = async(req, res) => {
  if(req.role == 'manager' || req.role == 'equipment'){

    const title = req.body.title;
    const username = req.body.username;
    const description = req.body.description;
  
    //check username does exist
    const isUser = await User.find({username: username});
    
    if(isUser.length == 0){
      console.log(1);
      const error = new Error('Invalid username');
      error.statusCode = 422;
      throw error;
    }
    try {
      //store in database
      const mission = new Equipment({
        title: title,
        username: username,
        description: description,
      });
      const response = await mission.save();
      res.status(201).json({
          message: "Equipment store successfully",
          result:response
        });
    } catch (error) {
      res.status(422).json({
        message: "Invalid mission data",
      });
    }
  }

  else {
    const err = new Error("Invalid access");
    err.statusCode = 422;
    throw err;
  }

};
