import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "secrets",
  password: "Kjraxoxo_3",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    const checkRes = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    if (checkRes.rows.length > 0) {
      res.send("email already exists. try logging in.");
    } else {
      await db.query("INSERT INTO users (email, password) VALUES ($1, $2)", [email, password]);
      res.render("secrets.ejs");
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/login", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    const checkRes = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    if (checkRes.rows.length > 0) {
      if (checkRes.rows[0].password !== password) {
        res.send("incorrect password, try again!");
      } else {
        res.render("secrets.ejs");
      }
    } else {
      res.send("user doesn't exist. try registering an account!");
    }
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
