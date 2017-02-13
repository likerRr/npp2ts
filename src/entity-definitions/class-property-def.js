"use strict";
const entity_def_1 = require("./abstract/entity-def");
class ClassPropertyDef extends entity_def_1.EntityDef {
    constructor(data) {
        super();
        this.type = '';
        this.isOptional = true;
        this.name = data.name;
        this.type = data.type;
        this.isOptional = data.isOptional;
    }
}
exports.ClassPropertyDef = ClassPropertyDef;
//# sourceMappingURL=class-property-def.js.map