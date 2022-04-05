const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const expressValidatior = require('express-validator');
const session = require('express-session');
const flash = require('connect-flash');

//import routes
const apiRouter = require('./api/routes/api');

const userRoutes = require('./routes/user');
const homeRoutes = require('./routes/home');
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

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
app.use(flash());

//routes
app.use('/api', apiRouter);
app.use('/users', userRoutes);
app.use('/', homeRoutes);
app.use('/', authRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is listening on port http://localhost:${port}`);
});
