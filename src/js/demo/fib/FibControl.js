define(['can', 'debug'], function (can, Debug) {
	'use strict';
	return can.Control.extend({
		defaults: {
			debug: false
		}
	}, {
		init: function () {
			this.debug = new Debug('', {debug: this.options.debug, control: 'Fib'});
			this.debug.log('-----------------------------Fibonacci------------------------------');
		},
		findPlace: function () {
			var test = this.place.replace(/[0-9]/g, ''),
				a = 0,
				b = 1,
				i,
				result,
				fibArray = [0, 1];

			this.debug.log(['character test:', test]);

			if (test !== '') {
				return 'That doesnt seem to be a number';
			} else if (this.place == a) {
				return 'Technically, there is no "zero place" in a sequence, only array indexes.';
			} else if (this.place == b) {
				return a;
			} else if (this.place == b + 1) {
				return a + b;
			} else {
				for (i = 0; i < this.place - 2; i++) {
					result = a + b;
					this.debug.log(['current result:', result]);

					if (i != this.place) {
						a = b;
						b = result;
						fibArray.push(result);
						this.debug.log(['current fibArray:', fibArray]);
					}
				}

				return result;
			}
		},
		'click': function () {
			this.debug.log(['clicked!', this.element]);
			this.place = this.element.prev('input').val();
			this.debug.log('finding position ' + this.place + ' in the sequence');
			this.element.next('span').remove();
			this.element.after('<span> = ' + this.findPlace() + '</span>');
		}
	});
});
