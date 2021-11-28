const router = require("express").Router();

// api/comments
router.get("/", (req, res) => {
  Comment.findAll({
    attributes: ["id", "comment_text", "created_at"],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
      {
        model: Post,
        attributes: ["title"],
      },
    ],
  }).then((CommentData) => {
    res.json(CommentData);
  });
});

// // api/comments by id
router.post("/:id", (req, res) => {});

router.delete("/:id", (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id,
    },
  }).then((CommentData) => {
    res.json(CommentData);
  });
});

module.exports = router;
