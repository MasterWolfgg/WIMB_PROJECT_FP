const Route = require('../models/Route');

//Create Route (Admin Only)

exports.createRoute= async (req,res) => {
    try {
        const route = new Route(req.body);
        await route.save();
        res.status(201).json({message: "Route Created ",route});
    } catch (err) {
        console.error('Create Route Error:',err);
        res.status(500).json({message:err.message});
    }

};


// Get all routes (Public)

exports.getRoutes = async (req, res)=> {
    try {
        const routes = await Route.find();
        res.json(routes);
    }catch (err) {
        console.error('Get Route Error',err);
        res.status(500).json({error:err.message})
    }
};



//Get single route (Public)

exports.getRoutesById = async (req, res) => {
    try {
        const route = await Route.findById(req.params.id);
        if(!route) return res.status(404).json({message: "Route not found "});
        res.json(route);
    } catch (err) {
        console.error('Get route by id error ',err);
        res.status(500).json({error: err.message});
    } 
}



//Update Routes (Admin only )
exports.updateRoute = async (req, res) => {
    try {
        const route = await Route.findByIdAndUpdate(req.params.id, req.body, {new: true} );
        if(!route) return res.status(404).json({message: "Route not Found "});
        res.json({message: 'Route Updated ',route});
    } catch (err) {
        console.error('Update Route Error ',err);
        res.send(500).json({error: err.message});
    }
};

 
// Delete Routes (Admin Only)

exports.deleteRoute = async (req, res) => {
    try {
        const route = await Route.findByIdAndDelete(req.params.id);
        if(!route) return res.status(404).json({message:"Route Not Found "});
        res.json({message: "Route Deleted"});
    }catch (err) {
        console.error('Delete Route Error ',err);
        res.status(500).json({error:err.message});
    }
}





