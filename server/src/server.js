const http = require('http');
const mongoose = require('mongoose');
const app = require('./app');
const {loadHabitablePlanets} = require('./models/planets.model')
const PORT = 9000;
const MONGO_URL = 'mongodb+srv://arthur_learning:dSb7b2ttopKXsLzs@nasacluster.otwsj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const server = http.createServer(app);

const loadData = async () => {
    await loadHabitablePlanets();
}

mongoose.connection.on('open', () => {
    console.log('Mongo DB Connection successful!');
});

mongoose.connection.on('error', (err) => {
    console.log(err);
});

async function connectToMongo() {
    await mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

loadData();
connectToMongo();

server.listen(PORT, () => {
    console.log(`Listening at ${PORT}`);
});