define(['utils/pnote/PNote'], function (PNote) {
	'use strict';

	var pNote = new PNote();

	describe('Polish Notation Calculator', function () {
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
				expect(function () {
					pNote.calc('(/ 10 0)');
				}).to.throw('Division by zero error.');
			});

			it ('should multiply two numbers', function () {
				expect(pNote.calc('(* 10 0)')).toBe(0);
				expect(pNote.calc('(* 10 5)')).toBe(50);
			});

			it ('should calc complex nesting', function () {
				expect(pNote.calc('(* (+ 2 3) (- 10 6))')).toBe(20);
				expect(pNote.calc('(+ 1 (+ 2 (+ 3 (+ 4 5))))')).toBe(15);
			});

			it ('should accept decimals and integers', function () {
				expect(pNote.calc('(+ 2.5 2)')).toBe(4.5);
				expect(pNote.calc('(+ 5.4443 2)')).toBe(7.4443);
				expect(pNote.calc('(* 2.5 2)')).toBe(5);
			});
		});
	});
});
