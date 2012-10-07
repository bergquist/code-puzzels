var Bilateral;
if (typeof(exports) !== 'undefined' && typeof(module) !== 'undefined') {
	Bilateral = require('./bilateral');
} else {
	Bilateral = window.Bilateral;
}

describe('bilateral', function() {
	beforeEach(function() { this.input = ''; });
	
	it('Sample 1', function() {
		this.input += '2\n';
		this.input += '1009 2011\n';
		this.input += '1017 2011\n';

		expect(Bilateral.calc(this.input)).toEqual([ 2011 ]);
	});
	
	it('Sample 2', function() {
		this.input += '4\n';
		this.input += '1009 2000\n';
		this.input += '1009 2001\n';
		this.input += '1002 2002\n';
		this.input += '1003 2002\n';

		expect(Bilateral.calc(this.input)).toEqual([ 1009, 2002 ]);
	});

	it('Friend should not come since it increase people', function() {
		this.input += '8\n';
		this.input += '1010 2011\n';
		this.input += '1008 2011\n';
		this.input += '1009 2011\n';
		this.input += '1010 2012\n';
		this.input += '1005 2013\n';
		this.input += '1005 2015\n';
		this.input += '1006 2012\n';
		this.input += '1009 2012\n';
		this.input += '1001 2012\n';
		this.input += '1001 2016\n';
		this.input += '1010 2016\n';

		expect(Bilateral.calc(this.input)).toEqual([ 1005, 2011, 2012, 2016 ]);
	});
	
});