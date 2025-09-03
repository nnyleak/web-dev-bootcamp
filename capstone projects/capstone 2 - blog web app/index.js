import express from "express";
import bodyParser from "body-parser";

// todo:
// post creation: creating new posts
// post viewing: home page for viewing all their posts
// post update/delete: edit and delete posts
// styling: both desktop and mobile

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/create", (req, res) => {
  res.render("create.ejs");
});

app.post("/", (req, res) => {
  res.render("index.ejs", {
    title: req.body["postTitle"],
    content: req.body["postContent"],
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
