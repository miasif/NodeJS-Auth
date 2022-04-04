const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const expressValidatior = require('express-validator');
//import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const homeRoutes = require('./routes/home');

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

//view engine
app.set('view engine', 'ejs');
app.set('views', 'views');

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidatior());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
//routes
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/', homeRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is listening on port http://localhost:${port}`);
});
