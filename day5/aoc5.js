fs = require('fs')
readline = require('readline')


function atLeastThreeVowels(str) {
	return /(.*[aeiou].*){3}/.test(str);
}

function hasADuplicateLetter(str) {
	return /(.)\1/.test(str);
}

function specialCase(str) {
	return !/(ab)|(cd)|(pq)|(xy)/.test(str);
}

function isNiceOne(str) {
	return atLeastThreeVowels(str) &&
		hasADuplicateLetter(str) &&
		specialCase(str);
}

function hasADuplicatePair(str) {
	return /(..).*\1/.test(str);
}

function hasADuplicateWithOneLetterBetwen(str) {
	return /(.).\1/.test(str);
}

function isNiceTwo(str) {
	return hasADuplicatePair(str) &&
		hasADuplicateWithOneLetterBetwen(str);
}

var rl = readline.createInterface({
	input: fs.createReadStream('./aoc_input.txt')
})

// console.log(isNice("dvszwmarrgswjxmb"));
// console.log(atLeastThreeVowels("ugknbfddgicrmopn"));
// console.log(hasADuplicateLetter("ugknbfddgicrmopn"));
// console.log(specialCase("ugknbfddgicrmopn"));

console.log(hasADuplicatePair("uurcxstgmygtbstg"));
console.log(hasADuplicateWithOneLetterBetwen("uurcxstgmygtbstg"));

var i = 0;
rl.on('line', function(line) {

	if (isNiceTwo(line)) {
		i++;
	}

	console.log(i);
});


// fs.readFile('./aoc_input.txt', 'utf8', function(err, data) {
// 	atLeastThreeVowels(data);
// });
