import {Drawer} from './drawer';
import {EnumDef} from '../entity-definitions/enum-def';

// TODO is not used
export class EnumDrawer extends Drawer {

  constructor(private enm: EnumDef) {
    super();
  }

  get template() {
    return this.builder`
export namespace ${'namespace'} {
  export enum ${'enumName'} {
    ${'properties'}
  }
}
    `;
  }

  draw():string {
    return this.template({
      enumName: this.enm.name,
      namespace: this.enm.namespace,
      properties: `${this.enm.values.map(prop => `${prop.name}${prop.val !== null ? ` = ${prop.val}` : ''},`).join('\n    ')}`
    });
  }

}