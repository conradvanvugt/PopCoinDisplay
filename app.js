var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var sys = require('sys')
var exec = require('child_process').exec;
var cors = require('cors')
   app.use(cors());
function puts(error, stdout, stderr) { sys.puts(stdout) }
exec("export DISPLAY=:0", puts);
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var router = express.Router();
app.use('/api', router);
router.route('/pay/:amount').post(function(req, res) {
                        var k = req.params.amount;
						var ksplit  = k.split('?beschrijving=');
						var bedrag = ksplit[0];
						var beschrijving = ksplit[1];
                           var url = "192.168.137.12:8080/index.html?generate=" + bedrag + '?beschrijving=' + beschrijving ;
                           exec("chromium-browser --kiosk " + url, puts);
   res.json({message : k + " " + url});

        });
 router.route('/success').post(function(req, res,next) {

        console.log('Transactie gebeurt');
exec("killall chromium-browser", puts);
        });


var server = app.listen(8000);
  console.log("Listening on 8000");
