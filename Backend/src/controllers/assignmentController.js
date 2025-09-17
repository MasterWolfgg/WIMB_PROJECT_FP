const Assignment = require('../models/Assignment');


//Create Assignment (Admin Only)

exports.createAssignment = async (req, res) => {
    try {
        const {driver, bus, route } =req.body;

        //Check if bus already assigned 
        const activeAssignment = await Assignment.findOne({bus, isActive: true});
        if(activeAssignment) {
            return res.status(400).json({messages:"This Bus is already assigned to a driver " });
        }


        const assignment = new Assignment({ driver, bus, route });
        await assignment.save();
        res.status(201).json({messages: "Assignment Created ", assignment});
        
    } catch (err) {
        console.error("Create Assignment Error ",err);
        res.status(500).json({error:err.messages});
    }
};

// Get all assignments (Admin only )
exports.getAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find().populate('driver', 'name phone role').populate('bus', 'busNo capacity ').populate('route', 'name startPoint endPoint');
        res.json(assignments);
    } catch (err) {
        console.error("Get Assignment Error ",err);
        res.status(500).json({error: err.messages});
    }
};




//Get Active assignment for a Driver Only 
exports.getDriverAssignment = async (req, res) => {
    try {
        const assignment = await Assignment.findOne({driver: req.user.id, isActive: true}).populate('bus', 'busNo capacity').populate('route', 'name startPoint endPoint stops');
        if(!assignment) return res.status(404).json({message:"No active assignments "});
        res.json(assignment);
    }catch (err) {
        console.error("Get Driver Assignment Error ",err);
        res.status(500).json({error:err.message});
    }
};



//End Assignment (Admin Only )

exports.endAssignment = async (req, res) => {
    try {
        const assignment = await Assignment.findById(req.params.id);
        if(!assignment) return res.status(404).json({message: "Assignment not Found "});

        assignment.isActive = false;
        assignment.endTime = new Date();
        await assignment.save();

        res.json({message:"Assignment Ended ", assignment});
        
    }catch(err) {
        console.error("End Assignment Error ",err);
        res.status(500).json({error: err.message});
    }
};


