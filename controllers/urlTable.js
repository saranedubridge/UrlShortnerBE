const urlTable= require('express').Router();
const Url = require('../models/urlschema');

urlTable.get('/', async (req, res) => {
    try {
        const { page = 1, limit = 10, search = "", sort = "createdAt", order = "desc" } = req.query;
        const searchQuery = search ? { longUrl: { $regex: search, $options: 'i' } } : {};

        const urls = await Url.find(searchQuery)
            .sort([[sort, order]])
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        const count = await Url.countDocuments(searchQuery);

        res.json({
            urls,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = urlTable;