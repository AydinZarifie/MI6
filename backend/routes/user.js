const express = require("express");
const route = express.Router();
const authenticationController = require("../controllers/authnetication");
const isAuth = require("../middlewares/verifyToken");

route.post("/signup" ,authenticationController.signup);
route.post("/login" , authenticationController.login);
route.get("/dashboard", isAuth ,authenticationController.getDashbord);

module.exports = route;