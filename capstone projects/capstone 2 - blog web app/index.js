import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

let allPosts = [
  new Post(
    "unfinished sentences",
    "some thoughts don't need endings.<br>they just need space<br>to rest between commas,<br>to breathe after a semicolon;<br>to exist without conclusion.<br><br>i used to chase closure, trying to tie every loose end into something neat. but maybe not everything is meant to be finished. maybe some feelings are better left open, like windows that let the air move through.<br><br>sometimes i think the most honest thing i can write is an unfinished line."
  ),
  new Post(
    "a small walk",
    "today i walked without headphones. it felt strange at first - like i'd left something behind. my hands kept twitching toward my pockets, searching for music or a podcast to fill the silence. but instead, i just listened.<br><br>i noticed the cracks in the sidewalk, the rhythm of my footsteps, the way the air smelled faintly of rain. a cat sat on a porch railing and stared at me like i was intruding on its territory. i slowed down, and suddenly the neighborhood felt alive in a way i usually ignore.<br><br>usually, i treat walking as a transition: point a to point b. but today it felt like its own small world. i think i'll try it again tomorrow."
  ),
  new Post(
    "the art of slowing down",
    "there’s a rhythm the world demands from us, one that always feels a little too fast. wake up to alarms, scroll before breakfast, check the inbox before you’ve even had time to notice the sky outside. it’s a constant forward pull, like a current that doesn’t let you catch your breath.<br><br>for a long time, i thought that was the only way to live. if i wasn’t filling every moment, i felt like i was failing. if i wasn’t producing, if i wasn’t consuming, if i wasn’t moving, then what was i even doing? pauses felt dangerous. they felt like falling behind.<br><br>but lately i’ve been practicing something small — slowing down. not permanently, not perfectly, but in brief moments. i’ve started noticing how much of life actually hides in the pauses. like the way sunlight spills across the floorboards in the late afternoon, warming a spot i never sit in. or how the air changes right before it rains, thick with something electric and waiting. or how conversations feel different when you actually let silence hang for a beat instead of rushing to fill it.<br><br>slowing down doesn’t mean stopping. it doesn’t mean abandoning responsibility or refusing to care about the world. it means choosing not to rush through everything just because i’m afraid of stillness. it means giving myself permission to linger, even if it’s only for a breath or two.<br><br>sometimes i sit with a cup of tea and try to drink it without distraction. no phone, no music, no multitasking. just hot water, leaves, steam. it sounds simple, almost laughably so. but the truth is, it feels like a small rebellion. the world keeps spinning, but for a moment, i don’t have to.<br><br>and when i return — when i pick the phone back up, when i open the laptop again, when i rejoin the noise — something is different. i’m softer. clearer. less frantic. the work still waits, the world still demands, but i’ve remembered something important: i don’t have to match its pace all the time.<br><br>a pause is not wasted time. a pause is a gift. it’s where i learn to breathe again. it’s where i notice that life isn’t happening in the rush — it’s happening in the quiet."
  ),
];

let displayedDay = "";
let displayedDateNum = "";
let displayedMonth = "";
let fullDate = "";

// all post functions
function Post(title, content, date) {
  this.title = title;
  this.content = content;
  this.date = date;
}

function addPost(title, content, date) {
  let post = new Post(title, content, date);
  allPosts.push(post);
}

function editPost(index, title, content, date) {
  allPosts[index] = new Post(title, content, date);
}

function deletePost(index) {
  allPosts.splice(index, 1);
}

function getDate() {
    const d = new Date();
    let day = d.getDay();
    let month = d.getMonth();

    switch (day) {
        case 0:
            displayedDay = "sunday";
            break;
        case 1:
            displayedDay = "monday";
            break;
        case 2:
            displayedDay = "tuesday";
            break;
        case 3:
            displayedDay = "wednesday";
            break;
        case 4:
            displayedDay = "thursday";
            break;
        case 5:
            displayedDay = "friday";
            break;
        case 6:
            displayedDay = "saturday";
            break;
        default:
            break;
    }

    switch (month) {
        case 0:
            displayedMonth = "jan"
            break;
        case 1:
            displayedMonth = "feb"
            break;
        case 2:
            displayedMonth = "mar"
            break;
        case 3:
            displayedMonth = "apr"
            break;
        case 4:
            displayedMonth = "may"
            break;
        case 5:
            displayedMonth = "june"
            break;
        case 6:
            displayedMonth = "july"
            break;
        case 7:
            displayedMonth = "aug"
            break;
        case 8:
            displayedMonth = "sept"
            break;
        case 9:
            displayedMonth = "oct"
            break;
        case 10:
            displayedMonth = "nov"
            break;
        case 11:
            displayedMonth = "dec"
            break;
        default:
            break;
    }

    displayedDateNum = d.getDate();
    fullDate = displayedMonth + " " + displayedDateNum;
}

// middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// paths

// home page
app.get("/", (req, res) => {
    getDate();
    res.render("index.ejs", {
        day: displayedDay,
        date: fullDate
    });
})

// blog page
app.get("/blog", (req, res) => {
  res.render("blog.ejs", { allPosts });
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
});

// delete post request
app.post("/delete", (req, res) => {
  deletePost(req.body);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});