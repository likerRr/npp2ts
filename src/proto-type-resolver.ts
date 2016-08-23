const typesTable = {
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

export function getTSType(protoType: string, isArray: boolean = false) {
  if (isComposite(protoType)) {
    // composite type
    return `${protoType}${isArray ? '[]' : ''}`;
  }

  return `${typesTable[protoType] || 'any'}${isArray ? '[]' : ''}`;
}

export function isComposite(protoType: string) {
  return protoType.indexOf('.') !== -1 || /^[A-Z]+/.test(protoType);
}

export function isSingleMessageType(protoType: string) {
  return protoType.indexOf('.') === -1 && /^[A-Z]+/.test(protoType);
}