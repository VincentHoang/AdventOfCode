var input = "cqjxjnds";

var output = input;
var iterations = 0;
// while(!meetsRequirements(output)) {
//     output = increment(output, input.length-1);
//     // console.log(output);
//     iterations++;
// }

while(true) {
    
    if (!legalLetters(output)) { //For performance
        iterations++;
        var i = output.search(/(i|o|l)/);
        output = increment(output, i);
        
        //turn all letters after that to a's
        output = output.substring(0, i+1) + Array(output.length-i).join('a');
        continue
    }
    
    if (!threeLettersInc(output) || !twoDoubles(output)) {
        iterations++;
        output = increment(output, input.length-1);
        continue;
    }
    
    break;
}
console.log(iterations);
console.log(output);

function increment(input, i) {
    if (i < 0) {
        return input;
    }
    if (input[i] == 'z') {
        return increment(replaceAt(input, i, 'a'), i-1);
    } else {
        return replaceAt(input, i, String.fromCharCode(input.charCodeAt(i) + 1));
    }
}

function replaceAt(str, index, character) {
    return str.substr(0, index) + character + str.substr(index+character.length);
}

function meetsRequirements(input) {
    return threeLettersInc(input) &&
            legalLetters(input) &&
            twoDoubles(input);
}

function threeLettersInc(input) {
    for (var i=0; i<input.length-1; i++) {
        if (checkSeq(input.substr(i, 3))) {
            return true;
        }
    }
    return false;
}

function checkSeq(str) {
    return str == str[0] + 
        String.fromCharCode(str.charCodeAt(0) + 1) +
        String.fromCharCode(str.charCodeAt(0) + 2);
}

function legalLetters(input) {
    return !/(i|o|l)/.test(input);
}

function twoDoubles(input) {
    return /(.)\1.*(.)\2/.test(input);
}