"use strict";
class BaseMessageModel {
    constructor(name, root) {
        this.name = name;
        this.rootMessage = root;
    }
    get namespace() {
        let rootMessage = this.rootMessage, names = [];
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
exports.BaseMessageModel = BaseMessageModel;
class MessageModel extends BaseMessageModel {
    constructor(message, root) {
        super(message.name, root);
        this.fields = [];
        this.messages = [];
        this.enums = [];
        this.fields = message.fields;
        if (message.messages) {
            this.messages = message.messages.map(message => new MessageModel(message, this));
        }
        this.enums = (message.enums || []).map(enm => new EnumModel(enm, this));
    }
    getNameRecursiveUp(name) {
        let innerMessage = find(this.messages, msg => msg.name === name), innerEnum;
        if (innerMessage) {
            return innerMessage.rootMessage.name;
        }
        innerEnum = find(this.enums, enm => enm.name === name);
        if (innerEnum) {
            return innerEnum.rootMessage.name;
        }
        return this.rootMessage ? this.rootMessage.getNameRecursiveUp(name) : '';
    }
}
exports.MessageModel = MessageModel;
class EnumModel extends BaseMessageModel {
    constructor(enm, root) {
        super(enm.name, root);
        this.name = enm.name;
        this.values = enm.values;
    }
}
exports.EnumModel = EnumModel;
function find(arr, predicate) {
    let result = null;
    arr.some((val, idx) => predicate(val, idx) ? ((result = val), true) : false);
    return result;
}
//# sourceMappingURL=message-model.js.map