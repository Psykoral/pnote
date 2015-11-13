/*
 * Name: ArticleModel.js
 * $Author: jisutton
 * $Created: 11/11/15 12:00 PM
 */

define(['can', 'can/model'], function (can) {
	'use strict';

	return can.Model.extend({
		getArticleData: function () {
			var service = 'http://localhost/articles.json';
			return can.$.getJSON(service);
		}
	}, {});
});
