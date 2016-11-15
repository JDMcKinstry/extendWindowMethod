/**	extendWindowMethod(name, callback, prepend)
 *	Extend any Function belonging to "window".
 *	Use 3rd param BOOL to prepend(true) || append(default) to the method.
 *	Also, you can remove an added method by submitting "remove" as the 3rd param.
 *	Will return original method, or false(something went wrong).
 *	Automatically prevents adding the same method twice with one exception:
 *		you can add the same method to begining (prepend) and end(default) of original method.
 **/
;(function() {
	function extendWindowMethod(name, callback, prepend) {
		if (window[name] && window[name] instanceof Function) {
			var sub = '__extensions__';
			if (prepend == 'remove') {
				if (window[name].hasOwnProperty(sub)) {
					if (window[name][sub]['prepended']) {
						var arr = window[name][sub]['prepended'],
							strCB = callback.toString();
						for (var x in arr) {
							if (arr[x] instanceof Function && arr[x].toString() == strCB) {
								delete arr[x];
								break;
							}
						}
					}
					if (window[name][sub]['appended']) {
						var arr = window[name][sub]['appended'],
							strCB = callback.toString();
						for (var x in arr) {
							if (arr[x] instanceof Function && arr[x].toString() == strCB) {
								delete arr[x];
								break;
							}
						}
					}
				}
				return window[name][sub] ? window[name][sub]['original'] : window[name];
			}
			if (!window[name].hasOwnProperty(sub)) {
				var org = window[name],
					func = function() {
						var args = Array.prototype.slice.call(arguments);
						if (window[name][sub]['prepended']) {
							var arr = window[name][sub]['prepended'];
							for (var x in arr) if (arr[x] instanceof Function) arr[x].apply(this, Array.prototype.slice.call(args));
						}
						var res = window[name][sub]['original'].apply(this, Array.prototype.slice.call(arguments));
						if (window[name][sub]['appended']) {
							var arr = window[name][sub]['appended'];
							for (var x in arr) if (arr[x] instanceof Function) res = arr[x].apply(this, Array.prototype.slice.call(args));
						}
						return res;
					};
				window[name] = func;
				window[name][sub] = { original: org };
			}
			if (prepend === true) {
				if (!window[name][sub]['prepended']) window[name][sub]['prepended'] = [ callback ];
				else {
					var arr = window[name][sub]['prepended'];
					if (!(arr.find(function(func) { return func instanceof Function && func.toString() == callback.toString(); }))) window[name][sub]['prepended'].unshift(callback);
				}
			}
			else {
				if (!window[name][sub]['appended']) window[name][sub]['appended'] = [ callback ];
				else {
					var arr = window[name][sub]['appended'];
					if (!(arr.find(function(func) { return func instanceof Function && func.toString() == callback.toString(); }))) window[name][sub]['appended'].push(callback);
				}
			}
			return window[name][sub] ? window[name][sub]['original'] : window[name];
		}
		return false;
	}
	
	window.extendWindowMethod = extendWindowMethod;
})();
