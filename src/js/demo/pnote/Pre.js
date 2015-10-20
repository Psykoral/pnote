define(['can'], function (can) {
	'use strict';
	return can.Control.extend({
		defaults: {
			debug: true,
			operators: ['+', '-', '*', '/']
		}
	}, {
		init: function () {
			console.log('----------------------------------------PNote--------------------------------------------------');
		},
		inReverse: function (str) {
			return str.split('').reverse().join('');
		},
		isNumeric: function (parse) {
			console.log('parse', parse);
			console.log('is it a number?', !isNaN(parseFloat(parse)) && isFinite(parse));
			return !isNaN(parseFloat(parse)) && isFinite(parse);
		},
		calc: function (prefix) {
			var results = [],
				answer = [],
				postfix = this.inReverse(prefix.replace(/["'()]/g, "")).split(' '),
				i;

			console.log('postfix', postfix);

			for (i = 0; i < postfix.length; i++) {
				if (postfix[i].length > 1) {
					postfix[i] = this.inReverse(postfix[i]);
				}

				console.log('postfix[i]', postfix[i]);

				if (this.isNumeric(postfix[i])) {
					results.push(postfix[i]);
				} else {
					console.log('Found an operator', postfix[i]);
					console.log('is it last?', i, ' ~ ', postfix.length - 1);
					console.log('answer', answer);
					answer.push(this.ops(postfix[i], results));
					console.log('answer', answer);
					results = [];
					console.log('empty the resultStack', results);

					if (typeof postfix[i + 1] !== 'undefined' && !this.isNumeric(postfix[i + 1])) {
						answer = this.ops(postfix[i + 1], [answer[1], answer[0]]);
						console.log('last item is an OP, recalculating answer:', answer);
						break;
					} else if (answer.length > 1) {
						answer = this.ops(postfix[i], [answer[1], answer[0]]);
						console.log('recalculating answer:', answer);
					}
				}
			}

			if (can.isArray(answer) && answer.length == 1) {
				return answer.pop();
			} else if (!can.isArray(answer) && this.isNumeric(parseInt(answer))) {
				return answer;
			} else {
				return 'error';
			}
		},
		ops: function (op, stack) {
			var results = 0;

			can.each(stack, function (v, i) {
				if (i == 0) {
					results = parseInt(v);
				} else {
					switch (op) {
						case '+':
							results = results + parseInt(v);
							break;
						case '-':
							results = results - parseInt(v);
							break;
						case '*':
							results = results * parseInt(v);
							break;
						case '/':
							results = results / parseInt(v);
							break;
					}
				}
			});

			return results;
		},
		showResult: function (el) {
			var result = this.calc(el.val());
			if (el.next('span').length > 0) {
				el.next('span').remove();
			}
			el.after('<span> = ' + result + '</span>');
		},
		"click": function (el, ev) {
			ev.preventDefault();
			this.showResult(el);
		}
	});
});
