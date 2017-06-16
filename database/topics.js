module.exports = (db) => {
    return {
        getTopic(topicId) {
            return new Promise((resolve, reject) => {
                db.collection(process.env.TOPICS_COLLECTION).findOne({ id: topicId }, (err, doc) => {
                    if (err || !doc) {
                        reject(err);
                    }

                    else {
                        resolve(doc);
                    }
                });
            });
        }
    };
};
