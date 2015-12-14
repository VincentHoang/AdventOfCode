fs = require('fs');
Set = require('collections/set');

var content;
fs.readFile('aoc.txt', 'utf8', function(err, data) {
	
	var x = 0;
	var y = 0;
	
	var x2 = 0;
	var y2 = 0;
	
	var isRobot = false;
	
	var houses = new Set();
	
	houses.add(JSON.stringify({x: x, y: y}));
	
	for (var i=0; i < data.length; i++) {
		var d = data[i];
		
		if (isRobot) {
			if (d == '<')
				x2 += 1;
			if (d == '>')
				x2 -= 1;
			if (d == '^') 
				y2 += 1;
			if (d == 'v')
				y2 -= 1;	
				
			houses.add(JSON.stringify({x: x2, y: y2}));	
		} else {
			if (d == '<')
				x += 1;
			if (d == '>')
				x -= 1;
			if (d == '^') 
				y += 1;
			if (d == 'v')
				y -= 1;	
				
			houses.add(JSON.stringify({x: x, y: y}));
		}
		
		isRobot = !isRobot;
		
	}
	

	houses.forEach(function(h) {
		console.log(h);
	});
	
	console.log(houses.length);
	
	
});

//console.log(content);