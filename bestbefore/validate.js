var validate = function(input) {
	var finalYear;
	var finalMonth;
	var finalDay;
	var nums = convertInput(input);

	var simpleYear = containsYear(nums);
	if (simpleYear) { 
		finalYear = simpleYear;
		nums = removeFromArray(nums, finalYear);
	}

	var validMonths = returnValidMonths(nums);
	
	if (validMonths.length >= 2 && finalYear === undefined) {
		validMonths.sort().reverse();
		finalYear = validMonths[0];
		validMonths = removeFromArray(validMonths, finalYear);
	}	

	var validDays = [];
	validMonths.forEach(function(i) {
		var day = daysAreValidForMonth(i, nums);
		if (day) {
			finalDay = day;
			finalMonth = i;
			nums = removeFromArray(nums, finalMonth);
		}
	});

	if (finalYear === undefined) {
		finalYear = removeFromArray(nums, finalDay)[0];
	}

	console.log('finalYear: ', finalYear, 'finalMonth: ', finalMonth, 'finalDay: ', finalDay);

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


/*

	- kolla om det finns något garanterat år.
		- 4 siffror
		- 31 <

	- kolla om det finns någon garanterad dag.
		- 12 < 32 <

	- 


-hitta potentiella månader.
-sortera efter storlek, störst först.
-verifiera att månaden kan ha något av dom övriga som dagar.
-om fler alternativ finns. ta det högsta för att få ett 
	så lågt år som möjlgit.
*/