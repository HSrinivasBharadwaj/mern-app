const express = require('express');
const {GetBookedVehicles,GetAllVehicles,AddVehicle,DeleteVehicle,UpdateVehicle,MarkedVehicle,GetVehiclesByLocation} = require('../controllers/driver-controller');

const vehicleRouter = express.Router();

vehicleRouter.get("/", GetAllVehicles)
vehicleRouter.post("/", AddVehicle)
vehicleRouter.delete("/:id", DeleteVehicle)
vehicleRouter.put("/:id", UpdateVehicle)
vehicleRouter.put("/book/:id", MarkedVehicle); 
vehicleRouter.get("/location",GetVehiclesByLocation)
vehicleRouter.get("/booked-vehicles",GetBookedVehicles)

module.exports = vehicleRouter;