#!/usr/bin/env node

declare let require: any;

import {app} from '../npp2ts';

const argv = require('yargs')
  .usage('Usage: $0 <cmd> [args]')
  .alias('f', 'file')
  .alias('o', 'out')
  .nargs({f: 1, o: 1})
  .describe('f', 'Input file model')
  .describe('o', 'Output file with definitions')
  .demand('f')
  .argv;

app(argv.file, argv.out);
