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

let visitedCountries = [];
let countryCodes = [];

db.query("SELECT country_code FROM visited_countries", (err, res) => {
    if (err) {
      console.error(`error executing query`, err.stack);
    } else {
      res.rows.forEach((country) => {
        visitedCountries.push(country.country_code);
      });
    }
    db.end();
  });

app.get("/", async (req, res) => {
  //Write your code here.
  res.render(`index.ejs`, {
    countries: visitedCountries,
    total: visitedCountries.length
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
