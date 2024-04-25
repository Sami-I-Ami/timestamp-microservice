// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// :date? endpoint
app.get("/api/:date?", function (req, res) {
  // first check if it is empty
  if (!req.params.date) {
    // use current time if it is
    givenDate = new Date();
  } else {
    // otherwise make sure it parses
    givenDate = new Date(req.params.date);
    if (givenDate == "Invalid Date") {
      // try as int
      givenDate = new Date(parseInt(req.params.date))
      if (givenDate == "Invalid Date") {
        // return error if not
        return res.json({error: "Invalid Date"});
      }
    }
  }

  // format date (utc)
  splittedDate = givenDate.toString().split(" ");
  splittedDate[0] += ',';
  placeholder = splittedDate[1];
  splittedDate[1] = splittedDate[2];
  splittedDate[2] = placeholder;
  placeholder = splittedDate[5].split("+");
  splittedDate[5] = placeholder[0];
  formattedDate = splittedDate.slice(0,6).join(" ");
  

  
  // return json
  res.json({
    unix: givenDate.getTime(),
    utc: formattedDate
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
