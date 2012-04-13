/*
describe("can validate leapyear", function() {
	describe("is leapyear", function() {
		it("2012", function() {
			expect(isLeapyear(2012)).toBeTruthy();
		});

		it("12", function() {
			expect(isLeapyear(12)).toBeTruthy();
		});

		it("2400", function() {
			expect(isLeapyear(2400)).toBeTruthy();
		});

		it("1600", function() {
			expect(isLeapyear(1600)).toBeTruthy();
		});

		it("1200", function() {
			expect(isLeapyear(1200)).toBeTruthy();
		});
	});

	describe("is not leapyear", function() {
		it("2013", function() {
			expect(isLeapyear(2013)).toBeFalsy();
		});

		it("13", function() {
			expect(isLeapyear(13)).toBeFalsy();
		});

		it("2100", function() {
			expect(isLeapyear(2100)).toBeFalsy();
		});
	});
});
*/
describe("Validates that valid days exist in given month", function() {

	it("3 is valid within 3/3/3", function() {
		var day = daysAreValidForMonth(3, [3, 3, 3]);
		expect(day).toEqual(3);
	});

	it("should return undefined of no day was found", function() {
		var day = daysAreValidForMonth(1, [1, 35, 35]);
		expect(day).toEqual(undefined);
	})

	describe("can handle leapyear", function() {
		beforeEach(function() {
			this.month = 2;
		})

		it("29/2/12 should return 29", function() {
			var day = daysAreValidForMonth(this.month, [29, 2, 12]);
			expect(day).toEqual(29);
		});

		it("50/2/28 should return 28", function() {
			var day = daysAreValidForMonth(this.month, [50, 2, 28]);
			expect(day).toEqual(28);
		});

		it("30/2/30 should return undefined", function() {
			var day = daysAreValidForMonth(this.month, [30, 2, 30]);
			expect(day).toEqual(undefined);
		});

	});
});

/*
describe("can parse and sort input", function() {
	describe("1/2/3", function() {
		it("should return [1, 2, 3]", function() {
			var output = handleAndSort("1/2/3")
			expect(output).toEqual([1, 2, 3]);
		});
	});
});

describe("can return valid years", function() {
	describe("[10, 200, -3, 12]", function() {
		it("should return [10, 12]", function() {
			var validYears = returnValidMonths([10, 200, -3, 12]);
			expect(validYears).toEqual([10, 12]);
		});
	});

	describe("[200, 200]", function() {
		it("should return []", function() {
			var validYears = returnValidMonths([200, 200]);
			expect(validYears).toEqual([]);
		});
	});
});
*/

describe("validate", function() {
	
	describe("28/2/12", function() {
		it("should return 2002-12-28", function() {
			var result = validate("28/2/12");
			expect(result).toEqual("2002-12-28");
		});
	});
	
	/*
	describe("28/28/12", function() {
		it("should return 2028-12-28", function() {
			var result = validate("28/28/12");
			expect(result).toEqual("2028-12-28");
		});
	});
	
	describe("30/30/30", function() {
		it("should return 30/30/30 is illegal", function() {
			var result = validate("30/30/30");
			expect(result).toEqual("30/30/30 is illegal");
		});		
	});
	*/
});

