var Lottery;
if (typeof(exports) !== 'undefined' && typeof(module) !== 'undefined') {
	Lottery = require('./lottery');
} else {
	Lottery = window.Lottery;
}

descibe('Lottery', function() {
	descibe('100 10 2 1', function() {
		it('should return 0.1', function() {

		});
	});

	descibe('100 10 2 2', function() {
		it('should return 0.1909090909', function() {

		});
	});

	descibe('10 10 5 1', function() {
		it('should return 1.0', function() {

		});
	});
});