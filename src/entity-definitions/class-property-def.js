"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var entity_def_1 = require('./abstract/entity-def');
var ClassPropertyDef = (function (_super) {
    __extends(ClassPropertyDef, _super);
    function ClassPropertyDef(data) {
        _super.call(this);
        this.type = '';
        this.isOptional = true;
        this.name = data.name;
        this.type = data.type;
        this.isOptional = data.isOptional;
    }
    return ClassPropertyDef;
}(entity_def_1.EntityDef));
exports.ClassPropertyDef = ClassPropertyDef;
//# sourceMappingURL=class-property-def.js.map