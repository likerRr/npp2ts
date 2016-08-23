"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseMessageModel = (function () {
    function BaseMessageModel(name, root) {
        this.name = name;
        this.rootMessage = root;
    }
    Object.defineProperty(BaseMessageModel.prototype, "namespace", {
        get: function () {
            var rootMessage = this.rootMessage, names = [];
            if (!rootMessage) {
                return this.name;
            }
            while (rootMessage) {
                names.unshift(rootMessage.name);
                rootMessage = rootMessage.rootMessage;
            }
            return names.join('.');
        },
        enumerable: true,
        configurable: true
    });
    BaseMessageModel.prototype.getParent = function (prop) {
        return this.rootMessage ? this.rootMessage[prop] : null;
    };
    return BaseMessageModel;
}());
exports.BaseMessageModel = BaseMessageModel;
var MessageModel = (function (_super) {
    __extends(MessageModel, _super);
    function MessageModel(message, root) {
        var _this = this;
        _super.call(this, message.name, root);
        this.fields = [];
        this.messages = [];
        this.enums = [];
        this.fields = message.fields;
        if (message.messages) {
            this.messages = message.messages.map(function (message) { return new MessageModel(message, _this); });
        }
        this.enums = (message.enums || []).map(function (enm) { return new EnumModel(enm, _this); });
    }
    MessageModel.prototype.getNameRecursiveUp = function (name) {
        var innerMessage = this.messages.find(function (msg) { return msg.name === name; }), innerEnum;
        if (innerMessage) {
            return innerMessage.rootMessage.name;
        }
        innerEnum = this.enums.find(function (enm) { return enm.name === name; });
        if (innerEnum) {
            return innerEnum.rootMessage.name;
        }
        return this.rootMessage ? this.rootMessage.getNameRecursiveUp(name) : '';
    };
    return MessageModel;
}(BaseMessageModel));
exports.MessageModel = MessageModel;
var EnumModel = (function (_super) {
    __extends(EnumModel, _super);
    function EnumModel(enm, root) {
        _super.call(this, enm.name, root);
        this.name = enm.name;
        this.values = enm.values;
    }
    return EnumModel;
}(BaseMessageModel));
exports.EnumModel = EnumModel;
//# sourceMappingURL=message-model.js.map