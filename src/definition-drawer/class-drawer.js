"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var drawer_1 = require('./drawer');
var ClassDrawer = (function (_super) {
    __extends(ClassDrawer, _super);
    function ClassDrawer(cls) {
        _super.call(this);
        this.cls = cls;
    }
    Object.defineProperty(ClassDrawer.prototype, "template", {
        get: function () {
            return (_a = ["\nexport namespace ", " {\n  export class ", " extends ProtoBufMessage {\n    constructor(data: ", "Data);\n    static decode(buffer?: any, length?: number | string, enc?: string): ", ";\n    ", "\n  }\n  \n  interface ", "Data {\n    ", "\n  }\n}\n    "], _a.raw = ["\nexport namespace ", " {\n  export class ", " extends ProtoBufMessage {\n    constructor(data: ", "Data);\n    static decode(buffer?: any, length?: number | string, enc?: string): ", ";\n    ", "\n  }\n  \n  interface ", "Data {\n    ", "\n  }\n}\n    "], this.builder(_a, 'namespace', 'className', 'className', 'className', 'classProps', 'className', 'dataProps'));
            var _a;
        },
        enumerable: true,
        configurable: true
    });
    ClassDrawer.prototype.draw = function () {
        return this.template({
            className: this.cls.name,
            namespace: this.cls.namespace,
            dataProps: "" + this.cls.properties.map(function (prop) { return ("" + prop.name + (prop.isOptional ? '?' : '') + ": " + prop.type + ";"); }).join('\n    '),
            classProps: "" + this.cls.properties.map(function (prop) {
                var getterName = toCameCase("get_" + prop.name), setterName = toCameCase("set_" + prop.name);
                return prop.name + ": " + prop.type + ";\n    " + getterName + "(): " + prop.type + ";\n    " + setterName + "(value: any, noAssert?: boolean);";
            }).join('\n    ')
        });
    };
    return ClassDrawer;
}(drawer_1.Drawer));
exports.ClassDrawer = ClassDrawer;
function toCameCase(str) {
    return str.replace(/_([a-z])/g, function (g) { return g[1].toUpperCase(); });
}
//# sourceMappingURL=class-drawer.js.map