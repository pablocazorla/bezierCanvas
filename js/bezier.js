var bezier = (function() {
	"use strict";

	var coord = function(x, y) {
			var xval = x || 0,
				yval = y || xval;
			return {
				x: xval,
				y: yval
			};
		},
		P1 = coord(),
		P2 = coord(1),
		C1 = coord(.3),
		C2 = coord(.7),
		scl = 1,
		B = function(t, P1, P2, C1, C2) {
			return P1 * (t * t * t) + C1 * (3 * t * t * (1 - t)) + C2 * (3 * t * (1 - t) * (1 - t)) + P2 * ((1 - t) * (1 - t) * (1 - t));
		},
		bz = function(t) {
			var x = scl * B(t, P1.x, P2.x, C1.x, C2.x),
				y = scl * B(t, P1.y, P2.y, C1.y, C2.y);
			return coord(x, y);
		};

	bz.coord = coord;
	bz.scale = function(v) {
		if (v) {
			scl = v;
			return bz;
		} else {
			return scl;
		}
	};
	bz.points = function(p1, p2, c1, c2) {
		P1 = p1;
		P2 = p2;
		C1 = c1;
		C2 = c2;
		return bz;
	};
	bz.p1 = function(p) {
		if (p) {
			P1 = p;
			return bz;
		} else {
			return P1;
		}
	};
	bz.p2 = function(p) {
		if (p) {
			P2 = p;
			return bz;
		} else {
			return P2;
		}
	};
	bz.c1 = function(p) {
		if (p) {
			C1 = p;
			return bz;
		} else {
			return C1;
		}
	};
	bz.c2 = function(p) {
		if (p) {
			C2 = p;
			return bz;
		} else {
			return C2;
		}
	};

	return bz;
})();