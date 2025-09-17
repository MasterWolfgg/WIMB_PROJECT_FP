const express = require('express');
const router = express.Router();
const busController = require('../controllers/busController');
const auth = require('../middleware/auth');  //using existing middleware for authentication 


// Public : list & view
router.get('/', busController.getBuses); 
router.get('/:id', busController.getBusById);

// Protected : create , update , delete buses 
// auth() ---> auth('admin') for admin acess only 

router.post('/', auth(['admin']), busController.createBus);
router.post('/:id', auth(['admin']), busController.updateBus);
router.post('/:id', auth(['admin']), busController.deleteBus);


module.exports =router;