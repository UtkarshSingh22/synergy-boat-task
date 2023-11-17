const handleServerError = (err, req, res, next) => {
    console.log(err);
    res.status(err.httpStatusCode).json({ message: err.message });
};

module.exports = handleServerError;
