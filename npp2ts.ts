import {ProtosModel} from './src/protos-model';
import {MessageTransformer} from './src/message-transformer';
import {MessageModel} from './src/message-model';
import {DrawerManager} from './src/drawer-manager';
import {Drawer} from './src/definition-drawer/drawer';
import {NamespaceDrawer} from './src/definition-drawer/namespace-drawer';
import fs = require('fs');

export function npp2ts(modelFile: string) {
  let model = JSON.parse(fs.readFileSync(modelFile).toString());
  let protosModel = new ProtosModel(model);

  let messageTransformer = new MessageTransformer();

  const transformMessageRecursive = (message: MessageModel) => {
    // add only messages with fields or without enums and messages included
    if (message.fields.length > 0 || (message.enums.length === 0 && message.messages.length === 0)) {
      messageTransformer.addClass(message);
    }

    if (message.enums.length > 0) {
      message.enums.forEach(enm => messageTransformer.addEnum(enm));
    }

    if (message.messages.length > 0) {
      message.messages.forEach(msg => transformMessageRecursive(msg));
    }
  };

  protosModel.messages.forEach(transformMessageRecursive);

  let entitiesGroup = {},
    entitiesToDraw: Drawer[] = [];

  messageTransformer.classesDef.forEach(cls => {
    if (!entitiesGroup[cls.namespace]) {
      entitiesGroup[cls.namespace] = [];
    }

    entitiesGroup[cls.namespace].push(cls);
  });

  messageTransformer.enumsDef.forEach(enm => {
    if (!entitiesGroup[enm.namespace]) {
      entitiesGroup[enm.namespace] = [];
    }

    entitiesGroup[enm.namespace].push(enm);
  });

  for (let groupName in entitiesGroup) {
    entitiesToDraw.push(new NamespaceDrawer(groupName, entitiesGroup[groupName]));
  }

  const drawer = new DrawerManager(entitiesToDraw);

  return drawer.makeTemplate();
}