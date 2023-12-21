const urlstats = require('express').Router();
const Url = require('../models/urlschema');

urlstats.get('/', async (req, res) => {
    try {
        // Create a new date object in the local timezone
        const today = new Date();
       
        
        // Set the time to midnight in the local timezone
        today.setUTCHours(0, 0, 0, 0);

      
        const dailyCount = await Url.countDocuments({ createdAt: { $gte: today } });
        const monthlyCounts = await Url.aggregate([
            { $match: { createdAt: { $gte: new Date(today.getFullYear(), today.getMonth(), 1) } } },
            { $group: { _id: { $dayOfMonth: "$createdAt" }, count: { $sum: 1 } } },
            { $sort: { _id: 1 } }
        ]);
       

        res.json({ dailyCount, monthlyCounts });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = urlstats;
