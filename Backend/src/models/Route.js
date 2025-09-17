const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Routes for the buses are stored here 


const routeSchema = new Schema ({
    name: {type: String, required: true},
    startPoint: {type: String, required: true},
    endPoint: {type: String, required: true},
    stops: [{type:String}],
    distance: Number,
    estimatedTime: String

}, {timestamps: true});


module.exports = mongoose.model('Route', routeSchema);