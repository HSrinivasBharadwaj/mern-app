const express = require('express');
const optionRouter = express.Router();

const GetOptions = async (req, res, next) => {
  try {
    const goodsTypes = [
      'Electronics', 'Rice Bags', 'Furniture', 'Clothing', 'Machinery',
      'Chemicals', 'Food Items', 'Books', 'Vehicles', 'Construction Materials'
    ];
    const truckTypes = [
      '6 Tyres', '10 Tyres', '12 Tyres', '14 Tyres', '16 Tyres',
      '18 Tyres', '20 Tyres', '24 Tyres', 'Trailer', 'Container'
    ];
    return res.status(200).json({ goodsTypes, truckTypes });
  } catch (error) {
    return res.status(500).json({ message: "Error while fetching options, please try again" });
  }
};

optionRouter.get("/", GetOptions); 

module.exports = optionRouter;
