import FileHandler from "../utils/FileHandler.mjs";

const errorHandler = (err, req, res, next) => {
    const message = `
    Method: ${req.method}
    URL: ${req.url}
    Date: ${new Date().toLocaleDateString('sv-SE')}
    Time: ${new Date().toLocaleTimeString('sv-SE')}
    Success: ${err.success}
    Status: ${err.statusCode} (${err.status})
    Error: ${err.message}
    `;

    new FileHandler('logs', 'error.log').append(message);

    res
        .status(err.statusCode)
        .json({
            success: err.success,
            statusCode: err.statusCode,
            status: err.status,
            err: err.message,
        });
};

export default errorHandler;
