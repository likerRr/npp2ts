"use strict";
const entity_def_1 = require("./abstract/entity-def");
class EnumDef extends entity_def_1.EntityDef {
    constructor(data) {
        super();
        this.namespace = '';
        this.name = data.name;
        this.namespace = data.namespace;
        this.values = data.values;
    }
}
exports.EnumDef = EnumDef;
//# sourceMappingURL=enum-def.js.map