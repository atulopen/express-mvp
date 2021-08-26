const http = require('http');
const app = require('./app');
const {loadHabitablePlanets} = require('./models/planets.model')
const {load} = require("nodemon/lib/rules");
const PORT = 8000;

const server = http.createServer(app);

const loadData = async () => {
    await loadHabitablePlanets();
}

loadData();

server.listen(PORT, () => {
    console.log(`Listening at ${PORT}`);
});