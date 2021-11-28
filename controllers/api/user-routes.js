const router = require("express").Router();

const { User, Post, Comment } = require("../../models");

// /api/users
router.get("/", (req, res) => {
  User.findAll({
    attributes: { exclude: ["password"] },
  }).then((UserData) => {
    res.json(UserData);
  });
});

//  /api/users  by id
router.get("/:id", (req, res) => {
  User.findOne({
    attributes: { exclude: ["password"] },
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Post,
        attributes: ["id", "title", "post_content", "created_at"],
      },
      {
        model: Comment,
        attributes: ["id", "comment_text", "created_at"],
        include: {
          model: Post,
          attributes: ["title"],
        },
      },
    ],
  }).then((UserData) => {
    res.json(UserData);
  });
});

//  /api/users
router.post("/", (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  }).then((UserData) => {
    res.json(UserData);
  });
});

// Login user
router.post("/login", (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  }).then((UserData) => {
    if (!UserData) {
      res.json({ message: "User does not exists" });
    }

    const goodPass = UserData.checkPassword(req.body.password);

    if (!goodPass) {
      res.status(400).json({ message: "Incorrect Password!" });
      return;
    }

    res.json({ user: UserData, message: "Successfully logged in!" });
  });
});

// log-out
router.post("/logout", (req, res) => {});

// /api/users/ by id
router.put("/:id", (req, res) => {
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id,
    },
  }).then((UserData) => {
    res.json(UserData);
  });
});

// /api/users/ by id
router.delete("/:id", (req, res) => {
  Comment.destroy({
    where: {
      user_id: req.params.id,
    },
  }).then(() => {
    User.destroy({
      where: {
        id: req.params.id,
      },
    }).then((UserData) => {
      res.json(UserData);
    });
  });
});

module.exports = router;
