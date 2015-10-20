define(['can', 'demo/pnote/Pre'], function (can, PNote) {
	'use strict';

	var pNote = new PNote(),
		testReverse = '- 5 4 3 2 1',
		testIsNumericTrue = '1000',
		testIsNumericFalse = '1000P',
		testOps = ['20', '10'],
		testshowResult = '<button id="showResult" value="(+ 5 4 3 2 1)">+ 5 4 3 2 1</button>';

	describe('Polish Notation Calculator', function () {
		describe ('init method', function () {
			it ('should init a new Debug class', function () {
				expect(typeof pNote.debug.log === 'function').toBeTruthy();
			});
		});
		describe ('inReverse method', function () {
			it ('should take in a string, split it into an Array, then reverse it back into a String', function () {
				expect(typeof pNote.inReverse(testReverse)).toBe('string');
				expect(pNote.inReverse(testReverse)).toBe('1 2 3 4 5 -');
			});
		});
		describe ('isNumeric method', function () {
			it ('should return true or false if the item is a number', function () {
				expect(pNote.isNumeric(testIsNumericTrue)).toBeTruthy();
				expect(pNote.isNumeric(testIsNumericFalse)).toBeFalsy();
			});
		});
		describe ('calc method', function () {
			it ('should add two numbers', function () {
				expect(pNote.calc('(+ 1 2)'), '1 + 2').toBe(3);
			});

			it ('should subtract two numbers', function () {
				expect(pNote.calc('(- 10 6)')).toBe(4);
			});

			it ('should divide two numbers', function () {
				expect(pNote.calc('(/ 10 2)')).toBe(5);
				expect(pNote.calc('(/ 1 5)')).toBe(0.2);
			});

			it ('should not allow division by zero', function () {
				expect(pNote.calc('(/ 10 0)')).toBe('error');
			});

			it ('should multiply two numbers', function () {
				expect(pNote.calc('(* 10 0)')).toBe(0);
				expect(pNote.calc('(* 10 5)')).toBe(50);
			});

			it ('should accept decimals and integers', function () {
				expect(pNote.calc('(+ 2.5 2)')).toBe(4.5);
				expect(pNote.calc('(+ 5.4443 2)')).toBe(7.4443);
				expect(pNote.calc('(* 2.5 2)')).toBe(5);
			});
		});
		describe ('ops method', function () {
			it ('should return the correct math result', function () {
				expect(pNote.ops('+', testOps)).toBe(30);
				expect(pNote.ops('-', testOps)).toBe(10);
				expect(pNote.ops('*', testOps)).toBe(200);
				expect(pNote.ops('/', testOps)).toBe(2);
			});
		});
		describe ('showResult method', function () {
			it ('should find the trigger element and add the answer to a span after it', function () {
				can.$('body').append(testshowResult);
				var el = can.$('#showResult');
				expect(el.length).toBe(1);
				expect(el.find('span').length).toBe(0);
				pNote.showResult(el);
				expect(el.next('span').length).toBe(1);
			});
		});
	});
});
