"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
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
        var _this = _super.call(this, message.name, root) || this;
        _this.fields = [];
        _this.messages = [];
        _this.enums = [];
        _this.fields = message.fields;
        if (message.messages) {
            _this.messages = message.messages.map(function (message) { return new MessageModel(message, _this); });
        }
        _this.enums = (message.enums || []).map(function (enm) { return new EnumModel(enm, _this); });
        return _this;
    }
    MessageModel.prototype.getNameRecursiveUp = function (name) {
        var innerMessage = find(this.messages, function (msg) { return msg.name === name; }), innerEnum;
        if (innerMessage) {
            return innerMessage.rootMessage.name;
        }
        innerEnum = find(this.enums, function (enm) { return enm.name === name; });
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
        var _this = _super.call(this, enm.name, root) || this;
        _this.name = enm.name;
        _this.values = enm.values;
        return _this;
    }
    return EnumModel;
}(BaseMessageModel));
exports.EnumModel = EnumModel;
function find(arr, predicate) {
    var result = null;
    arr.some(function (val, idx) { return predicate(val, idx) ? ((result = val), true) : false; });
    return result;
}
//# sourceMappingURL=message-model.js.map