const router = require('express').Router();
const recordController = require('../Controllers/RecordController');
const { userVerification } = require('../Middlewares/AuthMiddleware');

// get all records
router.get('/', userVerification, recordController.getAllRecords);
// create record
router.post('/create-record', userVerification, recordController.createRecord);
// update record
router.put('/update-record/:id', userVerification, recordController.udpateRecord);
// delete record
router.delete('/delete-record/:id', userVerification, recordController.deleteRecord);

module.exports = router;