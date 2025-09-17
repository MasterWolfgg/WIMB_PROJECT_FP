// Only for testing the Schema Models for teh Database 
require('dotenv').config();
const mongoose= require('mongoose');

// Importing Models 
const Driver = require('./models/Driver');
const Bus = require('./models/Bus');
const Route = require('./models/Route');
const Assignment = require('./models/Assignment');
const LocationLog = require('./models/LocationLog');


async function runTest() {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected for testing ");
        
        // 1.Driver 
        const driver = await Driver.create({
            name: "Baban",
            phone: "12345678910",
            passwordHash: "passwordHash",
            lisenceNo: "Dl2005"
        });
        // 2.Bus 
        const bus = await Bus.create({
            busNo: "WB-12-5678",
            capacity: 40
        });
        // 3. Route
        const route = await Route.create({
            name: "Sector 5 - Dhulaghar ",
            startPoint: "Sector 5",
            endPoint: "Dhulaghar",
            stops: ["Stop1","Stop2","Stop3","Stop4"]
        });
        // 4.Assign Driver + Bus + Route
        const assignment = await Assignment.create({
            bus: bus._id,
            driver: driver._id,
            route: route._id,
            status: "active",
            startTime: new Date()
        });
        // 5.Location Log
        await LocationLog.create({
            assignment: assignment._id,
            lat: 22.5754,
            lon:62.543,
            speed: 30
        });

        console.log("Test Data inserted Sucessfully ");
        console.log({ driver, bus, route, assignment });

    }catch(err) {
        console.error("Error in test : ",err.message);

    } finally {
        await mongoose.disconnect();

        console.log("Disconnected from MongoDB ");
    }
}


runTest();