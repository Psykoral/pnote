define(['can', 'debug'], function (can, Debug) {
	'use strict';
	return can.Control.extend({
		defaults: {
			debug: false
		}
	}, {
		init: function () {
			this.debug = new Debug('', {debug: this.options.debug, control: 'Reverse'});
			this.debug.log('-----------------------------Reverse------------------------------');
			this.reverseInput = this.element.prev('input');
		},
		'click': function () {
			this.debug.log(['clicked!', this.reverseInput]);
			this.reverseInput.val(this.reverseInput.val().split('').reverse().join(''));
		}
	});
});
