import {MessageType, MessageModel} from './message-model';

export class ProtosModel {

  messages: MessageModel[] = [];
  packageName: string = '';

  constructor(jsonModel) {
    this.packageName = jsonModel.package;
    this.buildMessages(jsonModel.messages);
  }

  private buildMessages(messages: MessageType[]) {
    messages.forEach(msg => this.messages.push(new MessageModel(msg)));
  }
}