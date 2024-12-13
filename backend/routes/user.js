const express = require("express");
const route = express.Router();
const authenticationController = require("../controllers/authnetication");
const isAuth = require("../middlewares/verifyToken");

route.post("/signup", isAuth ,authenticationController.signup);
route.post("/login" , authenticationController.login);
route.get("/dashboard", isAuth ,authenticationController.getDashbord);
route.post("/verifytoken", authenticationController.checkToken);

module.exports = route;