var validate = function(input) {
	var finalYear;
	var finalMonth;
	var finalDay;
	var nums = convertInput(input);

	var simpleYear = containsYear(nums);
	if (simpleYear) { 
		finalYear = simpleYear;
		deleteFromArray(nums, finalYear);
	}

	var validMonths = returnValidMonths(nums);
	if (validMonths.length >= 2 && finalYear === undefined) {
		validMonths.sort().reverse();
		finalYear = validMonths[0];
		validMonths = removeFromArray(validMonths, finalYear);
	}	

	validMonths.forEach(function(i) {
		var day = daysAreValidForMonth(i, nums);
		if (day) {
			finalDay = day;
			finalMonth = i;
			deleteFromArray(nums, finalMonth);
		}
	});

	if (finalYear === undefined) {
		finalYear = removeFromArray(nums, finalDay)[0];
	}

	if (finalYear === undefined || finalMonth === undefined || finalDay === undefined) {
		return input + ' is illegal';
	}
	return formatDate(finalYear, finalMonth, finalDay);
}

function formatDate(year, month, day) {
	if (year < 2000) {
		year += 2000;
		year = year.toString();
	}

	if (month < 10) {
		month = '0' + month.toString();
	}

	if (day < 10) {
		day = '0' + day.toString();
	}

	return year + '-' + month.toString() + '-' + day.toString();
}