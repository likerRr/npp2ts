import {EntityDef} from './abstract/entity-def';

export class EnumValueDef extends EntityDef {
  val: number = null;

  constructor(name: string, val?: number) {
    super();
    this.name = name;
    this.val = val;
  }
}