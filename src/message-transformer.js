"use strict";
const class_def_1 = require("./entity-definitions/class-def");
const enum_def_1 = require("./entity-definitions/enum-def");
const class_property_def_1 = require("./entity-definitions/class-property-def");
const proto_type_resolver_1 = require("./proto-type-resolver");
const enum_value_def_1 = require("./entity-definitions/enum-value-def");
class MessageTransformer {
    constructor() {
        this.classesDef = [];
        this.enumsDef = [];
    }
    addClass(cls) {
        let classDef = new class_def_1.ClassDef({
            name: cls.name,
            namespace: cls.namespace,
            properties: cls.fields.map(field => new class_property_def_1.ClassPropertyDef({
                name: field.name,
                isOptional: field.rule === 'optional',
                type: proto_type_resolver_1.getTSType(proto_type_resolver_1.isSingleMessageType(field.type) ? cls.getNameRecursiveUp(field.type) + '.' + field.type : field.type, field.rule === 'repeated')
            }))
        });
        this.classesDef.push(classDef);
        return classDef;
    }
    addEnum(enm) {
        let enumDef = new enum_def_1.EnumDef({
            name: enm.name,
            namespace: enm.namespace,
            values: enm.values.map(val => new enum_value_def_1.EnumValueDef(val.name, val.id))
        });
        this.enumsDef.push(enumDef);
        return enumDef;
    }
}
exports.MessageTransformer = MessageTransformer;
//# sourceMappingURL=message-transformer.js.map