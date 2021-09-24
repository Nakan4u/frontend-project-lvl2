#!/usr/bin/env node
import genDiff from '../index.js'
import program from 'commander';

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    const difference = genDiff(filepath1, filepath2);
    console.log(difference);
  })
  .parse(process.argv);
