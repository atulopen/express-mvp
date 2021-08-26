const parser = require('csv-parse');
const path = require('path');
const fs = require('fs');

const habitablePlanets = [];

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

        fileStream.on('data', (planet) => {
            if (isHabitablePlanet(planet)) {
                habitablePlanets.push(planet);
            }
        });

        fileStream.on('error', (err) => {
            console.log(err);
            reject();
        })

        fileStream.on('end', () => {
            console.log(`${habitablePlanets.length} habitable planets found !`);
            habitablePlanets.map(hp => {
                console.log(hp.kepler_name);
            })
            resolve();
        });
    });

}

module.exports = {
    loadHabitablePlanets,
    habitablePlanets,
}