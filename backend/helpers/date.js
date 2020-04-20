const {
    format,
    differenceInHours,
} = require('date-fns');

/**
 * Receive Unix timestamps in Milliseconds and convert it to Seconds
 * @param {Number} time Unix timestamp in Millisecond
 *
 * @returns {Number} Unix timestamp in Second
 */
const ensureUnixTimestampInSeconds = (time) => {
    const formattedTime = time.toString().length !== 14
        ? time * 1000
        : time;

    return formattedTime;
};

/**
 * Format time to ISO8601
 * @param {Number|Date} time Instance of ISO time
 * @returns {Date} time in ISO8601 format
 */
const formatTimeIn8601 = (time) => {
    // transform UNIX timestamp in seconds to milliseconds
    if (typeof time === 'number') {
        const formattedTime = new Date(ensureUnixTimestampInSeconds(time));

        return format(formattedTime, 'yyyy-MM-dd\'T\'HH:mm:ssxxx');
    }

    return format(time, 'yyyy-MM-dd\'T\'HH:mm:ssxxx');
};

/**
 * Get relatives between two dates
 * @param {Number} from Unix timestamp
 * @param {Number} to Unix timestamp
 *
 * @returns {Number} Number of relative days
 */
const getRelativeHourBetweenTwoTime = (
    {
        from,
        to,
    },
) => {
    // transform UNIX timestamp in seconds to milliseconds
    if (typeof from === 'number' && typeof to === 'number') {
        const formattedFromTime = new Date(ensureUnixTimestampInSeconds(from));
        const formattedToTime = new Date(ensureUnixTimestampInSeconds(to));

        return differenceInHours(formattedToTime, formattedFromTime);
    }

    return differenceInHours(to, from);
};

const getCurrentUnixTimestampInSeconds = () => {
    return format(new Date(), 't');
};

module.exports = {
    formatTimeIn8601,
    getRelativeHourBetweenTwoTime,
    getCurrentUnixTimestampInSeconds,
};
