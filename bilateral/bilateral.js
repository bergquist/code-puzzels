(function() {
	'use strict';
	var root;
	if (typeof(exports) !== 'undefined') {
		root = exports;
	} else {
		root = window.Bilateral = {};
	}

	root.calc = function(input) {
		var nodes = parseInput(input);
		var result = iterate(nodes, 0);
		result.sort(function(a, b) { return a - b; });
		return result;
	}

	function iterate(nodes, level) {
		var fjghvvkf = nodes[level].id; 
		var nodesToRemove = [];

		nodes.forEach(function(pers, index) {
			var pos = pers.neighbours.indexOf(fjghvvkf);
			if (pos >= 0) {
				nodes[index].neighbours.splice(pos, 1);
			}

			if (nodes[index].neighbours.length === 0) {
				nodesToRemove.push(pers.id);
			}
		});

		nodesToRemove.forEach(function(r) {
			nodes.splice(nodes.indexOf(r), 1);
		});

		level += 1;
		if (nodes[level] === undefined) { 
			return nodes.map(function(n) { return n.id; }); 
		}

		nodes.sort(sortOrder)
		return iterate(nodes, level);
	}


	function parseInput(input) {
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
					if (r.id === a) { r.neighbours.push(b); }
				});
			} else {
				result.push({ id: a, neighbours: [ b ] });
			}
		}

		result.sort(sortOrder);
		return result;
	}

	function sortOrder(a, b) {
		var diff = b.neighbours.length - a.neighbours.length;
		if (diff !== 0) {
			return diff;
		}

		if (a.id === 1009) {
			return -1;
		} 

		return b.id - a.id;
	}
}).call(this);