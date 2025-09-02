import express from "express";

const port = 3000;
const app = express();

app.get("/", (req, res) => {
  const d = new Date();
  const day = d.getDay();

  let type = "a weekday";
  let adv = "go to work bro";

  if (day === 0 || day === 6) {
    type = "a weekend";
    adv = "drink up mofo";
  }

  res.render("index.ejs", {
    dayType: type,
    advice: adv,
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
