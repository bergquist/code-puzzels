var Bilateral;
if (typeof(exports) !== 'undefined' && typeof(module) !== 'undefined') {
	Bilateral = require('./bilateral');
} else {
	Bilateral = window.Bilateral;
}

describe('bilateral', function() {
	/*
	it('Sample 1', function() {
		var input = '';
		input += "2\n";
		input += "1009 2011\n";
		input += "1017 2011\n";

		expect(Bilateral.calc(input)).toEqual([ 2011 ]);
	});

	it('Sample 2', function() {
		var input = '';
		input += '4\n';
		input += '1009 2000\n';
		input += '1009 2001\n';
		input += '1002 2002\n';
		input += '1003 2002\n';

		expect(Bilateral.calc(input)).toEqual([ 1009, 2002 ]);
	});
	*/
	it('My Sample', function() {
		var input = '';
		input += '8\n';
		input += '10 11\n';
		input += '8 11\n';
		input += '9 11\n';
		input += '10 12\n';
		input += '5 13\n';
		input += '5 15\n';
		input += '6 12\n';
		input += '7 12\n';
		input += '1 12\n';
		input += '1 16\n';
		input += '10 16\n';

		expect(Bilateral.calc(input)).toEqual([ 5, 11, 12, 16 ]);
	});
});