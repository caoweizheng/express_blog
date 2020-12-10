var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const session = require('express-session')
const redisStore = require('connect-redis')(session)
const redisClient = require('./db/redis')
const sessionStore = new redisStore({
  client: redisClient
})


// var indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const blogRouter = require('./routes/blog')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'QWE123_',
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7
  },
  // session写到redis
  store: sessionStore
}))

// app.use('/', indexRouter);
app.use('/app/user', usersRouter);
app.use('/app/blog', blogRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;