define(['module', 'can/view/mustache', 'text!./ArticleTemplate.mustache'],

	/**
	 * @memberof ArticleControl
	 * @interface
	 * @param module
	 * @param can
	 * @param text
	 * @returns can.view
	 */
	function (module, can, text) {
		'use strict';
		return can.mustache(text);
	}
);

