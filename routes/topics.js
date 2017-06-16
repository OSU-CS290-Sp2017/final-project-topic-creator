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

    router.get("/:id", (req, res) => {
        const topicId = req.params.id;

        new Promise((resolve, reject) => {
            db.collection(process.env.TOPICS_COLLECTION).findOne({ id: topicId }, (err, doc) => {
                if (err || !doc) {
                    reject(err);
                }

                else {
                    resolve(doc);
                }
            });
        }).then((topic) => {
            const commentIds = topic.comments;

            return new Promise((resolve, reject) => {
                db.collection(process.env.COMMENTS_COLLECTION).find({ id: { $in: commentIds }}).toArray((err, docs) => {
                    if (err || !docs) {
                        reject(err);
                    }

                    else {
                        const comments = docs.sort((a, b) => {
                            if (a.postDate < b.postDate) {
                                return 0;
                            }

                            else if (a.postDate > b.postDate) {
                                return 1;
                            }

                            else {
                                return 0;
                            }
                        });

                        resolve({ topic, comments });
                    }
                });
            });
        }).then((data) => {
            console.log(data);
            res.json(data);
            // res.json({ topic: data.topic });
        }).catch((err) => {
            console.log(err);
            res.status(404).send();
        });
    });

    router.get("/new", (req, res) => {
        res.render("newTopics");
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
