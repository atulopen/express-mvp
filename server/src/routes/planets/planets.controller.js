const {habitablePlanets} = require('../../models/planets.model');

function getAllPlanets(req, res) {
    res.status(200);
    return res.json(habitablePlanets);
}

module.exports = {
    getAllPlanets
};
