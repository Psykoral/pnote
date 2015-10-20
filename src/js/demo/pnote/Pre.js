/**
 * @file PNote.js
 * @desc Prefix notation calculator
 *
 * @author psykoral
 * @since 10/20/15 7:58 PM
 *
 * @requires can
 * @requires debug
 */

define(['can', 'debug'], function (can, Debug) {
	'use strict';

	/**
	 * @func PNote
	 * @desc can Control for Prefix notation calculations
	 *
	 * @constructs can.Control.extend.PNote
	 * @returns {can.Control.extend.PNote}
	 */
	return can.Control.extend({
		defaults: {
			debug: false,
			operators: ['+', '-', '*', '/']
		}
	}, {
		/**
		 * @func init
		 * @desc initializing PNote constructor
		 * @memberof PNote
		 */
		init: function () {
			this.debug = new Debug(this.element, {debug: this.options.debug, control: 'PNote'});
			this.debug.log('----------------------------------------PNote--------------------------------------------------');
		},
		/**
		 * @func inReverse
		 * @desc Converts the String to an Array and reverses the order
		 * @param str {String} gets split into individual items and sent in reverse order
		 * @returns {Array}
		 * @memberof PNote
		 */
		inReverse: function (str) {
			return str.split('').reverse().join('');
		},
		/**
		 * @func isNumeric
		 * @desc Checks for for operators vs. operands
		 * @param parse {String}
		 * @returns {Boolean}
		 * @memberof PNote
		 */
		isNumeric: function (parse) {
			this.debug.log(['parse', parse]);
			this.debug.log(['is it a number?', !isNaN(parseFloat(parse)) && isFinite(parse)]);
			return !isNaN(parseFloat(parse)) && isFinite(parse);
		},
		/**
		 * @func calc
		 * @desc Does all the situational splitting and mapping for handling the prefix notations
		 * @param prefix {String} Prefix notation string pulled in from data-seed-pnote button values
		 * @imports this.inReverse
		 * @imports this.isNumeric
		 * @imports this.ops
		 * @returns {String}
		 * @memberof PNote
		 */
		calc: function (prefix) {
			var results = [],
				answer = [],
				postfix = this.inReverse(prefix.replace(/["'()]/g, "")).split(' '),
				i;

			this.debug.log(['postfix', postfix]);

			for (i = 0; i < postfix.length; i++) {
				if (postfix[i].length > 1) {
					postfix[i] = this.inReverse(postfix[i]);
				}

				this.debug.log(['postfix[i]', postfix[i]]);

				if (this.isNumeric(postfix[i])) {
					this.debug.log(['Its numeric, adding', postfix[i]]);
					results.push(postfix[i]);
				} else {
					this.debug.log(['Found an operator', postfix[i]]);
					this.debug.log(['is it last?', i, ' ~ ', postfix.length - 1]);
					this.debug.log(['answer', answer]);

					if (results.length == 2) {
						if (postfix[i] == '-' || postfix[i] == '/') {
							results = results.reverse();
						}
					}
					answer.push(this.ops(postfix[i], results));
					this.debug.log(['answer', answer]);
					results = [];
					this.debug.log(['empty the resultStack', results]);

					if (typeof postfix[i + 1] !== 'undefined' && !this.isNumeric(postfix[i + 1])) {
						answer = this.ops(postfix[i + 1], [answer[1], answer[0]]);
						this.debug.log(['last item is an OP, recalculating answer:', answer]);
						break;
					} else if (answer.length > 1) {
						answer = this.ops(postfix[i], [answer[1], answer[0]]);
						this.debug.log(['recalculating answer:', answer]);
					}
				}
			}

			if (answer == 'Infinity') {
				return 'error';
			} else if (can.isArray(answer) && answer.length == 1) {
				return answer.pop();
			} else if (!can.isArray(answer) && this.isNumeric(parseFloat(answer))) {
				return answer;
			} else {
				return 'error';
			}
		},
		/**
		 * @func ops
		 * @desc Does the math on the array of operands as they are applied to the operators
		 * @param op {String} Operator
		 * @param stack {Array} Operands
		 * @returns {String}
		 * @memberof PNote
		 */
		ops: function (op, stack) {
			var results = 0;

			can.each(stack, function (v, i) {
				if (i == 0) {
					results = parseFloat(v);
				} else {
					switch (op) {
						case '+':
							results = results + parseFloat(v);
							break;
						case '-':
							results = results - parseFloat(v);
							break;
						case '*':
							results = results * parseFloat(v);
							break;
						case '/':
							results = results / parseFloat(v);
							break;
					}
				}
			});

			return results;
		},
		/**
		 * @func showResult
		 * @desc Applies the result to the bound element
		 * @param el {Object} Data bound button element
		 * @imports this.calc
		 * @memberof PNote
		 */
		showResult: function (el) {
			var result = this.calc(el.val());
			if (el.next('span').length > 0) {
				el.next('span').remove();
			}
			el.after('<span> = ' + result + '</span>');
		},
		/**
		 * @event click
		 * @desc Watches the data bound button for clicks, starts the process
		 * @param el {Object} Data bound button element
		 * @param ev {Event} Click event
		 * @imports this.showResult
		 * @memberof PNote
		 */
		"click": function (el, ev) {
			ev.preventDefault();
			this.showResult(el);
		}
	});
});
