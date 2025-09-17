const mongoose =require('mongoose');
const Schema =mongoose.Schema;

// Creating the Driver Schema for Database

const driverSchema = new Schema({
    name: {type: String, required: true },
    phone: {type: String, unique:true, required:true},
    passwordHash: {type: String, required: true},
    lisenceNo: String,
    qrCodeId: String, //Optional For QR-based Login in App 
    isActive: { type:Boolean, default:true},


    //Role : driver | admin
    // default = driver , admin will be created explicitly
    role: {type: String, enum: ['driver', 'admin'], default: 'driver' }
    
    }, {timestamps: true});

module.exports=mongoose.model('Driver',driverSchema);