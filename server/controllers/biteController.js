const Bite = require('./../models/biteModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

// TODO write comprehensive docs for the api, including which requests can be made using which http methods, what
//  kind of filtering/sorting is available, plus any other features we add

exports.getAllBites = catchAsync(async (req, res, next) => {
  // complete the request and implement the features in the request
  const features = new APIFeatures(Bite.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const bites = await features.query;

  // send response
  res.status(200).json({
    status: 'success',
    results: bites.length,
    data: {
      bites,
    },
  });
});

// add a bite
exports.createBite = catchAsync(async (req, res, next) => {
  const newBite = await Bite.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      bite: newBite,
    },
  });
});

// get a bite with the given id
exports.getBite = catchAsync(async (req, res, next) => {
  const bite = await Bite.findById(req.params.id);
  if (!bite) {
    return next(
      new AppError(`No bite was found with id ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    status: 'success',
    data: {
      bite,
    },
  });
});

exports.updateBite = catchAsync(async (req, res, next) => {
  const updatedBite = await Bite.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!updatedBite) {
    return next(
      new AppError(`No bite was found with id ${req.params.id}`, 404)
    );
  }

  res.json({
    status: 'success',
    data: {
      bite: updatedBite,
    },
  });
});

exports.deleteBite = catchAsync(async (req, res, next) => {
  const bite = await Bite.findByIdAndDelete(req.params.id);
  if (!bite) {
    return next(
      new AppError(`No bite was found with id ${req.params.id}`, 404)
    );
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

// run the aggregation pipeline to get info about the bites
exports.getBiteStats = catchAsync(async (req, res, next) => {
  const stats = await Bite.aggregate([
    // {
    //   $match: { duration: { $gte: 15 } },
    // },
    {
      $group: {
        _id: '$duration',
        numBites: { $sum: 1 },
        numRatings: { $sum: '$numRatings' },
        totalAveRating: { $avg: '$averageRatings' },
        totalAvePrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
      },
    },
    {
      $sort: { totalAvePrice: 1 },
    },
    // {
    //   $match: { _id: { $ne: 29 } },
    // },
  ]);

  res.json({
    status: 'success',
    results: stats.length,
    data: {
      stats,
    },
  });
});

// filter the bites by month, returning the sorted list in descending order
exports.getMonthCount = catchAsync(async (req, res) => {
  const year = req.params.year * 1;

  const months = await Bite.aggregate([
    {
      $unwind: '$startDates',
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lt: new Date(`${year + 1}-01-01`),
        },
      },
    },
    {
      $group: {
        _id: {
          $month: '$startDates',
        },
        numBiteStarts: { $sum: 1 },
        tours: { $push: '$name' },
      },
    },
    {
      $addFields: { month: '$_id' },
    },
    {
      $project: {
        _id: 0,
      },
    },
    {
      $sort: {
        numBiteStarts: -1,
      },
    },
  ]);

  res.json({
    status: 'success',
    results: months.length,
    data: {
      months,
    },
  });
});

// alias for popular bite requests
exports.aliasTopBites = (req, res, next) => {
  const query = req.query;

  query.limit = query.limit || '5';
  query.sort = query.sort || 'price,averageRatings,-duration';
  query.fields = query.fields || 'name,price,averageRatings,coach';

  next();
};
