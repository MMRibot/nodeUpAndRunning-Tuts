var express = require('express');
var app = express.createServer();

// by calling app.listen here means that new events don't get called
// until we've finished evaluating the code of the existing loops pass.
// In this case no resquest events will ba called until we've evaluated all the
// initialization code in the file.
app.listen(8000);

var tweets = [ ];


app.get('/', function(req, res){
  res.send('Welcome to Node Twitter!');
});


// express.bodyParser is middleware to stream the POST data from the clinet and then turn it into a
// JavaScript object that we can use
app.send('/send', express.bodyParser(), function(req, res){
  // if req.body exists it contains an object representing the POST data. Here we check for its existence
  if(req.body && req.body.tweet){
    tweets.push(req.body.tweet);
    // send a JSON string back to the client noting success
    // res.send automatically serializes the data as JSON and sends the correct HTTP headers.
    res.send({status: 'ok', message: 'Tweet received'});
  } else {
    //no tweets
    res.send({status:'nok', message: 'No Tweet received'});
  }
});

app.get('/tweets', function(req, res){
  res.send(tweets);
});
