const path = require("path");
const bodyParser = require("body-parser");
const express = require("express");
const expressHbs = require("express-handlebars");
const mongodb = require("mongodb");
const app = express();

const port = process.env.PORT || 3000;

app.engine("handlebars", expressHbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.render("home");
});

app.use(express.static(path.join(__dirname, "public")));

mongodb.MongoClient.connect(process.env.MONGODB_URI, (err, database) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }

    console.log("Connected to database");

    app.use("/api", require("./routes/api/index")(database));

    app.listen(port, () => {
        console.log("Listening on port", port);
    });
});
