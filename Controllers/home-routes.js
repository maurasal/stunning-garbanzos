const router = require("express").Router();
const { User, Job } = require("../models");

router.get("/", async (req, res) => {
  Job.findAll({
    attributes: { exclude: ["jobDescription"] },
    include: [
      {
        model: User,
        attributes: ["id", "name", "email", "profilePicture"],
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
// router.get("/user/:id", async (req, res) => {
//   try {
//     // Find the logged in user on the their id
//     const userLoggedIn = req.session.user_id;
//     const userId = req.params.id;
//     if (!userId || !userLoggedIn) {
//       return res.redirect("/");
//     }
//     const userData = await User.findByPk(userId, {
//       include: [{ model: Job }],
//     });
//     const user = userData.get({ plain: true });
//     // If the user is not looking at themselves they should be redirected to homepage
//     if (user.name !== userLoggedIn && userLoggedIn !== "admin")
//       return res.redirect("homepage");
//     res.render("all", {
//       ...user,
//       loggedIn: userLoggedIn,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});
module.exports = router;
