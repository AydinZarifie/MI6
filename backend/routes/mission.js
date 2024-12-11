const express = require("express");
const route = express.Router();
const missionController = require("../controllers/mission");
const isAuth = require("../middlewares/verifyToken")
const {body} = require('express-validator')

route.get("/get_missions",isAuth,missionController.getMissions);
route.post("/create_mission",isAuth,missionController.createMission);


module.exports = route; 