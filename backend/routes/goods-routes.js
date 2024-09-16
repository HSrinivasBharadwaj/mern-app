const express = require('express');
const {GetBookedGoods,GetGoods,AddGoods,DeleteGoods,UpdateGoods,MarkedGoods, GetGoodsById, GetGoodsByLocation} = require('../controllers/goods-controller');
const goodsRouter = express.Router();


goodsRouter.get("/", GetGoods);
goodsRouter.post("/", AddGoods);
goodsRouter.delete("/:id", DeleteGoods);
goodsRouter.put("/:id", UpdateGoods);
goodsRouter.put("/book/:id", MarkedGoods); 
goodsRouter.get("/location", GetGoodsByLocation);
goodsRouter.get('/booked-goods', GetBookedGoods);

module.exports = goodsRouter;