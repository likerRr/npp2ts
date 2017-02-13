"use strict";
const isInteger = function (value) {
    return typeof value === "number" &&
        isFinite(value) &&
        Math.floor(value) === value;
};
class Drawer {
    builder(strings, ...keys) {
        return (function (...values) {
            var dict = values[values.length - 1] || {};
            var result = [strings[0]];
            keys.forEach(function (key, i) {
                var value = isInteger(key) ? values[key] : dict[key];
                result.push(value, strings[i + 1]);
            });
            return result.join('');
        });
    }
}
exports.Drawer = Drawer;
//# sourceMappingURL=drawer.js.map