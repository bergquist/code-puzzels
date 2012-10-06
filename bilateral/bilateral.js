(function() {
	'use strict';
	var root;
	if (typeof(exports) !== 'undefined') {
		root = exports;
	} else {
		root = window.Bilateral = {};
	}

	root.calc = function(input) {
		var p = iterate(parseInput(input, sortByNeighbourCount), sortByNeighbourCount);
		var f = iterate(parseInput(input, friendSort), friendSort);

		var r = f.length > p.length ? p : f;
		r.sort(function(a, b) { return a-b; });
		return r;
	}

	function iterate(persons, sorter, level) {
		level = level || 0;
		console.log(level	)
		if (persons[level] === undefined) { 
			var r = persons.map(function(p) { return p.id; }); 
			console.log('returning: ', r);
			return r;
		}

		persons.forEach(printNode);

		var idToRemove = persons[level].id; 
		var toRemove = [];

		persons.forEach(function(pers, index) {
			var pos = pers.neighbours.indexOf(idToRemove);
			if (pos >= 0) {
				persons[index].neighbours.splice(pos, 1);
			}

			if (persons[index].neighbours.length === 0) {
				toRemove.push(pers.id);
			}
		});

		console.log('toRemove: ', toRemove)
		toRemove.forEach(function(r) {
			persons.splice(persons.indexOf(r), 1);
		});

		persons.sort(sortByNeighbourCount)
		return iterate(persons, sorter, level + 1);
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
			if (result[a] === undefined) {
				result[a] = { id: a, neighbours: [ b ] };
			} else {
				result[a].neighbours.push(b);
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
			if (b.id === 1009) {
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