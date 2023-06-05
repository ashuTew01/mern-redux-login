const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
}
                    //err here lets express know that this is your error middleware
const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    if(err.name === "CastError" && err.kind === "ObjectId") {
        statusCode = 404;
        message = "Resource not found";
    }

    res.status(statusCode).json({
        message: message,   //may be written simply as message.
        stack: process.env.NODE_ENV === 'production' ? "null" : err.stack
    })
}

export { notFound, errorHandler };