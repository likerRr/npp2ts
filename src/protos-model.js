"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var message_model_1 = require("./message-model");
var ProtosModel = (function () {
    function ProtosModel(jsonModel) {
        this.messages = [];
        this.packageName = '';
        this.packageName = jsonModel.package;
        this.buildMessages(jsonModel.messages);
    }
    ProtosModel.prototype.buildMessages = function (messages) {
        var _this = this;
        messages.forEach(function (msg) { return _this.messages.push(new message_model_1.MessageModel(msg)); });
    };
    return ProtosModel;
}());
exports.ProtosModel = ProtosModel;
//# sourceMappingURL=protos-model.js.map