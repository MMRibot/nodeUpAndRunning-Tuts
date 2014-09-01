/* spawn() is most often used in server contexts to create subcomponents of a server and is the most common way
people make Node work with mulpie cores on a single machine.

The first argument is a command string, the command to run.
The second argument is an array of process arguments (defaults to empty array if omitted).
The third argument (also optional) is also an array of arguments.

http://nodejs.org/documentation/api/
*/


// this example simply echoes back whatever input it gets

var cp = require('child_process');
var cat = cp.spawn('cat');

// we use the streams provided by the Child process to get and send data
cat.stdout.on('data', function(d){
  console.log(d.toString());
});

cat.on('exit', function(){
  console.log('sfgsaf');
});

// we can send our new child data by using the 'child.stdin' stream. This is just a regular writable stream
cat.stdin.write('meow');
cat.stdin.end();
