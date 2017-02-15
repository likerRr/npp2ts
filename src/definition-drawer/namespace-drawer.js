"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var drawer_1 = require("./drawer");
var class_def_1 = require("../entity-definitions/class-def");
var enum_def_1 = require("../entity-definitions/enum-def");
var NamespaceDrawer = (function (_super) {
    __extends(NamespaceDrawer, _super);
    function NamespaceDrawer(ns, ents) {
        var _this = _super.call(this) || this;
        _this.ns = ns;
        _this.ents = ents;
        return _this;
    }
    Object.defineProperty(NamespaceDrawer.prototype, "template", {
        get: function () {
            return "\nexport namespace " + this.ns + " {\n  " + this.drawEntities() + "\n}\n    ";
        },
        enumerable: true,
        configurable: true
    });
    NamespaceDrawer.prototype.draw = function () {
        return this.template;
    };
    NamespaceDrawer.prototype.drawEntities = function () {
        var _this = this;
        return this.ents.map(function (ent) {
            if (ent instanceof class_def_1.ClassDef) {
                return _this.buildClsTemplate(ent);
            }
            if (ent instanceof enum_def_1.EnumDef) {
                return _this.buildEnmTemplate(ent);
            }
            return '';
        }).join('\n');
    };
    Object.defineProperty(NamespaceDrawer.prototype, "clsTemplate", {
        get: function () {
            return (_a = ["\n  export class ", " extends ProtoBufMessage {\n    constructor(data: ", "Data);\n    static decode(buffer?: any, length?: number | string, enc?: string): ", ";\n    ", "\n  }\n  \n  interface ", "Data {\n    ", "\n  }\n"], _a.raw = ["\n  export class ", " extends ProtoBufMessage {\n    constructor(data: ", "Data);\n    static decode(buffer?: any, length?: number | string, enc?: string): ", ";\n    ", "\n  }\n  \n  interface ", "Data {\n    ", "\n  }\n"], this.builder(_a, 'className', 'className', 'className', 'classProps', 'className', 'dataProps'));
            var _a;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NamespaceDrawer.prototype, "enmTemplate", {
        get: function () {
            return (_a = ["\n  export enum ", " {\n    ", "\n  }\n    "], _a.raw = ["\n  export enum ", " {\n    ", "\n  }\n    "], this.builder(_a, 'enumName', 'properties'));
            var _a;
        },
        enumerable: true,
        configurable: true
    });
    NamespaceDrawer.prototype.buildEnmTemplate = function (enm) {
        return this.enmTemplate({
            enumName: enm.name,
            namespace: enm.namespace,
            properties: "" + enm.values.map(function (prop) { return "" + prop.name + (prop.val !== null ? " = " + prop.val : '') + ","; }).join('\n    ')
        });
    };
    NamespaceDrawer.prototype.buildClsTemplate = function (cls) {
        return this.clsTemplate({
            className: cls.name,
            dataProps: "" + cls.properties.map(function (prop) { return "" + prop.name + (prop.isOptional ? '?' : '') + ": " + prop.type + ";"; }).join('\n    '),
            classProps: "" + cls.properties.map(function (prop) {
                var getterName = toCameCase("get_" + prop.name), setterName = toCameCase("set_" + prop.name);
                return prop.name + ": " + prop.type + ";\n    " + getterName + "(): " + prop.type + ";\n    " + setterName + "(value: any, noAssert?: boolean);";
            }).join('\n    ')
        });
    };
    return NamespaceDrawer;
}(drawer_1.Drawer));
exports.NamespaceDrawer = NamespaceDrawer;
function toCameCase(str) {
    return str.replace(/_([a-z])/g, function (g) { return g[1].toUpperCase(); });
}
//# sourceMappingURL=namespace-drawer.js.map