const express = require('express');
const userRoutes = require('./userRoutes');
const jobApplicationRoutes = require('./jobApplicationRoutes');


const router = express.Router();

router.use('/users', userRoutes);
router.use('/jobs', jobApplicationRoutes);


module.exports = router;