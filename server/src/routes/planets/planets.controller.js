const {getAllHabitablePlanets} = require('../../models/planets.model');

async function httpGetAllPlanets(req, res) {
    res.status(200);
    return res.json(await getAllHabitablePlanets());
}

module.exports = {
    httpGetAllPlanets
};
