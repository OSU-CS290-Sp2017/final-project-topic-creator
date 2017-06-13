const router = require("express").Router();

module.exports = (db) => {
    router.get("/", (req, res) => {
        res.json({ content: "hello api!" });
    });

    router.use("/topics", require("./topics")(db));
    router.use("/comments", require("./comments")(db));

    return router;
};
