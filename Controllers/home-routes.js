const router = require("express").Router();
const { User, Job } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const dbJobData = await Job.findAll({
      attributes: { exclude: ["jobDescription"] },
      include: [
        {
          model: User,
          attributes: ["id", "user_name", "email", "profilePicture"],
          include: [Job], // Include job applications here
        },
      ],
    });

    const jobs = dbJobData.map((job) => job.get({ plain: true }));

    res.render("homepage", {
      jobs,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
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

router.get("/profile", withAuth, async (req, res) => {
    try {
    
      const profile = await User.findOne({
        where: { id: req.session.id },
      });

      const jobs = await Job.findAll({
        where: { user_id: req.session.user_id },
      });

      res.render("profile", { profile, jobs });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
});

// router.get("/profile", withAuth, async (req,res) => {
//   try {
//     const userData = await User.findByPk(req.session.user_id, {
//       attributes: { exclude: ['password'] },
//       include: [{ model: Job }],
//     });

//     const user = userData.get({ plain: true });

//     res.render('profile', {
//       ...user,
//       logged_in: true
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get("/profile", (req,res) => {
  if (req.session.logged_in) {
    res.render("profile", {
      jobs: [
        {
          id:13471338,
          job_title: 'Project Manager',
          application_status: 'In Process'
        }
      ]
    });
  }
});

router.get("/profile", (req,res) => {
  if (req.session.logged_in) {
    res.render("profile", {
      jobs: [
        {
          id:13471338,
          job_title: 'Project Manager',
          application_status: 'In Process'
        }
      ]
    });
  }
});

router.get("/profile", (req,res) => {
  if (req.session.logged_in) {
    res.render("profile", {
      jobs: [
        {
          id:13471339,
          job_title: 'Data Scientist',
          application_status: 'Rejected'
        }
      ]
    });
  }
});


module.exports = router;
