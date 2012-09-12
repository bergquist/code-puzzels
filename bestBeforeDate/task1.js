var daysPerMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

var isLeapyear = function(year) {
	if (year % 4 !== 0) {
		return false;
	}

	if (year % 100 === 0 && year % 400 !== 0) {
		return false;
	}

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

var getOtherNumberInArray = function(num, numbers) {
	var other = numbers.slice();
	other.splice(other.indexOf(num), 1);
	return other[0];
}

var daysAreValidForMonth = function(month, otherNumbers) {
	var numbers = otherNumbers.slice();
	numbers.splice(numbers.indexOf(month), 1);
	numbers.sort().reverse();
	var result = 0;
	
	_.each(numbers, function(num) {
		var potentialYear = getOtherNumberInArray(num, numbers);
		if (num <= getDaysPerMonth(month, potentialYear) 
			&& num > result) {

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

var handleAndSort = function(input) {
	var arr = input.split('/');

	var numbers = [];
	_.each(arr, function(n) { numbers.push(parseInt(n)); });
	numbers.sort();

	return numbers;
}

var validate = function(input) {
	var numbers = handleAndSort(input);

	var validMonths = returnValidMonths(numbers);
	console.log('validMonths ', validMonths);
	_.each(validMonths, function(month) {
		console.log('month', month);
		console.log('numbers ', numbers);
		var potDays = daysAreValidForMonth(month, numbers);
		console.log('potDays ', potDays);
	})
}

/*
-hitta potentiella månader.
-sortera efter storlek, störst först.
-verifiera att månaden kan ha något av dom övriga som dagar.
-om fler alternativ finns. ta det högsta för att få ett 
	så lågt år som möjlgit.
*/