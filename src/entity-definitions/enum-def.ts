import {EnumValueDef} from './enum-value-def';
import {EntityDef} from './abstract/entity-def';
import {UnderNamespace} from './interface/under-namespace';

export class EnumDef extends EntityDef implements UnderNamespace {
  namespace: string = '';
  values: EnumValueDef[];

  constructor(data: EnumDefType) {
    super();
    this.name = data.name;
    this.namespace = data.namespace;
    this.values = data.values;
  }
}

interface EnumDefType {
  name: string;
  namespace: string;
  values: EnumValueDef[];
}