const shortid = require("shortid");
const router = require("express").Router();

/*
    Comment strucutre in database
        id - id generated from shortid
        content - content of the comment
        postDate - post date of comment
        topicId - topic this comment belongs to
*/
module.exports = (db) => {
    router.get("/", (req, res) => {
        res.json({ content: "Hello comments!" });
    });

    router.post("/new", (req, res) => {
        const newComment = {
            id: shortid.generate(),
            content: req.body.content,
            postDate: Date.now(),
            topicId: req.body.topicId
        };

        const databasePromises = [];

        databasePromises.push(new Promise((resolve, reject) => {
            db.collection(process.env.COMMENTS_COLLECTION).insertOne(newComment, (err, doc) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }

                else {
                    resolve();
                }
            });
        }));

        databasePromises.push(new Promise((resolve, reject) => {
            db.collection(process.env.TOPICS_COLLECTION).update(
                { id: req.body.topicId }, 
                { $push: { comments: newComment.id } },
                (err, doc) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    }

                    else {
                        resolve();
                    }
                }
            );
        }));

        Promise.all(databasePromises).then(() => {
            res.status(200).send();
        }, (err) => {
            console.log(err);
            res.status(500).send();
        });
    });

    return router;
};
