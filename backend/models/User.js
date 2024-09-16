const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    role: {
        type: String,
        enum: ['dealer', 'driver'],
        required: true
    },
    companyName: {
        type: String,
        required: function() {
            return this.role === 'dealer';
        }
    },
    gstNumber: {
        type: String,
        unique: true,
        required: function() {
            return this.role === 'dealer' || this.role === 'driver';
        }
    },
    addressLine1: {
        type: String,
        required: function() {
            return this.role === 'dealer' || this.role === 'driver';
        }
    },
    addressLine2: {
        type: String
    },
    pincode: {
        type: String,
        required: function() {
            return this.role === 'dealer';
        }
    },
    truckType: {
        type: String,
        required: function() {
            return this.role === 'driver';
        }
    },
    engineNumber: {
        type: String,
        required: function() {
            return this.role === 'driver';
        }
    },
    truckYear: {
        type: String,
        required: function() {
            return this.role === 'driver';
        }
    },
    truckModel: {
        type: String,
        required: function() {
            return this.role === 'driver';
        }
    },
    truckMake: {
        type: String,
        required: function() {
            return this.role === 'driver';
        }
    }
});

module.exports = mongoose.model('User', userSchema);
