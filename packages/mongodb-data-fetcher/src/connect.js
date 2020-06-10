const MongoClient = require("mongodb").MongoClient;

module.exports = async () => {
    try {
        const connectionUrl = process.env.MONGODB_URL;

        if (!connectionUrl) {
            throw new Error(
                "Connection URL is falsy... make sure .env contains a valid MONGODB_URL string :D"
            );
        }
        const client = new MongoClient(connectionUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        return (await client.connect()).db();
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
};
