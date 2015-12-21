var fs = require('fs')


fs.readFile('./input.txt', 'utf8', function(err, data) {
    if (err)
        throw err;
    
    console.log(getSum(JSON.parse(data)));
});

function getSum(input) {
    if (!isNaN(input)) {
        return parseInt(input);
    }
    
    var sum = 0;
    for (var key in input) {
        var value = input[key];
        if (input.constructor !== Array && value === 'red') {
            return 0;
        }
        if (value != input) {
            sum += getSum(value);
        }
     }
     return sum;
}
//Apparently you can use lodash to make this simpler