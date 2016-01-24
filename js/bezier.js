var Bezier = (function() {
	"use strict";
	var U = {
		coord: function(x, y) {
			var xval = x || 0,
				yval = y || xval;
			return {
				x: xval,
				y: yval
			};
		},
		extend: function() {
			var dest = {},
				ext = function(destination, source) {
					var source = source || {};
					for (var property in source) {
						if (source[property] && source[property].constructor && source[property].constructor === Object) {
							destination[property] = destination[property] || {};
							arguments.callee(destination[property], source[property]);
						} else {
							destination[property] = source[property];
						}
					}
					return destination;
				};
			for (i = 0; i < arguments.length; i++) {
				dest = ext(dest, arguments[i]);
			}
			return dest;
		},
		bezier: function(t, p1, p2, c1, c2) {
			return p1 * (t * t * t) + c1 * (3 * t * t * (1 - t)) + c2 * (3 * t * (1 - t) * (1 - t)) + p2 * ((1 - t) * (1 - t) * (1 - t));
		}
	};

	var bez = function(options) {

		return this.init(options);
	};
	bez.prototype = {
		init: function(options) {
			this.config = U.extend({
				p1: U.coord(0),
				p2: U.coord(1),
				c1: U.coord(0.3, 0),
				c2: U.coord(0.7, 1)
			}, options);


			return this;
		},
		point: function(t) {
			var t = t || 0,
				x = U.bezier(t, this.config.p1.x, this.config.p2.x, this.config.c1.x, this.config.c2.x),
				y = U.bezier(t, this.config.p1.y, this.config.p2.y, this.config.c1.y, this.config.c2.y);
			return U.coord(x, y);
		},
		pUpdate: function(pname, p) {
			if (p) {
				this.config[pname].x = p.x;
				this.config[pname].y = p.y;
				return this;
			} else {
				return this.config[pname];
			}
		},
		p1: function(p) {
			return this.pUpdate('p1', p);
		},
		p2: function(p) {
			return this.pUpdate('p2', p);
		},
		c1: function(p) {
			return this.pUpdate('c1', p);
		},
		c2: function(p) {
			return this.pUpdate('c2', p);
		}
	};

	return function(options) {
		return new bez(options);
	};
})();