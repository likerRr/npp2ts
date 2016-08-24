export function getTSType(protoType: string, isArray: boolean = false) {
  if (isComposite(protoType)) {
    // composite type
    return `${protoType}${isArray ? '[]' : ''}`;
  }

  return `${transformProtoType(protoType)}${isArray ? '[]' : ''}`;
}

export function isComposite(protoType: string) {
  return protoType.indexOf('.') !== -1 || /^[A-Z]+/.test(protoType);
}

export function isSingleMessageType(protoType: string) {
  return protoType.indexOf('.') === -1 && /^[A-Z]+/.test(protoType);
}

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