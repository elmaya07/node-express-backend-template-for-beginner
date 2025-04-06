// Import the path library for handling file paths 🔗
import pathLib from 'path';

// Import the qrcode library to generate QR codes 📱
import qr from 'qrcode';

// Import the logger module for logging errors and info 📜
import loggerModule from './logger.js';
const logger = loggerModule(import.meta.url);

// Import the function for signing data with a JSON Web Token (JWT) 🔐
import { getSignedJWT } from './token.js';

/**
 * Generates a QR code from data and saves it to a file in the tmp folder 🗂️
 *
 * @param {string} id - Unique identifier for the file name
 * @param {string|object} data - Data to encode in the QR code (string or JSON object)
 */
export const qrPNGFile = (id, data) => {
    // Generate the QR code and save it as a PNG file
    qr.toFile(
        pathLib.join(__dirname, '../tmp/tmpQR-' + id + '.png'), // File path
        typeof data === 'object' ? JSON.stringify(data) : data, // Data to encode
        { type: 'png' }, // File format
        (err) => {
            if (err) {
                // Log error if QR code generation fails
                logger.error('qrPNGFile', err);
                throw err;
            }
        }
    );
};

/**
 * Generates a QR code from signed data and saves it to a file 🗂️
 *
 * @param {string} id - Unique identifier for the file name
 * @param {string|object} data - Data to encode in the QR code (string or JSON object)
 * @param {boolean} tmp - If true, save in tmp folder; otherwise, save in uploads/2023/k-qrs folder
 * @returns {string} - Filename of the saved QR code
 */
export const qrSignedPNGFile = (id, data, tmp = true) => {
    // Sign the data with JWT
    const signedData = getSignedJWT(data);

    // Construct the filename and target path
    const qrFilename = `${tmp ? 'tmpEncQR' : 'K-QR'}-${id}.png`;
    const targetPath = pathLib.join(
        __dirname,
        '..',
        tmp ? 'tmp' : pathLib.join('uploads', '2023', 'k-qrs'),
        qrFilename
    );

    // Generate the QR code and save it to the specified path
    qr.toFile(
        targetPath,
        typeof data === 'object' ? JSON.stringify(signedData) : signedData,
        { type: 'png' },
        (err) => {
            if (err) {
                // Log error if QR code generation fails
                logger.error('qrSignedPNGFile', err);
                throw err;
            }
        }
    );

    // Return the filename
    return qrFilename;
};
