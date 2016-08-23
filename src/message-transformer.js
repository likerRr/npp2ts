"use strict";
var class_def_1 = require('./entity-definitions/class-def');
var enum_def_1 = require('./entity-definitions/enum-def');
var class_property_def_1 = require('./entity-definitions/class-property-def');
var proto_type_resolver_1 = require('./proto-type-resolver');
var enum_value_def_1 = require('./entity-definitions/enum-value-def');
var MessageTransformer = (function () {
    function MessageTransformer() {
        this.classesDef = [];
        this.enumsDef = [];
    }
    MessageTransformer.prototype.addClass = function (cls) {
        var classDef = new class_def_1.ClassDef({
            name: cls.name,
            namespace: cls.namespace,
            properties: cls.fields.map(function (field) { return new class_property_def_1.ClassPropertyDef({
                name: field.name,
                isOptional: field.rule === 'optional',
                type: proto_type_resolver_1.getTSType(proto_type_resolver_1.isSingleMessageType(field.type) ? cls.getNameRecursiveUp(field.type) + '.' + field.type : field.type, field.rule === 'repeated')
            }); })
        });
        this.classesDef.push(classDef);
        return classDef;
    };
    MessageTransformer.prototype.addEnum = function (enm) {
        var enumDef = new enum_def_1.EnumDef({
            name: enm.name,
            namespace: enm.namespace,
            values: enm.values.map(function (val) { return new enum_value_def_1.EnumValueDef(val.name, val.id); })
        });
        this.enumsDef.push(enumDef);
        return enumDef;
    };
    return MessageTransformer;
}());
exports.MessageTransformer = MessageTransformer;
//# sourceMappingURL=message-transformer.js.map