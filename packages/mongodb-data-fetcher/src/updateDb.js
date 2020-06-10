const fetch = require("node-fetch");

const covidApiUrl = `https://api.covid19api.com/`;

module.exports = async ({ dbClient }) => {
    try {
        const fetchResponse = await fetch("https://api.covid19api.com/all");
        const covidData = await fetchResponse.json();
        const covidDataCollection = await dbClient.collection(`covid-data-${new Date().getTime()}`);

        console.log(covidData.length);
        while (covidData.length) {
            const chunkSize = 40000;
            console.log(`Inserting ${chunkSize} elements...`);
            const covidDataChunk = covidData.splice(0, chunkSize);
            await covidDataCollection.insertMany(covidDataChunk);
        }
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
};
