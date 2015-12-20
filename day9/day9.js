/* global fs */
fs = require('fs')

var map = [];
var shortestRoute = -1;
var longestRoute = 0;

fs.readFile('./input.txt', 'utf8', function(err, data){
    if (err) {
        throw err;
    }
    
    // console.log(data);
    
    var line = data.split("\r\n");
    
    line.forEach(function(ln) {
        var values = ln.split(" ");
        var d1 = values[0];
        var d2 = values[2];
        var distance = values[4];
        
        if (map[d1] == undefined) map[d1] = [];
        map[d1].push(new Node(d1, d2, distance));
        
        if (map[d2] == undefined) map[d2] = [];
        map[d2].push(new Node(d2, d1, distance));
       
    });
    
    
    for (var key in map) {
        shortestFrom(null, key, [], map, 0);
    }
    
    console.log("shortest: "+ shortestRoute);
    console.log("longest: " + longestRoute);
});

function shortestFrom(previousLoc, currentLoc, markedLocs, map, cumDist) {
    // console.log(currentLoc + ": "+ JSON.stringify(markedLocs));
    
    markedLocs[currentLoc] = true;
    
    map[currentLoc].forEach(function(node) {
        // console.log("going to: " + node.to);
        if (node.to == previousLoc) {
            return ;
        }
        
        if (markedLocs[node.to] == undefined) {

            var copy = Object.assign({}, markedLocs);
            copy[node.to] = true;
            
            var newCumDist = cumDist + node.distance;
            // console.log(currentLoc + " To "+ node.to + ": "+ newCumDist);
            shortestFrom(currentLoc, node.to, 
                    copy, 
                    map, 
                    newCumDist);
        } else if (Object.keys(markedLocs).length == Object.keys(map).length) {
            // console.log("end: "+ cumDist);
            if (cumDist < shortestRoute || shortestRoute < 0) {
                shortestRoute = cumDist;
            } 
            
            if (cumDist > longestRoute) {
                longestRoute = cumDist;
            }
        }
        
    });

}

var Node = function(from, to, distance) {
    this.from = from;
    this.to = to;
    this.distance = parseInt(distance);
}