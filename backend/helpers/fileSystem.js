/* eslint no-console: "off" */
const Promise = require('bluebird');
const fs = require('fs');
const httpStatus = require('http-status');
const path = require('path');

const APIError = require('../utils/APIError');

const copyFileAsync = Promise.promisify(fs.copyFile);
const moveFileAsync = Promise.promisify(fs.rename);
const unlinkAsync = Promise.promisify(fs.unlink);
const readdirAsync = Promise.promisify(fs.readdir);

/**
 * Copy file from a to b
 * @param {String} source File source path
 * @param {String} destination File destination path
 *
 * @throws {APIError} Unexpected error handler
 */
module.exports.copyFile = async (source, destination) => {
    try {
        await copyFileAsync(source, destination);

        console.log(`${source} is copied to ${destination} successfully`);
    } catch (error) {
        throw new APIError({
            message: 'Error functional execution',
            status: httpStatus.INTERNAL_SERVER_ERROR,
            stack: error.stack,
            isPublic: false,
            errors: [
                {
                    field: '',
                    location: '',
                    message: '',
                },
            ],
        });
    }
};

/**
 * Move file from a to b
 * @param {String} source File source path
 * @param {String} destination File destination path
 *
 * @throws {APIError} Unexpected error handler
 */
module.exports.moveFile = async (source, destination) => {
    try {
        await moveFileAsync(source, destination);

        console.log(`${source} is moved to ${destination} succesfully`);
    } catch (error) {
        throw new APIError({
            message: 'Error functional execution',
            status: httpStatus.INTERNAL_SERVER_ERROR,
            stack: error.stack,
            isPublic: false,
            errors: [
                {
                    field: '',
                    location: '',
                    message: '',
                },
            ],
        });
    }
};

/**
 * Remove file
 * @param {String} source File source path
 *
 * @throws {APIError} Unexpected error handler
 */
module.exports.removeFile = async (source) => {
    try {
        // Assuming that 'source/file.txt' is a regular file.
        await unlinkAsync(source);

        console.log(`${source} is removed succesfully`);
    } catch (error) {
        throw new APIError({
            message: 'Error removing file',
            status: httpStatus.INTERNAL_SERVER_ERROR,
            stack: error.stack,
            isPublic: false,
            errors: [
                {
                    field: '',
                    location: '',
                    message: '',
                },
            ],
        });
    }
};

/**
 * Create a new folder if that folder is not existed
 * @param {String} source Folder path
 *
 * @throws {APIError} Unexpected error handler
 */
module.exports.createFolderIfNotExists = (source) => {
    try {
        // create uploads folder if not exists
        if (!fs.existsSync(source)) {
            fs.mkdirSync(source);
            console.log(`${source} is created successfully`);
        }
    } catch (error) {
        throw new APIError({
            message: 'Error creating new folder',
            status: httpStatus.INTERNAL_SERVER_ERROR,
            stack: error.stack,
            isPublic: false,
            errors: [
                {
                    field: '',
                    location: '',
                    message: '',
                },
            ],
        });
    }
};

/**
 * Remove all files in a folder
 * @param {String} source Folder path
 *
 * @throws {APIError} Unexpected error handler
 */
module.exports.removeFiles = async (source) => {
    try {
        const files = await readdirAsync(source);

        if (files.length) {
            files.forEach(file => {
                this.removeFile(path.join(source, file));
                console.log(`Successfully removed ${path.join(source, file)}`);
            });
        }
    } catch (error) {
        throw new APIError({
            message: 'Error removing files in folder',
            status: httpStatus.INTERNAL_SERVER_ERROR,
            stack: error.stack,
            isPublic: false,
            errors: [
                {
                    field: '',
                    location: '',
                    message: '',
                },
            ],
        });
    }
};
