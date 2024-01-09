const express = require("express");
const router = express.Router();
const userRoutes = require("./users");
const jobAppRoutes = require("./jobApplicationRoutes");

router.use("/users", userRoutes);
router.use("/jobs", jobAppRoutes);

module.exports = router;
