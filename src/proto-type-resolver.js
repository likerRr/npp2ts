"use strict";
var typesTable = {
    double: 'number',
    float: 'number',
    int32: 'number',
    int64: 'number',
    uint32: 'number',
    uint64: 'number',
    sint32: 'number',
    sint64: 'number',
    fixed32: 'number',
    fixed64: 'number',
    sfixed32: 'number',
    sfixed64: 'number',
    bool: 'boolean',
    string: 'string',
    bytes: 'ByteBuffer',
    any: 'any'
};
function getTSType(protoType, isArray) {
    if (isArray === void 0) { isArray = false; }
    if (isComposite(protoType)) {
        // composite type
        return "" + protoType + (isArray ? '[]' : '');
    }
    return "" + (typesTable[protoType] || 'any') + (isArray ? '[]' : '');
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
//# sourceMappingURL=proto-type-resolver.js.map