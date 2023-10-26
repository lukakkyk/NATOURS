const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

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
    useUnifiedTopology:true
  })
  .then((con) => {
    // console.log(con.connections)
    console.log('DB connection succesfull');
  });

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have name'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have price'],
  },
});

const Tour = mongoose.model('Tour', tourSchema);

const testTour = new Tour({
  name: 'Gldanis Hostel',
  rating: 4.7,
  price: 497,
});

testTour
  .save()
  .then((doc) => {
    console.log('doc', doc);
  })
  .catch((e) => console.log('eeror', e));

console.log(app.get('env'));
// console.log(process.env);
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`app running on port ${port} ....`);
});