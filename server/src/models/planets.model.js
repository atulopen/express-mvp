const parser = require('csv-parse');
const path = require('path');
const fs = require('fs');
const planetsDatabase = require('./planets.mongo');

const isHabitablePlanet = (planet) => {
    return planet['koi_disposition'] === 'CONFIRMED'
        && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
        && planet['koi_prad'] < 1.6;
}

const loadHabitablePlanets = () => {

    return new Promise((resolve, reject) => {
        const fileStream = fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
            .pipe(parser({
                comment: '#',
                columns: true,
            }));

        fileStream.on('data', async (planet) => {
            if (isHabitablePlanet(planet)) {
                await planetsDatabase.updateOne({
                    keplerName: planet.kepler_name
                }, {
                    keplerName: planet.kepler_name
                }, {
                    upsert: true
                })
            }
        });

        fileStream.on('error', (err) => {
            console.log(err);
            reject();
        })

        fileStream.on('end', async () => {
            const habitablePlanets = await planetsDatabase.find({});
            console.log(`${habitablePlanets.length} habitable planets found !`);
            habitablePlanets.map(hp => {
                console.log(hp.keplerName);
            })
            resolve();
        });
    });

}

async function getAllHabitablePlanets() {
    return planetsDatabase.find({});
}

module.exports = {
    loadHabitablePlanets,
    getAllHabitablePlanets,
}