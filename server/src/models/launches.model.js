const launchDatabase = require('./launches.mongo');
const planetDatabase = require('./planets.mongo');

const DEFAULT_FLIGHT_NUMBER = 100;

const launch = {
    flightNumber: DEFAULT_FLIGHT_NUMBER,
    launchDate: '23 December, 2021',
    target: 'Kepler-1410 b',
    rocket: 'testing rocket',
    mission: 'testing mission',
    customers: ['ZTM', 'ARTHUR'],
    success: true,
    upcoming: true,
}

async function saveLaunch(launch) {
    await launchDatabase.findOneAndUpdate({
        flightNumber: launch.flightNumber
    }, launch, {
        upsert: true
    })
}

saveLaunch(launch);


async function getAllLaunches() {
    return launchDatabase.find({});
}

async function isLaunchExistsById(launchId) {
    return launchDatabase.findOne({
        flightNumber: launchId
    });
}

async function getLatestFlightNumber() {
    const launch = await launchDatabase.findOne({}).sort({flightNumber: -1})
    if (!launch) {
        return DEFAULT_FLIGHT_NUMBER;
    }

    return launch.flightNumber;
}

async function scheduleLaunch(launch) {
    const flightNumber = await getLatestFlightNumber() + 1;
    Object.assign(launch, {
        flightNumber,
        success: true,
        upcoming: true,
        customers: ['ZTM', 'ARTHUR']
    });

    const planet = await planetDatabase.findOne({
        keplerName: launch.target
    });


    if (!planet) {
        throw new Error('Planet not found');
    }

    await saveLaunch(launch);
}

async function abortLaunchById(launchId) {
    const aborted = await launchDatabase.updateOne({
        flightNumber: launchId
    }, {
        success: false,
        upcoming: false,
    })

    return aborted.ok && aborted.nModified === 1;
}

module.exports = {
    getAllLaunches,
    scheduleLaunch,
    abortLaunchById,
    isLaunchExistsById,
}