const router = require("express").Router();

module.exports = (db) => {
    router.get("/", (req, res) => {
        res.json({ content: "Hello categories!" });
    });

    router.get("/:category", (req, res) => {
        const category = req.params.category;

        db.collection(process.env.TOPICS_COLLECTION).find({ category }, { limit: 10 }).toArray((err, docs) => {
            if (err) {
                res.status(500).send();
            }

            else {
                res.render("category", { topics: docs });
            }
        });
    });

    return router;
};
