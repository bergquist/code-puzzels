(function() {
	'use strict';
	var root;
	if (typeof(exports) !== 'undefined') {
		root = exports;
	} else {
		root = window.Bilateral = {};
	}

	var friendId = 1009;

	root.calc = function(input) {
		var p = iterate(parseInput(input, sortByNeighbourCount), sortByNeighbourCount);
		//var p = iterate(parseInput(input, friendSort), friendSort);

		//var r = f.length > p.length ? p : f;
		var r = p;
		r.sort(function(a, b) { return a-b; });
		return r;
	}

	function iterate(persons, sorter, level) {
		level = level || 0;
		persons.forEach(printNode);

		var idToRemove = persons[level].id; 
		var toRemove = [];

		persons.forEach(function(pers, index) {
			if (pers.id === friendId) { return; }

			var pos = pers.neighbours.indexOf(idToRemove);
			if (pos >= 0) {
				persons[index].neighbours.splice(pos, 1);
			}

			if (persons[index].neighbours.length === 0) {
				toRemove.push(pers.id);
			}
		});

		console.log('- - - - - - ')
		toRemove.forEach(function(r) {
			persons.splice(persons.indexOf(r), 1);
		});

		persons.forEach(printNode);

		level += 1;
		if (persons[level] === undefined) { 
			var r = persons.map(function(p) { return p.id; }); 
			return r;
		}

		persons.sort(sortByNeighbourCount)
		return iterate(persons, sorter, level);
	}


	function parseInput(input, sorter) {
		var rows = input.split('\n');
		var result = [];
		for(var i = 1; i < rows.length - 1;++i) {
			var row = rows[i].split(' ');
			var sto = parseInt(row[0]);
			var lon = parseInt(row[1]);
			
			addNode(sto, lon);
			addNode(lon, sto);
		}

		function addNode(a, b) {
			if (result.some(function(i) { return i.id === a})) {
				result.forEach(function(r) {
					if (r.id === a) {
						r.neighbours.push(b);		
					}
				});
			} else {
				result.push({ id: a, neighbours: [ b ] });
			}
		}

		result.sort(sorter);
		return result;
	}

	function sortByNeighbourCount(a, b) {
		var diff = b.neighbours.length - a.neighbours.length;
		if (diff !== 0) { 
			return diff;			
		}

		return b.id - a.id; 
	}

	function friendSort(a, b) {
		var diff = b.neighbours.length - a.neighbours.length;
		if (diff === 0) {
			if (b.id === friendId) {
				return 1;
			} 

			return b.id - a.id;
		}

		return diff;	
	}

	function formatResponse(persons) {
		var result = persons.map(function(node) { return node.id; });
		result.sort(function(a, b) { return a-b; });
		return result;
	}

	function printNode(node) {
		console.log(node.id, node.neighbours);
	}
}).call(this);