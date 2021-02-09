const AppError = require('./../utils/appError');

const devError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    err,
    message: err.message,
    stack: err.stack,
  });
};

const prodError = (err, res) => {
  // our errors have the isOperational property
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error('BIG BAD ERROR:', err);
    // programming/unknown error: don't leak details to client
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong 🙃, the devs have been notified',
    });
  }
};

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  console.log(err);
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data: ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const field = err.keyPattern
    ? Object.getOwnPropertyNames(err.keyPattern)[0]
    : '';
  const value = err.keyValue ? err.keyValue.name : '';
  const message = `Duplicate field ${field} (${value})`;
  return new AppError(message, 400);
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    devError(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    // deep copy the error param
    let error = JSON.parse(JSON.stringify(err));
    if (err.name === 'CastError') {
      error = handleCastErrorDB(error);
    } else if (error.code === 11000) {
      error = handleDuplicateFieldsDB(error);
    } else if (err.name === 'ValidationError') {
      error = handleValidationErrorDB(error);
    }
    prodError(error, res);
  }
};
