const {getAllLaunches, scheduleLaunch, abortLaunchById, isLaunchExistsById} = require('../../models/launches.model');


async function httpGetAllLaunches(req, res) {
    return res.status(200).json(await getAllLaunches())
}

async function httpCreateNewLaunch(req, res) {
    const launch = req.body;

    if (!launch.target || !launch.rocket || !launch.mission || !launch.launchDate) {
        return res.status(400).json({
            error: 'Missing Required Fields'
        });
    }

    launch.launchDate = new Date(launch.launchDate);
    await scheduleLaunch(launch);
    return res.status(201).json(launch);
}

async function httpAbortLaunch(req, res) {
    const id = req.params.id;
    const launchExists = isLaunchExistsById(id);
    if (!launchExists) {
        res.status(404);
        return res.json({error: 'Launch doesn\'t exists'});
    }
    await abortLaunchById(Number(id));
    return res.status(200).json();
}

module.exports = {
    httpGetAllLaunches,
    httpCreateNewLaunch,
    httpAbortLaunch,
}