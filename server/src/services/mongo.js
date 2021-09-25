const mongoose = require('mongoose');

const MONGO_URL = 'mongodb+srv://arthur_learning:dSb7b2ttopKXsLzs@nasacluster.otwsj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';


mongoose.connection.on('open', () => {
    console.log('Mongo DB Connection successful!');
});

mongoose.connection.on('error', (err) => {
    console.log(`couldn't connect to mono ${err}`);
});

async function connectToMongo() {
    await mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

async function disconnectMongo() {
    await mongoose.disconnect();
}

module.exports = {
    connectToMongo,
    disconnectMongo,
};