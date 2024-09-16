const Goods = require('../models/Goods');

//Get all the goods
const GetGoods = async(req,res,next) => {
    try {
        const goods = await Goods.find();
        res.status(200).json({goods})
    } catch (error) {
        res.status(500).json({message: "Error while fetching all the goods"})
    }
}

const GetGoodsById = async(req,res,next) => {
    const {id} = req.params;
    try {
        const goods = await Goods.findById(id);
        res.status(200).json(goods)
    } catch (error) {
        res.status(500).json({message: "Error while fetching the independent good"})
    }
}

//Create Goods function
const AddGoods = async (req,res,next) => {
    const {source, destination, weight, kilometres, goodsType, truckType}=req.body;
    const weightNum = parseFloat(weight);
    const kilometersNum = parseFloat(kilometres);
    const goods = new Goods({
        source,
        destination,
        weight: weightNum,
        kilometres: kilometersNum,
        goodsType,
        truckType
    })
    try {
        await goods.save();
        return res.status(201).json({message: "Goods added successfully",goods})
    } catch (error) {
        return res.status(500).json({message: "Cannot add goods, please try again"})
    }
}

//Delete Goods function
const DeleteGoods = async(req,res,next) => {
    const {id} = req.params;
    try {
        await Goods.findByIdAndDelete(id);
        return res.status(200).json({message: "Goods deleted successfully"})
    } catch (error) {
        return res.status(500).json({message: "Cannot delete goods, please try again"})
    }
}

//Update Goods function
const UpdateGoods = async (req,res,next) => {
    const {id} = req.params;
    const {source, destination, weight, kilometers, goodsType, truckType}=req.body;
    try {
        await Goods.findByIdAndUpdate(id,{
           source, destination, weight, kilometers, goodsType, truckType
        });
        return res.status(200).json({message: "Goods Updated successfully"})
    } catch (error) {
        return res.status(500).json({message: "Cannot Update goods, please try again"})
    }
}

const MarkedGoods = async (req, res, next) => {
    const { id } = req.params;
    const { status } = req.body;  

    try {
        await Goods.findByIdAndUpdate(id, { status: status });
        return res.status(200).json({ message: `Goods status updated to ${status}` });
    } catch (error) {
        return res.status(500).json({ message: "Error while updating goods status" });
    }
}



//Get Goods By Location
const GetGoodsByLocation = async(req,res,next) => {
    const {source,destination} = req.query;
    console.log("source",source);
    console.log("destination",destination)
    try {
       const goods = await Goods.find({
            source:source,
            destination:destination,
            booked:false

        })
        console.log("goods",goods)
        return res.status(200).json(goods)
    } catch (error) {
        return res.status(500).json({message: "Error while fetching the goods"})
    }
}

const GetBookedGoods = async (req, res, next) => {
    try {
        const bookedGoods = await Goods.find({ booked: true });
        res.status(200).json({ bookedGoods });
    } catch (error) {
        res.status(500).json({ message: "Error while fetching booked goods" });
    }
};

exports.GetBookedGoods=GetBookedGoods;
exports.GetGoods=GetGoods;
exports.AddGoods=AddGoods;
exports.DeleteGoods=DeleteGoods;
exports.UpdateGoods=UpdateGoods;
exports.MarkedGoods=MarkedGoods;
exports.GetGoodsById=GetGoodsById;
exports.GetGoodsByLocation=GetGoodsByLocation;
