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
var entity_def_1 = require("./abstract/entity-def");
var EnumValueDef = (function (_super) {
    __extends(EnumValueDef, _super);
    function EnumValueDef(name, val) {
        var _this = _super.call(this) || this;
        _this.val = null;
        _this.name = name;
        _this.val = val;
        return _this;
    }
    return EnumValueDef;
}(entity_def_1.EntityDef));
exports.EnumValueDef = EnumValueDef;
//# sourceMappingURL=enum-value-def.js.map