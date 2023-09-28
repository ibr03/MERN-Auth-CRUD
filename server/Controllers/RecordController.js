const Record = require('../Models/Record');

const createRecord = async (req, res, next) => {
    try {
        const { patientName, age, medicalHistory, lastVisit } = req.body;
        // Create and save the user to the database
        const record = new Record({ patientName, age, medicalHistory, lastVisit });
        await record.save();
        res.status(201).json({ message: 'Record created successfully' });
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred' });
    }
};

const udpateRecord = async (req, res, next) => {
    try {
        await Record.findByIdAndUpdate(req.params.id, req.body);
        res.status(204).json({message: 'User updated successfully' });
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred' });
    }
};

const deleteRecord = async (req, res, next) => {
    try {
        await Record.findByIdAndRemove(req.params.id);
        res.status(204).json({message: 'User deleted successfully' });
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred' });
    }
};

const getAllRecords = async (req, res, next) => {
    try {
        const records = await Record.find({}); // find all records
        if (records) {
            res.status(200).json(records);
            next();
        } else {
            res.status(404).json({ error: 'No records exist'});
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    getAllRecords,
    deleteRecord,
    udpateRecord,
    createRecord
}