/**
 * Sends a success response
 *
 * @param {object} res - Express response object
 * @param {number} statusCode - HTTP status code (default: 200)
 * @param {string} message - Success message
 * @param {object} [data] - Optional data to include in the response
 */
export const sendSuccess = (res, statusCode = 200, message = 'Success', data = {}) => {
    res.status(statusCode).json({
        success: true,
        message,
        data,
    });
};

/**
 * Sends an error response
 *
 * @param {object} res - Express response object
 * @param {number} statusCode - HTTP status code (default: 500)
 * @param {string} message - Error message
 * @param {object} [error] - Optional error details
 */
export const sendError = (res, statusCode = 500, message = 'An error occurred', error = {}) => {
    res.status(statusCode).json({
        success: false,
        message,
        error,
    });
};