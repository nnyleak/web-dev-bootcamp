import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "Kjraxoxo_3",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;

async function checkUsers() {
  const result = await db.query("SELECT * FROM users");
  let users = [];
  result.rows.forEach(user => {
    users.push(user);
  })
  return users;
}

async function checkVisited(currentUserId) {
  const result = await db.query("SELECT  country_code FROM visited_countries WHERE user_id = $1", [currentUserId]);
  let userVisited = [];
  result.rows.forEach(user => {
    userVisited.push(user.country_code);
  });
  return userVisited;
}

app.get("/", async (req, res) => {
  const users = await checkUsers();
  const userVisited = await checkVisited(currentUserId);
  res.render("index.ejs", {
    countries: userVisited,
    total: userVisited.length,
    users: users,
    color: users[currentUserId - 1].color,
  });
});

app.post("/add", async (req, res) => {
  const input = req.body["country"];

  try {
    const result = await db.query("SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';", [input.toLowerCase()]);

    const data = result.rows[0];
    const countryCode = data.country_code;
    try {
      await db.query("INSERT INTO visited_countries (country_code, user_id) VALUES ($1, $2)", [countryCode, currentUserId]);
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/user", async (req, res) => {
  // currentUserId = req.body["user"];
  // const users = await checkUsers();
  // const userVisited = await checkVisited(currentUserId);
  // res.render("index.ejs", {
  //   countries: userVisited,
  //   total: userVisited.length,
  //   users: users,
  //   color: users[currentUserId - 1].color,
  // });
  if (req.body.add === "new") {
    res.render("new.ejs");
  } else {
    currentUserId = req.body.user;
    res.redirect("/");
  }
});

app.post("/new", async (req, res) => {
  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html
  const name = req.body.name;
  const color = req.body.color;
  const result = await db.query("INSERT INTO users (name, color) VALUES ($1, $2) RETURNING *;", [name, color]);
  currentUserId = result.rows[0].id;
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
