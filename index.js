import { Command } from 'commander';

export default () => {
  const program = new Command();
  program.version('0.0.1');
  program.description('Compares two configuration files and shows a difference.');
  return program;
}