var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var categoryRouter = require('./routes/category');
var searchRouter = require('./routes/search');

//connect Mongodb
//mongoose.connect('mongodb://localhost/Login-user', { useNewUrlParser: true });
mongoose.connect('mongodb+srv://admin:1@cluster0-nry5d.mongodb.net/web-tin?retryWrites=true', { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);
var db = mongoose.connection;

//handle mongo error
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function() {
    //We're connected!!!
})


var app = express();

//use sessions for tracking logins
app.use(session({
    secret: 'try hard',
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 500000 },
    store: new MongoStore({
        mongooseConnection: db
    })
}))

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/category', categoryRouter);
app.use('/search', searchRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;