var http = require('http');

var opts = {
  host: 'www.google.co.uk',
  port: 80,
  path: '/'
};

var req = http.get(opts, function(res){
  //console.log(res);
  res.setEncoding('utf8'); // so that we don't get the data in binary code
  res.on('data', function(data){
    console.log(data);
  });
});

// run the code by typing "node <filename>" in your terminal and see what is returned.
