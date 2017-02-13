"use strict";
const drawer_1 = require("./drawer");
class ClassDrawer extends drawer_1.Drawer {
    constructor(cls) {
        super();
        this.cls = cls;
    }
    get template() {
        return this.builder `
export namespace ${'namespace'} {
  export class ${'className'} extends ProtoBufMessage {
    constructor(data: ${'className'}Data);
    static decode(buffer?: any, length?: number | string, enc?: string): ${'className'};
    ${'classProps'}
  }
  
  export interface ${'className'}Data {
    ${'dataProps'}
  }
}
    `;
    }
    draw() {
        return this.template({
            className: this.cls.name,
            namespace: this.cls.namespace,
            dataProps: `${this.cls.properties.map(prop => `${prop.name}${prop.isOptional ? '?' : ''}: ${prop.type};`).join('\n    ')}`,
            classProps: `${this.cls.properties.map(prop => {
                let getterName = toCameCase(`get_${prop.name}`), setterName = toCameCase(`set_${prop.name}`);
                return `${prop.name}: ${prop.type};
    ${getterName}(): ${prop.type};
    ${setterName}(value: any, noAssert?: boolean);`;
            }).join('\n    ')}`
        });
    }
}
exports.ClassDrawer = ClassDrawer;
function toCameCase(str) {
    return str.replace(/_([a-z])/g, g => g[1].toUpperCase());
}
//# sourceMappingURL=class-drawer.js.map