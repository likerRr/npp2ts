import {Drawer} from './drawer';
import {EntityDef} from '../entity-definitions/abstract/entity-def';
import {ClassDef} from '../entity-definitions/class-def';
import {EnumDef} from '../entity-definitions/enum-def';

export class NamespaceDrawer extends Drawer {
  constructor(private ns: string, private ents: EntityDef[]) {
    super();
  }

  get template(): string {
    return `
export namespace ${this.ns} {
  ${this.drawEntities()}
}
    `;
  }

  draw() {
    return this.template;
  }

  drawEntities(): string {
    return this.ents.map(ent => {
      if (ent instanceof ClassDef) {
        return this.buildClsTemplate(ent);
      }

      if (ent instanceof EnumDef) {
        return this.buildEnmTemplate(ent);
      }

      return '';
    }).join('\n');
  }

  get clsTemplate() {
    return this.builder`
  export class ${'className'} extends ProtoBufMessage {
    constructor(data: ${'className'}Data);
    static decode(buffer?: any, length?: number | string, enc?: string): ${'className'};
    ${'classProps'}
  }
  
  interface ${'className'}Data {
    ${'dataProps'}
  }
`;
  }

  get enmTemplate() {
    return this.builder`
  export const enum ${'enumName'} {
    ${'properties'}
  }
    `;
  }

  buildEnmTemplate(enm: EnumDef):string {
    return this.enmTemplate({
      enumName: enm.name,
      namespace: enm.namespace,
      properties: `${enm.values.map(prop => `${prop.name}${prop.val !== null ? ` = ${prop.val}` : ''},`).join('\n    ')}`
    });
  }

  buildClsTemplate(cls: ClassDef) {
    return this.clsTemplate({
      className: cls.name,
      dataProps: `${cls.properties.map(prop => `${prop.name}${prop.isOptional ? '?' : ''}: ${prop.type};`).join('\n    ')}`,
      classProps: `${cls.properties.map(prop => {
        let getterName = toCameCase(`get_${prop.name}`),
          setterName = toCameCase(`set_${prop.name}`);

        return `${prop.name}: ${prop.type};
    ${getterName}(): ${prop.type};
    ${setterName}(value: any, noAssert?: boolean);`;
      }).join('\n    ')}`
    });
  }

}

function toCameCase(str) {
  return str.replace(/_([a-z])/g, g => g[1].toUpperCase());
}