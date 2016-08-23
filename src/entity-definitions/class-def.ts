import {EntityDef} from './abstract/entity-def';
import {ClassPropertyDef} from './class-property-def';
import {UnderNamespace} from './interface/under-namespace';

export class ClassDef extends EntityDef implements UnderNamespace {
  namespace: string = '';
  properties: ClassPropertyDef[];

  constructor(data: ClassDefType) {
    super();
    this.name = data.name;
    this.namespace = data.namespace;
    this.properties = data.properties;
  }
}

interface ClassDefType {
  name: string;
  namespace: string;
  properties: ClassPropertyDef[];
}