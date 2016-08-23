import {EntityDef} from './abstract/entity-def';

export class ClassPropertyDef extends EntityDef {
  type: string = '';
  isOptional: boolean = true;

  constructor(data: ClassPropertyDefType) {
    super();
    this.name = data.name;
    this.type = data.type;
    this.isOptional = data.isOptional;
  }
}

interface ClassPropertyDefType {
  name: string;
  type: string;
  isOptional: boolean;
}