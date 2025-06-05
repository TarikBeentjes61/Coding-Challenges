module.exports = function handleMulterUpload(multerMiddleware) {
  return (req, res, next) => {
    multerMiddleware(req, res, function (err) {
        if (err) {
            return next(err);
        }
        next();
    });
  };
};
