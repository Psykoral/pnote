define(['can'], function (can) {
	'use strict';
	return can.Control.extend(
		{
			defaults: {
				debug: false
			}
		},
		{
			init: function () {
				if (this.options.debug) {
					console.log('----------------------------------------Direction--------------------------------------------------');
				}
				this.swap = can.$('html');
				this.rtlItem = this.swap.find('[data-seed-dir="rtl"]');
				this.ltrItem = this.swap.find('[data-seed-dir="ltr"]');
				if (this.options.debug) {
					console.log('this.rtlItem: ', this.rtlItem);
				}
				if (this.options.debug) {
					console.log('this.ltrItem: ', this.ltrItem);
				}
				this.loadDir();
			},
			loadDir: function (dir) {
				if (dir == null) {
					this.currentDir = window.localStorage.getItem('aceui_demo_dir');
				} else {
					this.currentDir = dir;
				}

				if (this.currentDir == 'rtl') {
					this.ltrItem.css('display', 'inline-block');
					this.rtlItem.hide();
				} else {
					this.rtlItem.css('display', 'inline-block');
					this.ltrItem.hide();
				}

				this.attach(this.currentDir);
			},
			setDir: function (val) {
				window.localStorage.setItem('aceui_demo_dir', val);
			},
			attach: function (dir) {
				this.swap.attr('dir', dir);
				this.setDir(dir);
			},
			"click": function (el, ev) {
				ev.preventDefault();
				this.direction = this.element.data('seed-dir');
				this.loadDir(this.direction);
			}
		});
});
