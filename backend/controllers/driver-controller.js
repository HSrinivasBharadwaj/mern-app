const Vehicle = require('../models/Vehicle');

const GetAllVehicles = async(req,res,next) => {
    try {
        const getvehicles = await Vehicle.find();
        return res.status(200).json({getvehicles})
    } catch (error) {
        return res.status(500).json({message: "Cannot able to get the vehicle details"})
    }
}

const AddVehicle = async(req,res,next) => {
    const {source, destination, weight, goodsType,truckType}=req.body;
    const vehicle = new Vehicle({
        source, destination, weight, goodsType,truckType
    }) 
    try {
        await vehicle.save();
        return res.status(201).json({message: 'Vehicle saved successfully',vehicle})
    } catch (error) {
        return res.status(500).json({message: "Cannot able to add the vehicle details"})
    }
}

const UpdateVehicle = async(req,res,next) => {
    const {id} = req.params;
    const {source, destination, weight, goodsType,truckType}=req.body;
    try {
        await Vehicle.findByIdAndUpdate(id, {
            source, destination, weight, goodsType,truckType
        })
        return res.status(201).json({message: "Vehicle has been updated"})
    } catch (error) {
        return res.status(500).json({message: "Cannot able to add the vehicle details"})
    }
}

const DeleteVehicle = async(req,res,next) => {
    const {id} = req.params;
    try {
        await Vehicle.findByIdAndDelete(id);
        return res.status(201).json({message: "Vehicle deleted successfully"})
    } catch (error) {
        return res.status(500).json({message: "Cannot able to add the vehicle details"})
    }
}

const MarkedVehicle = async (req, res, next) => {
    const { id } = req.params;
    const { status } = req.body;  

    try {
        await Vehicle.findByIdAndUpdate(id, { status: status });
        return res.status(200).json({ message: `Vehicle status updated to ${status}` });
    } catch (error) {
        return res.status(500).json({ message: "Error while updating vehicle status" });
    }
}


const GetVehiclesByLocation = async(req,res,next) => {
    const {source,destination} = req.query;
    try {
        const vehicles = await Vehicle.find({
            source: source,
            destination: destination,
            booked:false
        })
        console.log("vehicles",vehicles)
        return res.status(200).json(vehicles);
    } catch (error) {
        return res.status(500).json({message: "Error while fetching details"})
    }
}


const GetBookedVehicles = async (req, res, next) => {
    try {
        const bookedVehicles = await Vehicle.find({ booked: true });
        res.status(200).json({ bookedVehicles });
    } catch (error) {
        res.status(500).json({ message: "Error while fetching booked vehicles" });
    }
};

exports.GetAllVehicles=GetAllVehicles
exports.AddVehicle=AddVehicle
exports.UpdateVehicle=UpdateVehicle
exports.DeleteVehicle=DeleteVehicle
exports.MarkedVehicle=MarkedVehicle
exports.GetVehiclesByLocation=GetVehiclesByLocation
exports.GetBookedVehicles=GetBookedVehicles


