describe('simple year', function() {
	describe('should be', function() {
		it('2001', function() { expect(containsYear([2001])).toBeTruthy(); });
		it('99', function() { expect(containsYear([99])).toBeTruthy(); });
		it('32', function() { expect(containsYear([32])).toBeTruthy(); });
		it('0', function() { expect(containsYear([0])).toEqual(0); });
	});
	
	describe('should not be', function() {
		it('34, 12', function() { expect(containsYear([34, 12]))});
	});
});


describe('validate', function() {
	describe("28/2/12", function() {
		it("should return 2002-12-28", function() {
			var result = validate("28/2/12");
			expect(result).toEqual("2002-12-28");
		});
	});

	describe("28/28/12", function() {
		it("should return 2028-12-28", function() {
			var result = validate("28/28/12");
			expect(result).toEqual("2028-12-28");
		});
	});
	
	describe('2001/02/03', function() {
		it('should return 2001-02-03', function() {
			var result = validate('2001/02/03');
			expect(result).toEqual('2001-02-03');
		})
	});
	
	describe("30/30/30", function() {
		it("should return 30/30/30 is illegal", function() {
			var result = validate("30/30/30");
			expect(result).toEqual("30/30/30 is illegal");
		});		
	});

	//spotify tests
	describe('02/4/67', function() {
		it('should return 2067-02-04', function() {
			expect(validate('02/4/67')).toEqual('2067-02-04');
		})
	});

	describe('31/9/73', function() {
		it('should return 2067-02-04 is illegal', function() {
			expect(validate('31/9/73')).toEqual('31/9/73 is illegal');
		})
	});

	describe('10/11/12', function() {
		it('should return 2010-11-12', function() {
			expect(validate('10/11/12')).toEqual('2010-11-12');
		})
	});	
});

