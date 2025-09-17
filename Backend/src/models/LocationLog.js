const mongoose = require('mongoose');
const Assignment = require('./Assignment');
const Schema = mongoose.Schema;

// This will hold all the Logs 



const locationLogSchema = new Schema({
    assignment: {type: Schema.Types.ObjectId, ref: 'Assignment', required: true},
    lat: {type: Number, required: true},
    lon: {type: Number, required: true},
    speed: Number,
    timestamp: {type: Date, default: Date.now }
});


// Auto-delete logs older than 7 days 

locationLogSchema.index({timestamp: 1}, {expireAfterSeconds: 60*60*24*7 });



module.exports = mongoose.model('LocationLog', locationLogSchema);