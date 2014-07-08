/**
 * Created by liangyali on 14/7/9.
 * Description this is upload file test
 */

var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {

    // updaload the file and
    var file = fs.createWriteStream('1.tmp');
    req.pipe(file);

    console.log(req.headers);

    var start = new Date;

    var total = req.headers['content-length'];
    var uploadedBytes = 0;

    req.on('data',function(chunk){
          uploadedBytes+=chunk.length;
            var process = ((uploadedBytes/total)*100).toFixed(2) + '%\n';
            res.write(process);
    });

    req.on('end',function(){
       res.write("finished!\n");

        var time = new Date - start;

        res.write(time+'ms\n');
       res.end();
    });

}).listen(3000);


