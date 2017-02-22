"use strict";
const protos_model_1 = require("./src/protos-model");
const message_transformer_1 = require("./src/message-transformer");
const drawer_manager_1 = require("./src/drawer-manager");
const namespace_drawer_1 = require("./src/definition-drawer/namespace-drawer");
const fs = require("fs");
function npp2ts(modelFile) {
    let model = JSON.parse(fs.readFileSync(modelFile).toString());
    let protosModel = new protos_model_1.ProtosModel(model);
    let messageTransformer = new message_transformer_1.MessageTransformer();
    const transformMessageRecursive = (message) => {
        // if (message.fields.length > 0) {
        messageTransformer.addClass(message);
        // }
        if (message.enums.length > 0) {
            message.enums.forEach(enm => messageTransformer.addEnum(enm));
        }
        if (message.messages.length > 0) {
            message.messages.forEach(msg => transformMessageRecursive(msg));
        }
    };
    protosModel.messages.forEach(transformMessageRecursive);
    let entitiesGroup = {}, entitiesToDraw = [];
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
        entitiesToDraw.push(new namespace_drawer_1.NamespaceDrawer(groupName, entitiesGroup[groupName]));
    }
    const drawer = new drawer_manager_1.DrawerManager(entitiesToDraw);
    return drawer.makeTemplate();
}
exports.npp2ts = npp2ts;
//# sourceMappingURL=npp2ts.js.map