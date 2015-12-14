crypto = require('crypto');


var five0s = function(str, i) {
    var hashStr = crypto.createHash('md5').update(str + i).digest('hex');
    if (hashStr.substring(0, 6) == "000000") {
        console.log(hashStr + ": " + i);
    }
    
};

var input = "iwrupvqb";

//console.log();
var i = 0;
while(true) {
    five0s(input, i);
    i++
}

