const http = require('http');
const app = require('./app');
const {loadHabitablePlanets} = require('./models/planets.model')
const {connectToMongo} = require("./services/mongo");
const PORT = 8000;
const server = http.createServer(app);

const loadData = async () => {
    await loadHabitablePlanets();
}

async function startServer() {
    await connectToMongo();
    await loadData();


    server.listen(PORT, () => {
        console.log(`Listening at ${PORT}`);
    });
}

startServer();