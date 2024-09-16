require('dotenv').config()
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('./routes/user-routes');
const vehicleRouter = require('./routes/driver-routes');
const goodsRouter = require('./routes/goods-routes');
const optionRouter = require('./routes/option-routes');
const app = express();

app.use(express.json());
app.use(cors())

app.use("/api",router)
app.use("/api/vehiclerouter", vehicleRouter)
app.use("/api/goodsrouter", goodsRouter)
app.use("/api/options",optionRouter)
//Connect to the mongodb
mongoose.connect(process.env.MONGO_URI).then(() => {
    app.listen(process.env.PORT);
    console.log("Connected to mongodb and listening on port 4000")
}).catch(error => console.log(error))

