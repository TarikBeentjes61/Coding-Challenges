function errorHandler(err, req, res, next) {
    console.log(err);
    if (err.type === 'entity.too.large') {
        err.message = 'Max file size is 1MB.'
    }
    const status = err.status || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
}
module.exports = errorHandler