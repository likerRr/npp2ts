"use strict";
const drawer_1 = require("./drawer");
class EnumDrawer extends drawer_1.Drawer {
    constructor(enm) {
        super();
        this.enm = enm;
    }
    get template() {
        return this.builder `
export namespace ${'namespace'} {
  export enum ${'enumName'} {
    ${'properties'}
  }
}
    `;
    }
    draw() {
        return this.template({
            enumName: this.enm.name,
            namespace: this.enm.namespace,
            properties: `${this.enm.values.map(prop => `${prop.name}${prop.val !== null ? ` = ${prop.val}` : ''},`).join('\n    ')}`
        });
    }
}
exports.EnumDrawer = EnumDrawer;
//# sourceMappingURL=enum-drawer.js.map