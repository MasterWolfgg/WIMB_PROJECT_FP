const express = require('express');
const router = express.Router();
const routeController = require('../controllers/routeController');
const auth = require('../middleware/auth');



//Public 

router.get('/',routeController.getRoutes);
router.get('/:id', routeController.getRoutesById);


//Admin
router.post('/',auth(['admin']),routeController.createRoute);
router.put('/:id',auth(['admin']),routeController.updateRoute);
router.delete('/:id',auth(['admin']),routeController.deleteRoute);



module .exports = router;






