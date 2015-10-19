define(['can', 'debug'], function (can, Debug) {
	'use strict';
	return can.Control.extend({
		defaults: {
			debug: true
		}
	}, {
		init: function () {
			this.debug = new Debug({debug: this.options.debug, control: 'Pnote'});
			this.debug.log('----------------------------------------PNote--------------------------------------------------');
			this.operators = {
				"+": function (a, b) {
					return a + b
				},
				"-": function (a, b) {
					return a - b
				},
				"*": function (a, b) {
					return a * b
				},
				"/": function (a, b) {
					return a / b
				}
			};
		},
		calc: function (exp) {
			/**
			 * Stack to keep track of operands
			 */
			var stack = [],
				cursor,
				current,
				leftOperand,
				rightOperand,
				result;
			// scanning from right to left
			for (cursor = exp.length; cursor--;) {
				current = exp[cursor];

				// if it's an operand, then push it onto the stack
				if (/\d/.test(current)) {
					stack.push(current);
				} else if (current in this.operators) {

					// we pop (previously pushed) operands from
					// the stack and apply the operator to them
					leftOperand = +stack.pop();
					rightOperand = +stack.pop();

					// we compute the result and push it onto the stack
					result = this.operators[current](leftOperand, rightOperand);
					stack.push(result);
				}
			}

			return stack[0];
		},
		"click": function (el, ev) {
			ev.preventDefault();
			var result = this.calc(el.val());
			console.log('result', result);
			el.append('<span> = ' + result + '</span>');
		}
	});
});
