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

var BestBefore = function(input) {
	this.input = input;
	this.numbers = convertInput(input);
	this.validMonths = [];
}

BestBefore.prototype.findSimpleYear = function() {
	var simpleYear = containsYear(this.numbers);
	if (simpleYear) { 
		this.finalYear = simpleYear;
		deleteFromArray(this.numbers, this.finalYear);
	}
}

BestBefore.prototype.findValidMonths = function() {
	this.validMonths = returnValidMonths(this.numbers);
	
	//bryt ut till egen method
	if (this.validMonths.length >= 2 && this.finalYear === undefined) {
		this.validMonths.sort().reverse();
		this.finalYear = this.validMonths[0];
		this.validMonths = removeFromArray(this.validMonths, this.finalYear);
	}
}

BestBefore.prototype.findValidDays = function() {
	var self = this;
	this.validMonths.forEach(function(i) {
		var day = daysAreValidForMonth(i, self.numbers);
		if (day) {
			self.finalDay = day;
			self.finalMonth = i;
			deleteFromArray(self.numbers, self.finalMonth);
		}
	});
}

BestBefore.prototype.isDateValid = function() {
	return this.finalYear !== undefined &&
		this.finalMonth !== undefined &&
		this.finalDay !== undefined;
}

BestBefore.prototype.SetYear = function() {
	if (this.finalYear === undefined) {
		this.finalYear = removeFromArray(this.numbers, this.finalDay)[0];
	}
}

BestBefore.prototype.formatDate = function() {
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

BestBefore.prototype.validate = function() {
	this.findSimpleYear();
	this.findValidMonths();
	this.findValidDays();
	this.SetYear();

	if (this.isDateValid()) {
		return this.formatDate();
	} else {
		return  this.input +' is illegal';
	}
}

var validate = function(input) {
	var validator = new BestBefore(input);
	return validator.validate();
}

var Oldvalidate = function(input) {
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