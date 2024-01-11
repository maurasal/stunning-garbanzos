const router = require("express").Router();
const { JobApplication } = require("../../models");
const withAuth = require("../../utils/auth");

// GET all applications
router.get("/", withAuth, async (req, res) => {
  try {
    const applicationData = await JobApplication.findAll();

    res.render('jobs', { JobApplication });
    res.status(200).json(applicationData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single application by ID
router.get("/:id", withAuth, async (req, res) => {
  try {
    const applicationData = await JobApplication.findByPk(req.params.id);
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
router.post("/", withAuth, async (req, res) => {
  try {
    const applicationData = await JobApplication.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(201).json(applicationData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE an application by ID
router.delete("/:id", async (req, res) => {
  try {
    const applicationData = await JobApplication.destroy({
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
