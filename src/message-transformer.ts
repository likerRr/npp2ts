import {ClassDef} from './entity-definitions/class-def';
import {EnumDef} from './entity-definitions/enum-def';
import {MessageModel, EnumModel} from './message-model';
import {ClassPropertyDef} from './entity-definitions/class-property-def';
import {getTSType, isSingleMessageType} from './proto-type-resolver';
import {EnumValueDef} from './entity-definitions/enum-value-def';

export class MessageTransformer {
  classesDef: ClassDef[] = [];
  enumsDef: EnumDef[] = [];

  addClass(cls: MessageModel) {
    let classDef = new ClassDef({
      name: cls.name,
      namespace: cls.namespace,
      properties: cls.fields.map(field => new ClassPropertyDef({
        name: field.name,
        isOptional: field.rule === 'optional',
        type: getTSType(isSingleMessageType(field.type) ? cls.getNameRecursiveUp(field.type) + '.' + field.type : field.type, field.rule === 'repeated')
      }))
    });

    this.classesDef.push(classDef);

    return classDef;
  }

  addEnum(enm: EnumModel) {
    let enumDef = new EnumDef({
      name: enm.name,
      namespace: enm.namespace,
      values: enm.values.map(val => new EnumValueDef(val.name, val.id))
    });

    this.enumsDef.push(enumDef);

    return enumDef;
  }
}