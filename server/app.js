const express = require('express');
const morgan = require('morgan');

const biteRouter = require('./routes/biteRoutes');
const userRouter = require('./routes/userRoutes');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

// middleware for parsing results
app.use(express.json());

app.use(express.static(`${__dirname}/../public`));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/bites', biteRouter);
app.use('/api/users', userRouter);

// if we get here, none of our routers caught the request (because of the middleware stack)
app.all('*', (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on the server`, 404));
});

// global error handling middleware
app.use(globalErrorHandler);

module.exports = app;
