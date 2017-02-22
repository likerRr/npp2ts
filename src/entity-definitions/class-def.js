"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var entity_def_1 = require("./abstract/entity-def");
var ClassDef = (function (_super) {
    __extends(ClassDef, _super);
    function ClassDef(data) {
        var _this = _super.call(this) || this;
        _this.namespace = '';
        _this.name = data.name;
        _this.namespace = data.namespace;
        _this.properties = data.properties;
        return _this;
    }
    return ClassDef;
}(entity_def_1.EntityDef));
exports.ClassDef = ClassDef;
//# sourceMappingURL=class-def.js.map