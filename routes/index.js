const bodyParser = require("body-parser");
const path = require("path");
const express = require("express");
const router = express.Router();

module.exports = (db) => {
    router.use(bodyParser.json());
    router.use(bodyParser.urlencoded({ extended: false }));

    router.get("/", (req, res) => {
        db.collection(process.env.TOPICS_COLLECTION).find({}).sort({ _id: -1 }).limit(10).toArray((err, docs) => {
            if (err) {
                console.log(err);
                res.status(500).send();
            }

            else {
                res.render("home", { topics: docs });
            }
        });
    });

    router.use(express.static(path.join(__dirname, "../public")));
    router.use("/topics", require("./topics")(db));
    router.use("/comments", require("./comments")(db));
    router.use("/categories", require("./categories")(db));

    router.get("*", (req, res) => {
        res.status(404).render("404Page");
    });

    return router;
};
