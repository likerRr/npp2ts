"use strict";
function getTSType(protoType, isArray = false) {
    if (isComposite(protoType)) {
        // composite type
        return `${protoType}${isArray ? '[]' : ''}`;
    }
    return `${transformProtoType(protoType)}${isArray ? '[]' : ''}`;
}
exports.getTSType = getTSType;
function isComposite(protoType) {
    return protoType.indexOf('.') !== -1 || /^[A-Z]+/.test(protoType);
}
exports.isComposite = isComposite;
function isSingleMessageType(protoType) {
    return protoType.indexOf('.') === -1 && /^[A-Z]+/.test(protoType);
}
exports.isSingleMessageType = isSingleMessageType;
function transformProtoType(protoType) {
    switch (protoType) {
        case 'double':
        case 'float':
        case 'int32':
        case 'uint32':
        case 'sint32':
        case 'fixed32':
        case 'sfixed32':
            return 'number';
        case 'int64':
        case 'uint64':
        case 'sint64':
        case 'fixed64':
        case 'sfixed64':
            return 'Long';
        case 'bool':
            return 'boolean';
        case 'string':
            return 'string';
        case 'bytes':
            return 'ByteBuffer';
        case 'any':
        default:
            return 'any';
    }
}
//# sourceMappingURL=proto-type-resolver.js.map