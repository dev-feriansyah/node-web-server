const express = require('express'),
      hbs     = require('hbs'),
      fs      = require('fs'),
      app     = express();


app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', text => {
  return text.toUpperCase();
});

// Middleware
app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now} : ${req.method} ${req.url}`;

  fs.appendFileSync('server.log', log + '\n');
  next();
});

app.use((req, res, next) => {
  res.render('maintenance');
});

// Routes
app.get('/', (req, res) => {
  res.render('home', {
    pageTitle: 'Home Page',
    message: 'This is home page, have a great day !'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    pageTitle: 'About Page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    message: 'Unable to do something'
  });
});

app.listen(3000, () => {
  console.log('Server run in port 3000');
});