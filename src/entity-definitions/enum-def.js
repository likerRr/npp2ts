"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var entity_def_1 = require("./abstract/entity-def");
var EnumDef = (function (_super) {
    __extends(EnumDef, _super);
    function EnumDef(data) {
        var _this = _super.call(this) || this;
        _this.namespace = '';
        _this.name = data.name;
        _this.namespace = data.namespace;
        _this.values = data.values;
        return _this;
    }
    return EnumDef;
}(entity_def_1.EntityDef));
exports.EnumDef = EnumDef;
//# sourceMappingURL=enum-def.js.map