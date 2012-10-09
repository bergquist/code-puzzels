(function() {
	'use strict';
	var root;
	if (typeof(exports) !== 'undefined') {
		root = exports;
	} else {
		root = window.Bilateral = {};
	}

	root.calc = function(input) {
		var relations = parseInput(input);
		var nodes = buildGraph(relations);
		var result = iterate(nodes, 0);
		result.sort(function(a, b) { return a - b; });
		return result;
	}

	function iterate(nodes, level) {
		var idToremove = nodes[level].id; 
		var nodesToRemove = [];

		//remove relations from others nodes to current.
		nodes.forEach(function(pers, index) {
			var pos = pers.neighbours.indexOf(idToremove);
			if (pos > -1) {
				nodes[index].neighbours.splice(pos, 1);
			}
		});

		//select nodes without any relations
		var nodesToRemove = nodes.filter(function(n) {
			return n.neighbours.length === 0
		});

		//delete nodes without relations.
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
		
		var relations = [];
		for(var i = 1, len = rows.length - 1; i < len;++i) {
			var row = rows[i].split(' ');
			var sto = parseInt(row[0]);
			var lon = parseInt(row[1]);
			relations.push({ sto: sto, lon: lon });
		}

		return relations;
	}

	function buildGraph(relations) {
		var result = [];
		
		//Adds or update relations from both sides.
		relations.forEach(function(n) {
			addNode(n.sto, n.lon);
			addNode(n.lon, n.sto);
		});

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

		return a.id === 1009 ? -1 : b.id - a.id;
	}
}).call(this);