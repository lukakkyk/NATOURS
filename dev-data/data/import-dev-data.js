const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../models/tourModel');
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    // console.log(con.connections)
    console.log('DB connection succesfull');
  });

// Read json file

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'),
);
console.log('123', tours);

// import data from databse

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data successfuly loaded');
    process.exit();
  } catch (error) {
    console.log('error', error);
  }
};

// delete all data from collection

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data successfuly deleted');
    process.exit();
  } catch (error) {
    console.log('error', error);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
