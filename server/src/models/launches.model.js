const launches = new Map();

const flightNumber = 100;

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

module.exports = {
    getAllLaunches
}