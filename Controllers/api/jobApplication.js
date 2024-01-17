const router = require("express").Router();
const { Job } = require("../../models");
const withAuth = require("../../utils/auth");

// GET all applications
router.get("/", withAuth, async (req, res) => {
  try {
    const applicationData = await Job.findAll();

    res.render('jobs', { Job });
    res.status(200).json(applicationData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single application by ID
router.get("/:id", withAuth, async (req, res) => {
  try {
    const applicationData = await Job.findByPk(req.params.id);
    if (!applicationData) {
      res.status(404).json({ message: "Application not found with this id!" });
      return;
    }
    res.status(200).json(applicationData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a new application

router.post('/', withAuth, async (req, res) => {
  console.log("create new job application")
  try {
      const newJobApplication = await Job.create({
          ...req.body,
          user_id: req.session.user_id // Assuming you store the user ID in the session
      });
      res.status(201).json(newJobApplication);
  } catch (err) {
    console.error(err)
      res.status(500).json(err);
  }
});


// DELETE an application by ID
router.delete("/:id", async (req, res) => {
  try {
    const applicationData = await Job.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!applicationData) {
      res.status(404).json({ message: "Application not found with this id!" });
      return;
    }
    res.status(200).json(applicationData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
