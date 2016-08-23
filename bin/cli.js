#!/usr/bin/env node
"use strict";
var npp2ts_1 = require('../npp2ts');
var argv = require('yargs')
    .usage('Usage: $0 <cmd> [args]')
    .alias('f', 'file')
    .alias('o', 'out')
    .nargs({ f: 1, o: 1 })
    .describe('f', 'Input file model')
    .describe('o', 'Output file with definitions')
    .demand('f')
    .argv;
npp2ts_1.app(argv.file, argv.out);
//# sourceMappingURL=cli.js.map