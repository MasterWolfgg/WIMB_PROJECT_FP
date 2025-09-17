require('dotenv').config();
const Driver = require('../models/Driver');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// Driver Registration  

exports.registerDriver = async (req, res) => {
    try {
        const { name, phone, password, lisenceNo } =req.body;


        // Check for Driver if exists 
        const existing = await Driver.findOne({phone});
        if(existing) return res.status(400).json({message: "Phone Already Registered "});

        // hashing the password with 10 bit hashing 

        const passwordHash = await bcrypt.hash(password, 10);

        //creating driver if not found 
        const driver = new Driver({name, phone , passwordHash, lisenceNo });
        await driver.save();

        res.status(201).json({message: "Driver Registered Successfully "});

    } catch (err){
        res.status(500).json({error: err.message });
    }
        
};






//Login For Driver 
exports.loginDriver = async (req, res) => {
    try {
        const {phone, password} = req.body;

        const driver = await Driver.findOne({ phone });
        if(!driver) return res.status(401).json({message: " Invalid Credentials "});

        // Password check from backend 

        const valid = await bcrypt.compare(password, driver.passwordHash);
        if(!valid) return res.status(401).json({message: "Invalid Credentials "});

        
        // Role in token payload 
        const payload = {id: driver._id, role: driver.role};
        

        //sign JWT for browser 
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: process.env.TOKEN_EXPIRES_IN || '7d'});
        

        res.json({token, driverId: driver._id, role: driver.role });
    } catch(err){
        res.status(500).json({error:err.message});
    }
};





