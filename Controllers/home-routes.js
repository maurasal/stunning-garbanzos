const router = require("express").Router();
const { User, Job } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  Job.findAll({
    attributes: { exclude: ["jobDescription"] },
    include: [
      {
        model: User,
        attributes: ["id", "user_name", "email", "profilePicture"],
      },
    ],
  })
    .then((dbJobData) => {
      // Serialize data so that it is suitable to be rendered in templates
      const jobs = dbJobData.map((job) => job.get({ plain: true }));
      // Pass serialized data and render the page using template engine
      res.render("homepage", {
        jobs,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Get user's name and id
router.get("/users/:id", withAuth, async (req, res) => {
  try {
    // Find the logged in user on the their id
    const userLoggedIn = req.session.user_id;
    const userId = req.params.id;
    if (!userId || !userLoggedIn) {
      return res.redirect("/");
    }
    const userData = await User.findByPk(userId, {
      include: [{ model: Job }],
    });
    const user = userData.get({ plain: true });
    // If the user is not looking at themselves they should be redirected to homepage
    if (user.name !== userLoggedIn && userLoggedIn !== "admin")
      return res.redirect("homepage");
    res.render("all", {
      ...user,
      logged_in: userLoggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  try {
    res.render('login');
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("signup");
});

router.get("/profile", (req,res) => {
  if (req.session.logged_in) {
    res.render("profile", {
      jobs: [
        {
          id:13471337,
          job_title: 'Engineer',
          application_status: 'Applied'
        }
      ]
    });
  }
})

module.exports = router;
