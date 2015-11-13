define(['can', 'debug', './ArticleView', './ArticleModel', 'date'], function (can, Debug, View, Model) {
	'use strict';
	return can.Control.extend({
		defaults: {
			limit: 5,
			debug: false
		}
	}, {
		init: function () {
			this.debug = new Debug('', {debug: this.options.debug, control: 'Articles'});
			this.debug.log('-----------------------------Articles------------------------------');
			this.getArticles();
		},
		getArticles: function () {
			this.debug.log('getting articles');
			Model.getArticleData().done(can.proxy(function (data) {
				this.debug.log(['done:', data]);
				this.sortArticle(data);
			}, this));
		},
		sortArticle: function (data) {
			can.$.each(data.posts, can.proxy(function (i, v) {
				if (v.status == 'publish' && v.attachments.length > 0 && i < this.options.limit) {
					v.modified = new Date.parse(v.modified).toString('MMM dd, yyyy');

					if (this.element.data('seed-articles') === 'thumb') {
						v.articleType = 'thumb';
					}

					this.element.append(View(v));
				}
			}, this));
		}
	});
});
