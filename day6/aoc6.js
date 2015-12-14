fs = require('fs')
readline = require('readline')

function print(lights) {
	var lightsOn = 0;

	for (var y=0; y<size; y++) {
		var row = lights[y];
		var str = "";
		for (var x=0; x<size; x++) {
			str += row[x];
			lightsOn += row[x];
		}
		// console.log(str);
	}
	console.log(lightsOn);
}

var rl = readline.createInterface({
	input: fs.createReadStream('./aoc_input.txt')
})

var size = 1000;
var lights = [];

for (var y=0; y<size; y++) {
	var row = [];
	for (var x=0; x<size; x++) {
		row[x] = 0;
	}
	lights[y] = row;
}



rl.on('line', function(line) {
	var cm;

	if (line.indexOf("turn on") >= 0) {
		cm = 1;
	} else if (line.indexOf("turn off") >= 0) {
		cm = -1;
	} else {
		cm = 2;
	}

	line = line.replace("turn on ", "");
	line = line.replace("turn off ", "");
	line = line.replace("toggle ", "");

	var commands = line.split(" ");
	/*
	*
	 0 - 0,0 
	 1 - through 
	 2 - 999,999
	*/

	var from = commands[0].split(",");
	var to = commands[2].split(",");
	var fromCoord = {y: parseInt(from[0]), x: parseInt(from[1])};
	var toCoord = {y: parseInt(to[0]), x:parseInt(to[1])};


	for (var y=fromCoord.y; y<=toCoord.y; y++) {
		for (var x=fromCoord.x; x<=toCoord.x; x++) {
			// if (cm == 0) {
			// 	lights[y][x] = !lights[y][x];
			// } else {
			// 	lights[y][x] = cm > 0;
			// }

			lights[y][x] += cm;
			if (lights[y][x] < 0)
				lights[y][x] = 0;
			// console.log(lights[y][x]);
		}
	}

	print(lights);
});