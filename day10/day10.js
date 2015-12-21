
var input = "1113122113";

for (var i =0; i<40; i++) {
    input = part1(input);
}

console.log(input.length);

// console.log(usingRegex(input));

function part1(input) {
    var currentChar = '';
    var count = '';

    var newStr = "";

    for (var i=0; i < input.length; i++) {
        // console.log(input[i]);
        var c = input[i];
        if (c == currentChar) {
            count++;
        } else {
            newStr += count + currentChar;
            currentChar = c;
            count = 1;
        }
    }
    newStr += count + currentChar;

    return newStr;
}

// function usingRegex(input) {
//     return input.match(/(.)\1/g);
// }