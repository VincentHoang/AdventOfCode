fs = require('fs')
readline = require('readline')

var cache = [];

var circuit = [];

fs.readFile('./aoc_input.txt', 'utf8', function(error, data) {
	
	var lines = data.split('\r\n');

	lines.forEach(function(line) {
		var ln = line.split(" ");
		var wire = ln[ln.length-1];

		if (line.indexOf('AND') >= 0) {
			circuit[wire] = {inputs: [ln[0], ln[2]], b: "AND"};
		}
		else if (line.indexOf('OR') >= 0) {
			circuit[wire] = {inputs: [ln[0], ln[2]], b: "OR"};
		}
		else if (line.indexOf('NOT') >= 0) {
			circuit[wire] = {inputs: [ln[1]],b: "NOT"};
		}
	 	else if (line.indexOf('LSHIFT') >= 0) {
	 		circuit[wire] = {inputs: [ln[0], ln[2]], b: "LSHIFT"};
	 	}
 		else if (line.indexOf('RSHIFT') >= 0) {
			circuit[wire] = {inputs: [ln[0], ln[2]], b: "RSHIFT"};
 		}
		else {
			circuit[wire] = ln[0];
		}
		
	});

	console.log(getValue('a'));
});

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function getValue(wireL) {
	if (isNumeric(wireL)) {
		return wireL;
	}

	if (cache[wireL] != undefined) {
		return cache[wireL];
	}

	var wire = circuit[wireL];

	if (isNumeric(wire)) {
		return wire;
	}
	if (wire.b == undefined) {
		return getValue(wire);	
	} else {

		var value;
		if (wire.b == "AND") {
			value = getValue(wire.inputs[0]) & getValue(wire.inputs[1]);
		} else if (wire.b == "OR") {
			value = getValue(wire.inputs[0]) | getValue(wire.inputs[1]);
		} else if (wire.b == "NOT") {
			value = 65535 - getValue(wire.inputs[0]);
		} else if (wire.b == "LSHIFT") {
			value = getValue(wire.inputs[0]) << wire.inputs[1];
		} else if (wire.b == "RSHIFT") {
			value = getValue(wire.inputs[0]) >> wire.inputs[1];
		} 

		cache[wireL] = value;
		return value;
	}
}
