"use strict";
const entity_def_1 = require("./abstract/entity-def");
class EnumValueDef extends entity_def_1.EntityDef {
    constructor(name, val) {
        super();
        this.val = null;
        this.name = name;
        this.val = val;
    }
}
exports.EnumValueDef = EnumValueDef;
//# sourceMappingURL=enum-value-def.js.map