const mongoose = require("mongoose");
const Schema = mongoose.Schema;



// This shows the assignment of each and every bus in the frontend dasshboard 


const assignmentSchema = new Schema ({
    bus: {type: Schema.Types.ObjectId, ref: 'Bus', required: true},
    driver: {type: Schema.Types.ObjectId, ref: 'Driver', required: true},
    route: {type: Schema.Types.ObjectId, ref: 'Route', required: true},
    startTime: {type: Date, default: Date.now},
    endTime: {type: Date}, 
    isActive: {type: Boolean, default: true }

    }, {timestamps: true});




    module.exports = mongoose.model('Assignment', assignmentSchema);
