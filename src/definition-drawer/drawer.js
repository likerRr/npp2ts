"use strict";
var isInteger = function (value) {
    return typeof value === "number" &&
        isFinite(value) &&
        Math.floor(value) === value;
};
var Drawer = (function () {
    function Drawer() {
    }
    Drawer.prototype.builder = function (strings) {
        var keys = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            keys[_i - 1] = arguments[_i];
        }
        return (function () {
            var values = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                values[_i - 0] = arguments[_i];
            }
            var dict = values[values.length - 1] || {};
            var result = [strings[0]];
            keys.forEach(function (key, i) {
                var value = isInteger(key) ? values[key] : dict[key];
                result.push(value, strings[i + 1]);
            });
            return result.join('');
        });
    };
    return Drawer;
}());
exports.Drawer = Drawer;
//# sourceMappingURL=drawer.js.map