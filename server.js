const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.all(/.*/, function (req, res, next) {
  var host = req.header('host');
  if (host.match(/^www\..*/i)) {
    next();
  } else {
    res.redirect(301, 'https://www.' + host + req.url);
  }
});
app.enable('trust proxy');
app.use(function (req, res, next) {
  if (req.secure) {
    // request was via https, so do no special handling
    next();
  } else {
    // request was via http, so redirect to https
    res.redirect('https://' + req.headers.host + req.url);
  }
});

app.use(
  express.static(path.join(__dirname, 'build'), {
    maxAge: '90d',
  })
);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/build/index.html'));
});

console.log('listening on port ', port);
app.listen(port);
