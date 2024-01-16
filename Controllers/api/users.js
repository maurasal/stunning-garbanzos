const router = require("express").Router();
const { User } = require("../../models");

// GET all users
router.get("/", async (req, res) => {
  try {
    const userData = await User.findAll();
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User not found with this id!" });
      return;
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST a new user
router.post('/', async (req, res) => {
  try {
    // Extracting email and password from the request body
    const { email, password } = req.body;

    // Creating a new user in the database
    const newUser = await User.create({
      email,
      password,
    });

    // Saving the user's ID in the session to log them in
    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.logged_in = true;

      // Sending a success response to the client
      res.status(201).json({ message: 'Signup successful!' });
    });
  } catch (err) {
    // Handling any errors during the signup process
    console.error('Signup error:', err);
    
    // Sending an error response to the client
    res.status(500).json(err);
  }
});

module.exports = router;


// POST for login
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
    if (!userData) {
      res.status(400).json({ message: 'Incorrect email or password' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect email or password' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(200).end();
    });
  } else {
    res.status(404).end();
  }
});

// DELETE a user by ID
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!user) {
      res.status(404).json({ message: "User not found with this id!" });
      return;
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
