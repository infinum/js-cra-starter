#!/usr/bin/env node

// @ts-check

const program = require('commander');

// @ts-ignore
const app = require('./package.json');
const create = require('./create');

let projectName;

program
  .version(app.version, '-v, --version')
  .arguments('<projectName>')
  .action((name) => {
    projectName = name;
  })
  .option('-j, --jsonapi', 'Add json:api support')
  .option('-s, --storybook', 'Add storybook support')
  .parse(process.argv);

create(projectName, program).then(
  () => console.log('Done!'),
  (e) => console.error(e),
);
