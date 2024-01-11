const router = require("express").Router();
const jobApplication = require("./jobApplication");
const userRoutes = require("./users");

router.use("/users", userRoutes);
router.use('/jobApplications', jobApplication)

module.exports = router;
