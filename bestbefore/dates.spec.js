describe("Validates that valid days exist in given month", function() {
	it("3 is valid within 3/3/3", function() {
		var day = daysAreValidForMonth(3, [3, 3, 3]);
		expect(day).toEqual(3);
	});

	it("should return undefined of no day was found", function() {
		var day = daysAreValidForMonth(1, [1, 35, 35]);
		expect(day).toEqual(undefined);
	});

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

describe("can validate leapyear", function() {
	describe("is leapyear", function() {
		it("2012", function() { expect(isLeapyear(2012)).toBeTruthy(); });
		it("12", function() { expect(isLeapyear(12)).toBeTruthy(); });
		it("2400", function() { expect(isLeapyear(2400)).toBeTruthy(); });
		it("1600", function() { expect(isLeapyear(1600)).toBeTruthy(); });
		it("1200", function() { expect(isLeapyear(1200)).toBeTruthy(); });
	});

	describe("is not leapyear", function() {
		it("2013", function() { expect(isLeapyear(2013)).toBeFalsy(); });
		it("13", function() { expect(isLeapyear(13)).toBeFalsy(); });
		it("2100", function() { expect(isLeapyear(2100)).toBeFalsy(); });
	});
});

