"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var drawer_1 = require("./drawer");
// TODO is not used
var EnumDrawer = (function (_super) {
    __extends(EnumDrawer, _super);
    function EnumDrawer(enm) {
        var _this = _super.call(this) || this;
        _this.enm = enm;
        return _this;
    }
    Object.defineProperty(EnumDrawer.prototype, "template", {
        get: function () {
            return (_a = ["\nexport namespace ", " {\n  export enum ", " {\n    ", "\n  }\n}\n    "], _a.raw = ["\nexport namespace ", " {\n  export enum ", " {\n    ", "\n  }\n}\n    "], this.builder(_a, 'namespace', 'enumName', 'properties'));
            var _a;
        },
        enumerable: true,
        configurable: true
    });
    EnumDrawer.prototype.draw = function () {
        return this.template({
            enumName: this.enm.name,
            namespace: this.enm.namespace,
            properties: "" + this.enm.values.map(function (prop) { return "" + prop.name + (prop.val !== null ? " = " + prop.val : '') + ","; }).join('\n    ')
        });
    };
    return EnumDrawer;
}(drawer_1.Drawer));
exports.EnumDrawer = EnumDrawer;
//# sourceMappingURL=enum-drawer.js.map