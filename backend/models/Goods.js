const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const goodsSchema = new Schema({
    source: {
        type: String,
        required:true
    },
    destination: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    kilometres: {
        type: Number,
        required: true
    },
    goodsType: {
        type: String,
        required: true
    },
    truckType: {
        type: String,
        required: true
    },
    booked: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ['Not Booked', 'Booked', 'In Transit', 'Delivered'],
        default: 'Not Booked'
    }
})

module.exports = mongoose.model('Goods',goodsSchema)