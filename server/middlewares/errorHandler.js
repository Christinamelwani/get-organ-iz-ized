function errorHandler(err, req, res, next) {
  let status = 500;
  let message = err.message;

  res.status(status).json({ status, message });
}

module.exports = { errorHandler };
