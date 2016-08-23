#!/usr/bin/env node

declare let require: any;

import {npp2ts} from '../npp2ts';

const argv = require('yargs')
  .usage('Usage: $0 <cmd> [args]')
  .alias('f', 'file')
  .alias('o', 'out')
  .nargs({f: 1, o: 1})
  .describe('f', 'Input file model')
  .describe('o', 'Output file with definitions')
  .demand('f')
  .argv;

npp2ts(argv.file, argv.out);
