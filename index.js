const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const expressValidatior = require('express-validator');
//import routes
const authRoutes = require('./routes/auth');
//app
const app = express();
//db
mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log('mongoDB Connected');
  })
  .catch((err) => {
    console.log(err);
  });
//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidatior());
//routes
app.use('/api', authRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is listening on port http://localhost:${port}`);
});
