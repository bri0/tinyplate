const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const staticAsset = require('static-asset');
const staticAssetStrategy = require('./lib/static_asset/strategy');

const index = require('./routes/index');
const users = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(staticAsset(__dirname + '/public/', staticAssetStrategy));
app.use(staticAssetStrategy.assetPathRewrite);
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res) {
  const error = new Error('Not Found');
  error.status = 404;
  error.detail = 'We can\'t seem to find the page you\'re looking for.';
  res.render('error', { error });
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
