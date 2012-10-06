(function() {
	'use strict';
	var root;
	if (typeof(exports) !== 'undefined') {
		root = exports;
	} else {
		root = window.Bilateral = {};
	}

	function Node(id, neighbour) {
		this.id = id;
		this.neighbours = [ neighbour ];
	}

	var persons;

	root.calc = function(input) {
		persons = parse(input);
		kill();
		return persons.map(function(node) { return node.id; }).sort(function(a, b) { return a-b; });
	}

	function kill(level) {
		level = level || 0;
		if (persons[level] === undefined) { return; }

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

		toRemove.forEach(function(r) {
			persons.splice(persons.indexOf(r), 1);
		});

		persons.sort(sortPersons)
		kill(++level);
	}


	function parse(input) {
		var rows = input.split('\n');
		var result = [];
		for(var i = 1; i < rows.length - 1;i++) {
			var row = rows[i].split(' ');
			var sto = parseInt(row[0]);
			var lon = parseInt(row[1]);
			
			addNode(sto, lon);
			addNode(lon, sto);
		}

		function addNode(a, b) {
			if (result[a] === undefined) {
				result[a] = new Node(a, b);
			} else {
				result[a].neighbours.push(b);
			}
		}

		result.sort(sortPersons);
		return result;
	}

	function sortPersons(a, b) {
		var diff = b.neighbours.length - a.neighbours.length;
		if (diff === 0) {
			return b.id - a.id;
		}

		return diff;
	}

	function printNode(node) {
		console.log(node.id, node.neighbours);
	}
}).call(this);