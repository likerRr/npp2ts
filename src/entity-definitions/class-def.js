"use strict";
const entity_def_1 = require("./abstract/entity-def");
class ClassDef extends entity_def_1.EntityDef {
    constructor(data) {
        super();
        this.namespace = '';
        this.name = data.name;
        this.namespace = data.namespace;
        this.properties = data.properties;
    }
}
exports.ClassDef = ClassDef;
//# sourceMappingURL=class-def.js.map