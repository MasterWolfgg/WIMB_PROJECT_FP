const Bus = require('../models/Bus');
const { countDocuments } = require('../models/Driver');

// Create Bus with Body as in MOdels Bus 
// POST /api/buses

exports.createBus = async (req,res) => {
    try { 
        const {busNo, capacity } = req.body;
        if(!busNo) return res.status(400).json({message: 'Bus No is required '});


        //unique Bus No Checking 

        const exists = await Bus.findOne({busNo});
        if(exists) return res.status(400).json({ message: ' Bus number already exists '});

        const bus = new Bus({ busNo, capacity});
        await bus.save();
        return res.status(210).json({message: 'Bus Created ', bus});
    } catch (err) {
        console.error('createBus Error: ', err);
        return res.status(500).json({error: err.message});
    }
};



// To get all the Buses available 
// GET /api/buses
// Optional query: ?limit=50


exports.getBuses = async (req, res) => {
    try{
        const limit = parseInt(req.query.limit) || 100;
        const buses = await Bus.find().populate({path:'currentAssignment', select: 'route driver status startTime'}).limit(limit).lean();
        return res.json({count: buses.length, buses });
    } catch (err) {
        console.error('getBuses error: ', err);
        return res.status(500).json({error: err.message});
    }
};




// Get the bus by ID , Single Bus search 
// GET /api/buses/:id

exports.getBusById = async (req, res) => {
    try {
        const {id} =req.params;
        const bus = await Bus.findById(id).populate({path:'currentAssignment', select:'route driver status startTime'}).lean();
        if(!bus) return res.status(404).json({message: 'Bus not Found '});
        return res.json(bus);
    } catch (err) {
        console.error('getBusById Error: ', err );
        return res.status(500).json({error: err.message});
    }
};


// Update a Bus
// PUT /api/buses/:id 


exports.updateBus = async (req, res) => {
    try {
        const {id} =req.params;
        const update ={};
        if (req.body.busNo) update.busNo = req.body.busNo;
        if(typeof req.body.capacity !== 'undefined') update.capacity = req.body.capacity;

        // if busNo is being updated check for uniqueness
        if(update.busNo) {
            const existing = await Bus.findOne({busNo: update.busNo, _id:{ $ne: id }});
            if (existing) return res.status(400).json({message:'Bus Number Already taken '});
        }

        const bus = await Bus.findByIdAndUpdate(id, update, {new: true });
        if(!bus) return res.status(404).json({message:'Bus Not Found '});
    } catch (err) {
        console.error('Update Bus Error: ',err);
        return res.status(500).json({error: err.message});
    }
};



// Deleting a Bus 
// DELETE /api/buses/:id


exports.deleteBus = async (req, res) => {
    try {
        const {id} =req.params;
        const bus = await Bus.findByIdAndDelete(id);
        if(!bus) return res.status(404).json({message:'Bus not Found '});
        return res.json({message:'Bus Deleted'});
        }catch (err) {
            console.error('Delete Bus Error: ',err);
            return res.status(500).json({error: err.message});
        }
};



