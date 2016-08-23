export class BaseMessageModel {
  rootMessage: MessageModel;
  name: string;

  constructor(name: string, root?: MessageModel) {
    this.name = name;
    this.rootMessage = root;
  }

  get namespace() {
    let rootMessage = this.rootMessage,
      names: string[] = [];

    if (!rootMessage) {
      return this.name;
    }

    while (rootMessage) {
      names.unshift(rootMessage.name);

      rootMessage = rootMessage.rootMessage;
    }

    return names.join('.');
  }

  getParent(prop) {
    return this.rootMessage ? this.rootMessage[prop] : null;
  }
}

export class MessageModel extends BaseMessageModel {
  fields: FieldType[] = [];
  messages: MessageModel[] = [];
  enums: EnumModel[] = [];

  constructor(message: MessageType, root?: MessageModel) {
    super(message.name, root);
    this.fields = message.fields;

    if (message.messages) {
      this.messages = message.messages.map(message => new MessageModel(message, this));
    }

    this.enums = (message.enums || []).map(enm => new EnumModel(enm, this));
  }

  getNameRecursiveUp(name) {
    let innerMessage = this.messages.find(msg => msg.name === name),
      innerEnum;

    if (innerMessage) {
      return innerMessage.rootMessage.name;
    }

    innerEnum = this.enums.find(enm => enm.name === name);

    if (innerEnum) {
      return innerEnum.rootMessage.name;
    }

    return this.rootMessage ? this.rootMessage.getNameRecursiveUp(name) : '';
  }
}

export class EnumModel extends BaseMessageModel {
  values: {name: string; id: number}[];

  constructor(enm: EnumType, root?: MessageModel) {
    super(enm.name, root);
    this.name = enm.name;
    this.values = enm.values;
  }

}

export interface MessageType {
  name: string;
  fields: FieldType[];
  messages: MessageType[];
  enums: EnumType[];
}

interface EnumType {
  name: string;
  values: {name: string; id: number}[];
}

interface FieldType {
  rule: string;
  type: string;
  name: string;
  id: number;
}