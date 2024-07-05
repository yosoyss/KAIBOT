var http = require('http');

http.createServer(function (req, res) {
  res.write('i am ok');
  res.end();
}).listen(1919);
