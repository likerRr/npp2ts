"use strict";
const message_model_1 = require("./message-model");
class ProtosModel {
    constructor(jsonModel) {
        this.messages = [];
        this.packageName = '';
        this.packageName = jsonModel.package;
        this.buildMessages(jsonModel.messages);
    }
    buildMessages(messages) {
        messages.forEach(msg => this.messages.push(new message_model_1.MessageModel(msg)));
    }
}
exports.ProtosModel = ProtosModel;
//# sourceMappingURL=protos-model.js.map