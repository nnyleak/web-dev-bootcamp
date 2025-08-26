import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("<h1>hello!!</h1>");
});

app.get("/contact", (req, res) => {
    res.send("<h1>my email is nnyleak03@gmail.com :O</h1>");
});

app.get("/about", (req, res) => {
    res.send("<h1>i love playing rhythm games!!</h1>");
})

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});