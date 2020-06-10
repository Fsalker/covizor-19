const getDbClient = require("./connect");
const updateDb = require("./updateDb");
require("dotenv").config({ path: "./../../.env" });

(async () => {
    const dbClient = await getDbClient();
    await updateDb({ dbClient });

    process.exit();
})();
