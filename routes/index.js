const bodyParser = require("body-parser");
const path = require("path");
const express = require("express");
const router = express.Router();

module.exports = (db) => {
    router.use(bodyParser.json());
    router.use(bodyParser.urlencoded({ extended: false }));

    router.get("/", (req, res) => {
        db.collection(process.env.TOPICS_COLLECTION).find({}, { limit: 10 }).toArray((err, docs) => {
            if (err) {
                res.render("404Page");
            }

            else {
                res.render("home", { topics: docs });
            }
        });
    });

    router.get("/404", (req, res) => {
        res.render("404Page");
    });

    router.use(express.static(path.join(__dirname, "../public")));
    router.use("/topics", require("./topics")(db));
    router.use("/comments", require("./comments")(db));
    router.use("/categories", require("./categories")(db));

    return router;
};
