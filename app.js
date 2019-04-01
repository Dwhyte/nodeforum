const express      = require('express');
const path         = require('path');
const favicon      = require('serve-favicon');
const logger       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const layouts      = require('express-ejs-layouts');
const passport     = require("passport");
const history      = require('connect-history-api-fallback');
const cors         = require('cors');
const sequelize    = require('./util/database');

require('dotenv').config();


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({
  limit: '5mb'
}));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(layouts);
// app.use(history()); // For Vue
app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    credentials: true, // allow other domains to send cookies
    origin: ["http://localhost:8080"] // these are the domains that are allowed
  })
);



// Passport Config
require('./config/passport-config')(passport);


// Routes
const index = require('./routes/index');
app.use('/', index);

const authRoutes = require('./routes/auth-routes');
app.use('/api', authRoutes);

const userRoutes = require('./routes/user-routes');
app.use('/api/v1/u/', userRoutes);

const threadRoutes = require('./routes/thread-routes');
app.use('/api/v1/threads', threadRoutes);

const categoryRoutes = require('./routes/category-routes');
app.use('/api/v1/category', categoryRoutes);

const catListRoutes = require('./routes/cat-list-routes');
app.use('/api/v1/catlist', catListRoutes);

const postRoutes = require('./routes/post-routes');
app.use('/api/v1/post', postRoutes);




// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// sync all defined models to db - "creating the appropriate tables"  (must add this)
sequelize
  // force: true - only when I need to overwrite my tables
  // .sync({ force: true }) 
  .sync()
  .then(result => {
    // return User.findByPk(1);
    // console.log(result)
  })
  .catch(err => console.log(err));

module.exports = app;
