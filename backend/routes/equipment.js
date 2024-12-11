const express = require("express");
const route = express.Router();
const equipmentController = require("../controllers/equipment");
const isAuth = require("../middlewares/verifyToken");


route.get('/get_equipments',isAuth,equipmentController.getEquipments);
route.post('/create_equipment', isAuth ,equipmentController.createEquipments);


module.exports = route;