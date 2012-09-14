var daysPerMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

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
		return daysPerMonth[month];
	}
}

var deleteFromArray = function(arr, value) {
	arr.splice(arr.indexOf(value), 1);
}

var removeFromArray = function(numbers, num) {
	var other = numbers.slice();
	other.splice(other.indexOf(num), 1);
	return other;
}

var daysAreValidForMonth = function(month, otherNumbers) {
	var numbers = otherNumbers.slice();
	numbers.splice(numbers.indexOf(month), 1);
	numbers.sort().reverse();
	var result = 0;
	
	numbers.forEach(function(num) {
		var potentialYear = removeFromArray(numbers, num);
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

