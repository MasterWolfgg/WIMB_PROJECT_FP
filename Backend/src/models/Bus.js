const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// The Bus Details are stored here  

const busSchema = new Schema({
    busNo: {type: String, required: true, unique: true},
    capacity: Number, 
    currentAssignment: {type: Schema.Types.ObjectId, ref: 'Assignment', default: null}
    }, {timestamps: true}); 


module.exports=mongoose.model('Bus',busSchema);