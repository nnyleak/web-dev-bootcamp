import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "Kjraxoxo_3",
  port: 5432,
});

db.connect();

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

async function checkVisited() {
  const dbResult = await db.query("SELECT country_code FROM visited_countries");
  let visitedCountries = [];
  dbResult.rows.forEach((country) => {
    visitedCountries.push(country.country_code);
  });
  return visitedCountries;
}

app.get("/", async (req, res) => {
  //Write your code here
  let countries = await checkVisited();
  res.render(`index.ejs`, {
    countries: countries,
    total: countries.length,
  });
});

app.post("/add", async (req, res) => {
  const input = req.body["country"];

  try {
    const result = await db.query("SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%'", [input.toLowerCase()]);

    const data = result.rows[0];
    const addedCode = data.country_code;

    try {
      await db.query("INSERT INTO visited_countries (country_code) VALUES ($1)", [addedCode]);
      res.redirect("/");
    } catch (err) {
      let countries = await checkVisited();
      res.render("index.ejs", {
        countries: countries,
        total: countries.length,
        error: "country has already been added, try again.",
      });
    }
  } catch (error) {
    let countries = await checkVisited();
    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      error: "country does not exist, try again.",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
