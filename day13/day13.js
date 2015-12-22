var fs = require('fs')

var map = {};
var permutations = [];
var highestTotalHapps = -1000;

fs.readFile('input.txt', 'utf8', function(err, data) {
   
    var lines = data.split("\r\n");
    
    lines.forEach(function(ln) {
        var values = ln.split(" ");
        var from = values[0];
        var happiness = parseInt(values[2] === "gain" ? values[3] : -values[3]);
        var to = values[10].replace(".", "");

        get(from)[to] = happiness;
    });
    
    //For Part 2
    for (var key in map) {
        console.log(key);
        map[key]["vince"] = 0;
        get("vince")[key] = 0;
    }
    
    calculateHighestTotalHapps([], Object.keys(map));
    console.log(highestTotalHapps);
    
});

function calculateHighestTotalHapps(head, tail) {

    if (tail.length == 1) {
        var totalHapps = getTotalHappiness(head.concat(tail));
        highestTotalHapps = Math.max(totalHapps, highestTotalHapps);
    }
    
    for (var i=0; i<tail.length; i++) {
        var temp = tail.slice(0);
        temp[0] = tail[i];
        temp[i] = tail[0];
        calculateHighestTotalHapps(head.concat(temp[0]), temp.slice(1, temp.length));
    }
    
}

function getTotalHappiness(people) {
    var totalHappiness = 0;
    for (var i=0; i<people.length; i++) {
        var current = people[i];
        var next = i<people.length-1 ? people[i+1] : people[0];
        
        totalHappiness += map[current][next] + map[next][current];
    }
    return totalHappiness;
}

function get(name) {
    if (map[name] == undefined)
        map[name] = {};
    return map[name];
}