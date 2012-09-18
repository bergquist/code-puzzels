if (typeof(exports) !== 'undefined' && typeof(module) !== 'undefined') {
	var validate = require('./validate');
	console.log(validate);
}

describe('validate', function() {
	describe("28/2/12", function() {
		it("should return 2002-12-28", function() {
			expect(validate("28/2/12")).toEqual("2002-12-28");
		});
	});
	
	describe("28/28/12", function() {
		it("should return 2028-12-28", function() {
			expect(validate("28/28/12")).toEqual("2028-12-28");
		});
	});
	
	describe('2001/02/03', function() {
		it('should return 2001-02-03', function() {
			expect(validate('2001/02/03')).toEqual('2001-02-03');
		})
	});
	
	describe("30/30/30", function() {
		it("should return 30/30/30 is illegal", function() {
			expect(validate("30/30/30")).toEqual("30/30/30 is illegal");
		});		
	});

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

	describe('29/2/2012', function() {
		it('should return 2012-02-29', function() {
			expect(validate('29/2/2012')).toEqual('2012-02-29');
		})
	});
});