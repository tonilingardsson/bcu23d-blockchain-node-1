const errorHandler = (err, req, res, next) => {
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
