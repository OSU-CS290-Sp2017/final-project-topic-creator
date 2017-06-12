const path = require("path");
const express = require("express");
const expressHbs = require("express-handlebars");
const app = express();

const port = process.env.PORT || 3000;

app.engine("handlebars", expressHbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
    res.render("home");
});

app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => {
    console.log("Listening on port", port);
});
