"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var entity_def_1 = require('./abstract/entity-def');
var EnumValueDef = (function (_super) {
    __extends(EnumValueDef, _super);
    function EnumValueDef(name, val) {
        _super.call(this);
        this.val = null;
        this.name = name;
        this.val = val;
    }
    return EnumValueDef;
}(entity_def_1.EntityDef));
exports.EnumValueDef = EnumValueDef;
//# sourceMappingURL=enum-value-def.js.map