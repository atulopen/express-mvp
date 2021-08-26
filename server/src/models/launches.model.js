const launches = new Map();

let flightNumber = 100;

const launch = {
    flightNumber,
    launchDate: '23 December, 2021',
    target: 'testing target',
    rocket: 'testing rocket',
    mission: 'testing mission',
    success: true,
    upcoming: true,
}

launches.set(flightNumber, launch);

function getAllLaunches() {
    return Array.from(launches.values())
}

function createNewLaunch(launch) {
    flightNumber++;
    Object.assign(launch, {
        flightNumber,
        success: true,
        upcoming: true,
    })

    launches.set(flightNumber, launch);
    return launch;
}

function abortLaunchById(id) {
    const aborted = launches.get(id);
    aborted.success = false;
    aborted.upcoming = false;
    return aborted;
}

module.exports = {
    getAllLaunches,
    createNewLaunch,
    abortLaunchById,
}