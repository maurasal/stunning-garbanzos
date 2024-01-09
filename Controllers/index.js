<<<<<<< HEAD
const router = require("express").Router();

const apiRoutes = require("./api");
const homeRoutes = require("./home-routes");

router.use("/", homeRoutes);
router.use("/api", apiRoutes);

module.exports = router;
=======
const express = require('express');
const router = express.Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);


module.exports = router;
>>>>>>> da225b7 (added changes to controllers index)
