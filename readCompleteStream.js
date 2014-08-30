/* We know its important not to block the loop for Node to perform well. To achieve this we can use the
'Spooling' pattern. This way when reading a stream of data we only use the data once we have enough or all
of the data we want to use. Remember that data streams are received in chunks and these chunks don't always come in the
correct order either. In this way we use a stream to get the data, but use the data only when enough is available.
Typically this means when the stream ends, but it could be another envent or condition.
*/


    //abstract strem
var spool = "";
stream.on('data', function(data){
  spool += data;
});

stream.on('end', function(){
  console.log(spool);
});
