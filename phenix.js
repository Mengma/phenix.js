/*!
 * Phenix.js v0.3
 * A dummy pop-up box.
 * github.com/jamesliu96/phenix.js
 *
 * Released under the MIT License.
 * Copyright (C) 2015 James Liu
 *
 *
 * // DEMO
 * Phenix.init({
 *     width: 500,
 *     height: 300,
 *     template: "info",
 *     data: {
 *         color: "#36b14a",
 *         face: ":)",
 *         title: "LOL",
 *         description: "LMAO"
 *     }
 * }).show();
 *
 */
;(function(root) {
	var Phenix = {};

	Phenix.init = function(config) {
		var element = Phenix.element;
		for (var key in Phenix.defaults.style) {
			element.style[key] = Phenix.defaults.style[key];
		}
		if (typeof config === "object") {
			config = {
				width: parseInt(config.width) || Phenix.defaults.width,
				height: parseInt(config.height) || Phenix.defaults.height,
				template: config.template || "info",
				data: (typeof config.data === "object") ? config.data : Phenix.defaults.config.data
			};
		} else {
			config = Phenix.defaults.config;
		}
		var w = config.width;
			h = config.height;
		element.style.width = w + 'px';
		element.style.height = (h - 100) + 'px';
		element.style['margin-top'] = '-' + (h / 2) + 'px';
		element.style['margin-left'] = '-' + (w / 2) + 'px';
		element.innerHTML = _substitute(Phenix.templates[config.template] || config.template, config.data);
		return Phenix;
	};

	Phenix.dom = root.document;

	var _DOMcreate = function(element) {
		Phenix.dom.body.appendChild(element);
	};

	var _DOMdestroy = function(element) {
		Phenix.dom.body.removeChild(element);
	};

	Phenix.element = Phenix.dom.createElement('div');
	Phenix.element.setAttribute('id', 'phenix');
	Phenix.mask = Phenix.dom.createElement('div');
	Phenix.mask.setAttribute('id', 'phenix-mask');
	Phenix.mask.style.cssText = 'position:fixed;left:0;top:0;width:100%;height:100%;padding:0;margin:0;z-index:99998;background-color:rgba(0,0,0,0.4);';

	Phenix.defaults = {};
	Phenix.defaults.config = {
		width: 500,
		height: 300,
		template: "info",
		data: {
			color: "#36b14a",
			face: ":)",
			title: "Welcome to Phenix",
			description: "Made with ❤ by James Liu"
		}
	};
	Phenix.defaults.style = {
		'display': 'block',
		'color': '#221e1f',
		'background-color': '#f1f2f2',
		'width': Phenix.defaults.config.width + 'px',
		'height': (Phenix.defaults.config.height - 50) + 'px',
		'border': 'none',
		'position': 'fixed',
		'top': '50%',
		'left': '50%',
		'text-align': 'center',
		'padding': '25px 0',
		'margin': '-' + (Phenix.defaults.config.height / 2) + 'px 0 0 ' + '-' + (Phenix.defaults.config.width / 2) + 'px',
		'opacity': '0',
		'filter': 'alpha(opacity=0)',
		'z-index': '99999'
	};

	Phenix.templates = {};
	Phenix.templates.info = '<div style="font-size:60px;font-family:\'Microsoft YaHei\',\'Helvetica Neue\',Helvetica,Arial,sans-serif;padding:10px 0;color:{{color}};">{{face}}</div><div style="font-size:18px;font-family:\'Microsoft YaHei\',\'Helvetica Neue\',Helvetica,Arial,sans-serif;padding:10px 0;">{{title}}</div><div style="font-size:12px;font-family:\'Microsoft YaHei\',\'Helvetica Neue\',Helvetica,Arial,sans-serif;padding:10px 0;color:#b9b9bd;">{{description}}</div>';

	var _substitute = function(template, data) {
		for (var i in data) {
			var regexp = new RegExp("\{\{" + i + "\}\}", 'g');
			template = template.replace(regexp, data[i] || "Phenix", 'g');
		}
		return template;
	};

	var _opacity = function(opacity) {
		var element = Phenix.element,
			mask = Phenix.mask;
		element.filter ? element.style.filter = 'alpha(opacity=' + opacity + ')' : element.style.opacity = opacity / 100;
		mask.filter ? mask.style.filter = 'alpha(opacity=' + opacity + ')' : mask.style.opacity = opacity / 100;
	}

	Phenix.show = function(callback) {
		var element = Phenix.element,
			mask = Phenix.mask;
		_DOMcreate(element);
		_DOMcreate(mask);
		var opacity = 0;
		(function(){
			_opacity(opacity);
			opacity += 5;
			if (opacity <= 100) {
				setTimeout(arguments.callee, 20);
			}
		})();
		(typeof callback === "function") && callback();
		return Phenix;
	};

	Phenix.hide = function(callback) {
		var element = Phenix.element,
			mask = Phenix.mask;
		var opacity = 100;
		(function(){
			_opacity(opacity);
			opacity -= 15;
			if (opacity >= 0) {
				setTimeout(arguments.callee, 20);
			} else {
				_DOMdestroy(element);
				_DOMdestroy(mask);
			}
		})();
		(typeof callback === "function") && callback();
		return Phenix;
	};

	root.Phenix = Phenix;
})(window);
