"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var protos_model_1 = require("./src/protos-model");
var message_transformer_1 = require("./src/message-transformer");
var drawer_manager_1 = require("./src/drawer-manager");
var namespace_drawer_1 = require("./src/definition-drawer/namespace-drawer");
var fs = require("fs");
function npp2ts(modelFile) {
    var model = JSON.parse(fs.readFileSync(modelFile).toString());
    var protosModel = new protos_model_1.ProtosModel(model);
    var messageTransformer = new message_transformer_1.MessageTransformer();
    var transformMessageRecursive = function (message) {
        if (message.fields.length > 0) {
            messageTransformer.addClass(message);
        }
        if (message.enums.length > 0) {
            message.enums.forEach(function (enm) { return messageTransformer.addEnum(enm); });
        }
        if (message.messages.length > 0) {
            message.messages.forEach(function (msg) { return transformMessageRecursive(msg); });
        }
    };
    protosModel.messages.forEach(transformMessageRecursive);
    var entitiesGroup = {}, entitiesToDraw = [];
    messageTransformer.classesDef.forEach(function (cls) {
        if (!entitiesGroup[cls.namespace]) {
            entitiesGroup[cls.namespace] = [];
        }
        entitiesGroup[cls.namespace].push(cls);
    });
    messageTransformer.enumsDef.forEach(function (enm) {
        if (!entitiesGroup[enm.namespace]) {
            entitiesGroup[enm.namespace] = [];
        }
        entitiesGroup[enm.namespace].push(enm);
    });
    for (var groupName in entitiesGroup) {
        entitiesToDraw.push(new namespace_drawer_1.NamespaceDrawer(groupName, entitiesGroup[groupName]));
    }
    var drawer = new drawer_manager_1.DrawerManager(entitiesToDraw);
    return drawer.makeTemplate();
}
exports.npp2ts = npp2ts;
//# sourceMappingURL=npp2ts.js.map