import express from "express";
import bodyParser from "body-parser";

// todo:
// post creation: creating new posts
// post viewing: home page for viewing all their posts
// post update/delete: edit and delete posts
// styling: both desktop and mobile

const app = express();
const port = 3000;
const allPosts = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { allPosts });
});

app.get("/create", (req, res) => {
  res.render("create.ejs");
});

app.post("/submit", (req, res) => {
  allPosts.push({
    title: req.body["postTitle"],
    content: req.body["postContent"],
  });

  res.render("index.ejs", { allPosts });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
