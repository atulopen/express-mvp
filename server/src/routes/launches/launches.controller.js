const {getAllLaunches, createNewLaunch, abortLaunchById} = require('../../models/launches.model');


function httpGetAllLaunches(req, res) {
    return res.status(200).json(getAllLaunches())
}

function httpCreateNewLaunch(req, res) {
    const launch = req.body;

    if (!launch.target || !launch.rocket || !launch.mission || !launch.launchDate) {
        return res.status(400).json({
            error: 'Missing Required Fields'
        });
    }

    launch.launchDate = new Date(launch.launchDate);
    createNewLaunch(launch);
    return res.status(201).json(launch);
}

function httpAbortLaunch(req, res) {
    const id = req.params.id;
    const aborted = abortLaunchById(Number(id));
    return res.status(200).json(aborted);
}

module.exports = {
    httpGetAllLaunches,
    httpCreateNewLaunch,
    httpAbortLaunch,
}