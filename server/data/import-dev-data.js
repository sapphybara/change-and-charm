const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Bite = require('./../models/biteModel');

dotenv.config({ path: `${__dirname}/../../.env` });

console.log(process.env.DATABASE);
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  // TODO add error handling with .catch()
  .then((con) => console.log('DB connected successfully'));

const bites = JSON.parse(fs.readFileSync(`${__dirname}/bites.json`, 'utf-8'));

const importData = async () => {
  try {
    await Bite.create(bites);
    console.log('Data loaded:', bites);
  } catch (err) {
    console.log(err);
  }
};

const deleteData = async () => {
  try {
    await Bite.deleteMany();
    console.log('Old bites successfully deleted');
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
