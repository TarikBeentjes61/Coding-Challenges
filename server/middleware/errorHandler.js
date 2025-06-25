function errorHandler(err, req, res, next) {
    if (err.type === 'entity.too.large') {
        err.message = 'Max file size is 1MB.'
    }
    const status = err.status || 500;
    const message = err.message || "Internal Server Error";
    console.log(`${message} - ${status}`);
    res.status(status).json({ message });
}
module.exports = errorHandler