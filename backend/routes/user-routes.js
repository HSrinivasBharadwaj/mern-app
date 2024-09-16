const express = require('express');
const { SignUp, LogIn, VerifyToken, Logout } = require('../controllers/user-controller');
const router = express.Router();

//Post Request
//SignUp
router.post("/signup", SignUp)
//Login Request
router.post("/login", LogIn)
router.get("/verify", VerifyToken);  
router.post('/logout', VerifyToken, Logout); 
module.exports = router;