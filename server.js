const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({
  path: './config.env',
});

const db = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

// ------------------------------------ MONGOOSE ---------------------------------------------------
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('Successfully connected to Database...');
  })
  .catch((err) => {
    console.log(
      `Due to some error, database connection cannot be made. \n${err}`
    );
  });

// -------------------------------------------------------------------------------------------------

const app = require('./app');
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App running at "http://127.0.0.1:${PORT}/" ...`);
});
