"use strict";
const drawer_1 = require("./drawer");
const class_def_1 = require("../entity-definitions/class-def");
const enum_def_1 = require("../entity-definitions/enum-def");
class NamespaceDrawer extends drawer_1.Drawer {
    constructor(ns, ents) {
        super();
        this.ns = ns;
        this.ents = ents;
    }
    get template() {
        return `
export namespace ${this.ns} {
  ${this.drawEntities()}
}
    `;
    }
    draw() {
        return this.template;
    }
    drawEntities() {
        return this.ents.map(ent => {
            if (ent instanceof class_def_1.ClassDef) {
                return this.buildClsTemplate(ent);
            }
            if (ent instanceof enum_def_1.EnumDef) {
                return this.buildEnmTemplate(ent);
            }
            return '';
        }).join('\n');
    }
    get clsTemplate() {
        return this.builder `
  export class ${'className'} extends ProtoBufMessage {
    constructor(data: ${'className'}Data);
    static decode(buffer?: any, length?: number | string, enc?: string): ${'className'};
    ${'classProps'}
  }
  
  interface ${'className'}Data {
    ${'dataProps'}
  }
`;
    }
    get enmTemplate() {
        return this.builder `
  export const enum ${'enumName'} {
    ${'properties'}
  }
    `;
    }
    buildEnmTemplate(enm) {
        return this.enmTemplate({
            enumName: enm.name,
            namespace: enm.namespace,
            properties: `${enm.values.map(prop => `${prop.name}${prop.val !== null ? ` = ${prop.val}` : ''},`).join('\n    ')}`
        });
    }
    buildClsTemplate(cls) {
        return this.clsTemplate({
            className: cls.name,
            dataProps: `${cls.properties.map(prop => `${prop.name}${prop.isOptional ? '?' : ''}: ${prop.type};`).join('\n    ')}`,
            classProps: `${cls.properties.map(prop => {
                let getterName = toCameCase(`get_${prop.name}`), setterName = toCameCase(`set_${prop.name}`);
                return `${prop.name}: ${prop.type};
    ${getterName}(): ${prop.type};
    ${setterName}(value: any, noAssert?: boolean);`;
            }).join('\n    ')}`
        });
    }
}
exports.NamespaceDrawer = NamespaceDrawer;
function toCameCase(str) {
    return str.replace(/_([a-z])/g, g => g[1].toUpperCase());
}
//# sourceMappingURL=namespace-drawer.js.map