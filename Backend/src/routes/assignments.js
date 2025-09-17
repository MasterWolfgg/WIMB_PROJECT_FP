const express = require('express');
const router  = express.Router();
const assignmentController = require('../controllers/assignmentController'); 
const auth = require('../middleware/auth');


//Admin Only 

router.post('/', auth(['admin']),assignmentController.createAssignment);
router.get('/', auth(['admin']),assignmentController.getAssignments);
router.put('/:id/end', auth(['admin']), assignmentController.endAssignment);

//Driver Only 
router.get('/my', auth(['driver']), assignmentController.getDriverAssignment);


module.exports = router;


