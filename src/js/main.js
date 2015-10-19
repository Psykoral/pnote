/**
 * @file Flippydisk Grunt Starter Kit
 * @author Adobe Client Engineering
 * @version: 0.0.1
 * @extends demo
 */

/** Disable the global Can object if you have other CanJS integrations you don't want to interfere with. */
// window.GLOBALCAN = false;

/**
 * @desc Establishing Flippydisk Global Namespace under window.Flippydisk
 */
(function () {
	'use strict';
	if (typeof window.Flippydisk === 'undefined') {
		window.Flippydisk = {};
	}
})();

require(['demo'], function () {
	'use strict';
});
