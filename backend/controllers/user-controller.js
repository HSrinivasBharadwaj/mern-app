const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()


const SignUp = async (req, res) => {
    const {
        name,
        email,
        password,
        role,
        companyName,
        gstNumber,
        addressLine1,
        addressLine2,
        pincode,
        truckType,
        engineNumber,
        truckYear,
        truckModel,
        truckMake
    } = req.body;

    try {
        
        const existingUser = await User.findOne({ email:email });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        
        const hashedPassword = bcrypt.hashSync(password, 10);

        
        const user = new User({
            name,
            email,
            password: hashedPassword,
            role,
            companyName: role === 'dealer' ? companyName : undefined,
            gstNumber,
            addressLine1,
            addressLine2,
            pincode: role === 'dealer' ? pincode : undefined,
            truckType: role === 'driver' ? truckType : undefined,
            engineNumber: role === 'driver' ? engineNumber : undefined,
            truckYear: role === 'driver' ? truckYear : undefined,
            truckModel: role === 'driver' ? truckModel : undefined,
            truckMake: role === 'driver' ? truckMake : undefined
        });

        
        await user.save();
        res.status(201).json({ message: 'User created successfully', user });

    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
};


const LogIn = async (req, res, next) => {
    const { email, password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email: email })
    } catch (error) {
        return res.status(500).json({ message: "Error while finding the user" })
    }
    if (!existingUser) {
        return res.status(400).json({ message: "User does not exist, please create a new one" })
    }
    //check the password with the hashedPassword field
    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
    if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Password Does not match" })
    }
    //Create jwt token
    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
        expiresIn: "1h"
    })
    return res.status(200).json({ message: "Login successful", token, user: { email: existingUser.email, role: existingUser.role, name: existingUser.name } })
}


const VerifyToken = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(400).json({ message: "No token found" });
    }
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken;
        next();
    } catch (error) {
        return res.status(400).json({ message: "Invalid token." });
    }
};

const Logout = (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
        return res.status(200).json({ message: 'Logged out successfully' });
    }
    return res.status(400).json({ message: 'No token found' });
};



exports.SignUp = SignUp
exports.LogIn = LogIn;
exports.VerifyToken = VerifyToken;
exports.Logout = Logout;
