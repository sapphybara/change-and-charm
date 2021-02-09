const { Schema, model } = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');

// fat models, thin controllers: add as much of the business logic to the model so that the controller only has to
// deal with the application logic
const biteSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'A bite must have a name'],
      unique: true,
      maxlength: [40, 'Keep the bite name under 41 characters'],
      minlength: [5, 'Keep the bite name longer than 5 characters'],
      // validate: [validator.isAlpha, 'Bite name must only contain characters'],
    },
    slug: String,
    price: {
      type: Number,
      required: [true, 'A bite must have a price'],
    },
    duration: {
      type: Number,
      default: 5,
    },
    averageRatings: {
      type: Number,
      min: [1, 'Rating cannot be below 1 star'],
      max: [5, 'Rating must be below 5'],
    },
    numRatings: {
      type: Number,
      default: 0,
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'Please give the bite a short summary'],
    },
    description: {
      type: String,
      trim: true,
      default: function () {
        return this.summary;
      },
    },
    createdOn: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
    coach: {
      type: String,
      trim: true,
      default: 'Heidi',
      // add coach names here as the business grows
      enum: {
        values: ['Heidi'],
        message:
          'Please specify a recognized coach for the bite, and get your developer to add coaches to the database' +
          ' (bite schema) if necessary',
      },
    },
    secretBite: {
      type: Boolean,
      default: false,
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

biteSchema.virtual('durationHours').get(function () {
  return Math.round((this.duration / 60 + Number.EPSILON) * 10) / 10;
});

// Document middleware: runs before .save() and .create()
biteSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// Query middleware, to be run on any query that starts with 'find'
// allows for secret bites, such as for VIP members, associates, and more
biteSchema.pre(/^find/, function (next) {
  // 'this' is now a query object
  this.find({ secretBite: { $ne: true } });
  // this.start = Date.no w();
  next();
});

// biteSchema.post(/^find/, function (docs, next) {
//   console.log(`Query took ${Date.now() - this.start} ms`);
//   next();
// });

// Aggregation middleware, removes secret tours
biteSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({
    $match: {
      secretBite: { $ne: true },
    },
  });
  next();
});

module.exports = model('Bite', biteSchema);
