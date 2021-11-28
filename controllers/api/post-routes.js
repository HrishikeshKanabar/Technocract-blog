const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

// api/posts
router.get("/", (req, res) => {
  Post.findAll({
    attributes: ["id", "post_content", "title", "created_at"],
    order: [["created_at", "DESC"]],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  }).then((PostData) => {
    res.json(PostData);
  });
});

// api/posts get by id
router.get("/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "post_content", "title", "created_at"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  }).then((PostData) => {
    res.json(PostData);
  });
});

// Create post

router.post("/", (req, res) => {
  Post.create({
    title: req.body.title,
    post_content: req.body.post_content,
    user_id: req.body.user_id,
  }).then((PostData) => {
    res.json(PostData);
  });
});

// api/post update by Id
router.put("/:id", (req, res) => {
  Post.update(
    {
      title: req.body.title,
      post_content: req.body.content,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  ).then((PostData) => {
    res.json(PostData);
  });
});

// Post delete by id
router.delete("/:id", (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id,
    },
  }).then((PostData) => {
    res.json(PostData);
  });
});

module.exports = router;
