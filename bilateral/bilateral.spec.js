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
	
	it('My Sample', function() {
		this.input += '8\n';
		this.input += '10 11\n';
		this.input += '8 11\n';
		this.input += '9 11\n';
		this.input += '10 12\n';
		this.input += '5 13\n';
		this.input += '5 15\n';
		this.input += '6 12\n';
		this.input += '7 12\n';
		this.input += '1 12\n';
		this.input += '1 16\n';
		this.input += '10 16\n';

		expect(Bilateral.calc(this.input)).toEqual([ 5, 11, 12, 16 ]);
	});

	it('Friend should not come since it increase people', function() {
		this.input += '8\n';
		this.input += '10 11\n';
		this.input += '8 11\n';
		this.input += '9 11\n';
		this.input += '10 12\n';
		this.input += '5 13\n';
		this.input += '5 15\n';
		this.input += '6 12\n';
		this.input += '1009 12\n';
		this.input += '1 12\n';
		this.input += '1 16\n';
		this.input += '10 16\n';

		expect(Bilateral.calc(this.input)).toEqual([ 5, 11, 12, 16 ]);
	});
	
});