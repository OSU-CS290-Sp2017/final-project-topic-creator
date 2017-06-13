const shortid = require("shortid");
const router = require("express").Router();

/*
    Topic strucutre in database
        id - id generated from shortid
        title - title of topic
        description - description of topic
        postDate - post date of topic
        category - category the topic belongs to
        comments - array of comment ids that belong to this topic
*/
module.exports = (db) => {
    router.get("/", (req, res) => {
        res.json({ content: "Hello topics!" });
    });

    router.post("/new", (req, res) => {
        const newTopic = {
            id: shortid.generate(),
            title: req.body.title,
            description: req.body.description,
            postDate: Date.now(),
            category: req.body.category,
            comments: []
        };

        db.collection(process.env.TOPICS_COLLECTION).insertOne(newTopic, (err, doc) => {
            if (err) {
                console.log(err);
                res.status(500).send();
            }

            else {
                res.status(200).send();
            }
        });
    });

    return router;
};
