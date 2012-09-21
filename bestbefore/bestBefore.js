(function() {
	'use strict';
	var root;
	if (typeof(exports) !== 'undefined') {
		root = exports;
	} else {
		root = window.BestBefore = {};
	}

	root.validate = function(input) {
		return new BestBefore(input).validate();
	}

	function BestBefore(input) {
		this.input = input;
		var numbers = this.numbers = [];
		input.split('/').forEach(function(n) { numbers.push(parseInt(n)); })
		this.validMonths = [];
	}

	BestBefore.prototype.validate = function() {
		this.validMonths = returnValidMonths(this.numbers);
		this.tryToFindYear();
		this.setHighestAsDay();
		this.setYearIfMissing();

		if (this.finalYear && this.finalMonth && this.finalDay) {
			return this.formatResponse();
		} else {
			return  this.input + ' is illegal';
		}
	}

	BestBefore.prototype.setHighestAsDay = function() {
		var self = this;
		var numbers = self.numbers.slice();
		numbers.sort(function(a, b) { return a-b; }).reverse();
		
		this.validMonths.forEach(function(month) {
			deleteFromArray(numbers, month)

			var day = false;			
			numbers.forEach(function(value) {
				var potentialYear = numbers.slice();
				deleteFromArray(potentialYear, value);

				if (value <= getDaysPerMonth(month, potentialYear) && value > day) {
					day = value;
				}
			});
			
			if (day) {
				self.finalDay = day;
				self.finalMonth = month;
				deleteFromArray(self.numbers, self.finalMonth);
			}
		});
	}

	BestBefore.prototype.setYearIfMissing = function() {
		if (this.finalYear === undefined) {
			deleteFromArray(this.numbers, this.finalDay);
			this.finalYear = this.numbers[0];
		}
	}

	BestBefore.prototype.formatResponse = function() {
		if (this.finalYear < 2000) {
			this.finalYear += 2000;
			this.finalYear = this.finalYear.toString();
		}

		if (this.finalMonth < 10) { 
			this.finalMonth = '0' + this.finalMonth.toString();
		}

		if (this.finalDay < 10) {
			this.finalDay = '0' + this.finalDay.toString();
		}

		return this.finalYear + '-' + this.finalMonth + '-' + this.finalDay;
	}

	BestBefore.prototype.tryToFindYear = function() {
		var foundYear = containsYear(this.numbers);
		if (foundYear) { 
			this.finalYear = foundYear;
		} else if (this.validMonths.length >= 2) {
			this.validMonths.sort(function(a, b) { return a-b; });
			this.finalYear = this.validMonths[0];
			deleteFromArray(this.validMonths, this.finalYear);
		}

		if (this.finalYear) {
			deleteFromArray(this.numbers, this.finalYear);
		}
	}

	function isLeapyear(y) {
		if ((y % 4 !== 0) || (y % 100 === 0 && y % 4 !== 0)) { return false; } //400 is not needed. rephrase if-statement
		return true;
	}

	function getDaysPerMonth(month, year) {
		if (month === 2) {
			return isLeapyear(year) ? 29 : 28;	
		} 
		return [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
	}

	function deleteFromArray(arr, value) {
		arr.splice(arr.indexOf(value), 1);
	}

	function returnValidMonths(numbers) {
		return numbers.filter(function(n) { return n <= 12 && n >= 1; });
	}

	function containsYear(numbers) {
		var result = false;

		numbers.forEach(function(i) {
			var fourDigit = i.toString().length === 4;
			var highNumber = i > 31 && i <= 99;
			var zero = (i === 0);
			
			if (fourDigit || highNumber || zero) {
				result = i;
			}
		});

		return result;
	}
}).call(this);