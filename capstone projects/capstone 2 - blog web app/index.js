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

// create post page
app.get("/create", (req, res) => {
  res.render("create.ejs");
});

// create post request
app.post("/submit", (req, res) => {
  addPost(req.body["postTitle"], req.body["postContent"]);
  res.render("index.ejs", { allPosts });
});

// edit post page
app.get("/edit/:id", (req, res) => {
  let index = req.params.id;
  let post = allPosts[index];
  res.render("create.ejs", {
    postId: index,
    postTitle: post.title,
    postContent: post.content,
  });
});

// edit post request
app.post("/update", (req, res) => {
    let index = req.body["index"];
    let postTitle = req.body["postTitle"];
    let postContent = req.body["postContent"];
    editPost(index, postTitle, postContent);
    res.redirect("/");
})

// delete post request
app.post("/delete", (req, res) => {
  deletePost(req.body);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
