import express from "express";
import bodyParser from "body-parser";

// todo:
// post creation: creating new posts
// post viewing: home page for viewing all their posts
// post update/delete: edit and delete posts
// styling: both desktop and mobile

const app = express();
const port = 3000;

let allPosts = [];

// all post functions
function Post(title, content) {
  this.title = title;
  this.content = content;
}

function addPost(title, content) {
  let post = new Post(title, content);
  allPosts.push(post);
}

function editPost(index, title, content) {
  allPosts[index] = new Post(title, content);
}

function deletePost(index) {
  allPosts.splice(index, 1);
}

// middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// paths

// home page
app.get("/", (req, res) => {
  res.render("index.ejs", { allPosts });
});

// create post page
app.get("/create", (req, res) => {
  res.render("create.ejs");
});

// view post page
app.get("/view/:id", (req, res) => {
  let index = req.params.id;
  let post = allPosts[index];
  res.render("view.ejs", {
    postId: index,
    postTitle: post.title,
    postContent: post.content,
  });
});

// add post
app.post("/submit", (req, res) => {
  let post = new Post(req.body["postTitle"], req.body["postContent"]);
  allPosts.push(post);

  res.render("index.ejs", { allPosts });
});

// edit post
app.post("/edit", (req, res) => {
  console.log("edit request sent");

});

// delete post
app.post("/delete", (req, res) => {
    deletePost(req.body)
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
