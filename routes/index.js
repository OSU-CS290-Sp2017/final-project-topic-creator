const bodyParser = require("body-parser");
const path = require("path");
const express = require("express");
const router = express.Router();

module.exports = (db) => {
    router.use(bodyParser.json());
    router.use(bodyParser.urlencoded({ extended: false }));

    router.get("/", (req, res) => {
        res.render("home");
    });

    router.use(express.static(path.join(__dirname, "../public")));
    router.use("/topics", require("./topics")(db));
    router.use("/comments", require("./comments")(db));
    router.use("/categories", require("./categories")(db));

    return router;
};
