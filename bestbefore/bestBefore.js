var isLeapyear = function(year) {
	if (year % 4 !== 0) { return false; }
	if (year % 100 === 0 && year % 400 !== 0) { return false; }
	return true;
}

var getDaysPerMonth = function(month, year) {
	if (month === 2) {
		if (isLeapyear(year)) {
			return 29;
		} else {
			return 28;
		}
	} else {
		return [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
	}
}

var deleteFromArray = function(arr, value) {
	arr.splice(arr.indexOf(value), 1);
}

var daysAreValidForMonth = function(month, otherNumbers) {
	var numbers = otherNumbers.slice();
	numbers.splice(numbers.indexOf(month), 1);
	numbers.sort(function(a, b) { return a-b; }).reverse();
	var result = 0;
	
	numbers.forEach(function(num) {
		var potentialYear = numbers.slice();
		potentialYear.splice(potentialYear.indexOf(num), 1);
		if (num <= getDaysPerMonth(month, potentialYear) && num > result) {
			result = num;
		}
	});

	return result == 0 ? undefined : result;
}

var returnValidMonths = function(numbers) {
	return numbers.filter(function(n) {
		return n <= 12 && n >= 1;
	});
}

var convertInput = function(input) {
	var arr = input.split('/');

	var numbers = [];
	arr.forEach(function(n) { numbers.push(parseInt(n)); })
	numbers.sort();
	return numbers;
}

var containsYear = function(numbers) {
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

var BestBefore = function(input) {
	this.input = input;
	this.numbers = convertInput(input);
	this.validMonths = [];
}

BestBefore.prototype.setHighestAsDay = function() {
	var self = this;
	this.validMonths.forEach(function(month) {
		var day = daysAreValidForMonth(month, self.numbers);
		if (day) {
			self.finalDay = day;
			self.finalMonth = month;
			deleteFromArray(self.numbers, self.finalMonth);
		}
	});
}

BestBefore.prototype.SetYear = function() {
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
	var simpleYear = containsYear(this.numbers);
	if (simpleYear) { 
		this.finalYear = simpleYear;
	} else if (this.validMonths.length >= 2) {
		this.validMonths.sort(function(a, b) { return a-b; });
		this.finalYear = this.validMonths[0];
		deleteFromArray(this.validMonths, this.finalYear);
	}

	if (this.finalYear) {
		deleteFromArray(this.numbers, this.finalYear);
	}
}

BestBefore.prototype.validate = function() {
	this.validMonths = returnValidMonths(this.numbers);
	this.tryToFindYear();
	this.setHighestAsDay();
	this.SetYear();

	if (this.finalYear && this.finalMonth && this.finalDay) {
		return this.formatResponse();
	} else {
		return  this.input + ' is illegal';
	}
}

var validate = function(input) {
	return new BestBefore(input).validate();
}

if (typeof(exports) !== 'undefined' && typeof(module) !== 'undefined') {
	console.log(this);
	module.exports = validate;
} else {
	window.validate = validate;
}