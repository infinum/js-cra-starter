#!/usr/bin/env node

const {exec: execNode} = require('child_process');
const fs = require('fs');
const path = require('path');

function exec(command, options = {}) {
  return new Promise((resolve, reject) => {
    execNode(command, options, (err, stdout, stderr) => {
      if (err) {
        reject(err);
      } else {
        resolve(stdout);
      }
    })
  });
}

const newFolders = [
  'components',
  'containers',
  'containers/App',
  'enums',
  'interfaces',
  'utils',
  'services',
  'state',
  'state/models',
  'assets',
  'styles',
];

const moveFiles = {
  'App.css': 'containers/App/styles.css',
  'App.test.tsx': 'containers/App/test.tsx',
  'App.tsx': 'containers/App/index.tsx',
  'logo.svg': 'assets/logo.svg',
};

const updateFiles = {
  'App.tsx': [{
    from: './logo.svg',
    to: '../../assets/logo.svg',
  }, {
    from: './App.css',
    to: './styles.css',
  }],
  'App.test.tsx': [{
    from: './App',
    to: './index',
  }],
  'index.tsx': [{
    from: './App',
    to: './containers/App',
  }],
};

const newFiles = {
  'state/index.ts': `import { AppData } from './AppData';
const state = new AppData();
export default state;
`,
  'state/AppData.ts': `import { Collection } from 'datx';

import { User } from './models';

export class AppData extends Collection {
  public static types = [User];
}
`,
  'state/models/index.ts': `export { User } from './User';`,
  'state/models/User.ts': `import { Model, prop } from 'datx';

export class User extends Model {
  public static type = 'user';

  @prop
  public name!: string;
}
`,
  'interfaces/IDictionary.ts': `export interface IDictionary<T = any> {
  [key: string]: T;
}
`,
};

(async function() {
  const projectName = process.argv[2];
  const projectPath = path.join(process.cwd(), projectName);
  const projectSrcPath = path.join(projectPath, 'src');

  console.log(`Creating a CRA TypeScript project ${projectName}...`);

  console.log('Step 1/7 Set up CRA');
  await exec(`npx create-react-app ${projectName} --typescript`);

  console.log('Step 2/7 Install all dependencies');
  await exec('yarn add mobx@4 mobx-react datx decko emotion', {cwd: projectName});
  await exec('yarn add -D husky @infinumjs/tslint-config-react lint-staged tslint', {cwd: projectName});

  console.log('Step 3/7 Create new folders');
  for(let folder of newFolders) {
    fs.mkdirSync(path.join(projectSrcPath, folder));
  }

  console.log('Step 4/7 Update file links');
  for (let file of Object.keys(updateFiles)) {
    const changes = updateFiles[file];
    let fileContent = fs.readFileSync(path.join(projectSrcPath, file), 'utf-8');

    for (let change of changes) {
      fileContent = fileContent.replace(change.from, change.to);
    }

    fs.writeFileSync(path.join(projectSrcPath, file), fileContent);
  }

  console.log('Step 5/7 Move files around');
  for (let file of Object.keys(moveFiles)) {
    fs.renameSync(path.join(projectSrcPath, file), path.join(projectSrcPath, moveFiles[file]));
  }

  console.log('Step 6/7 Add new files');
  for (let file of Object.keys(newFiles)) {
    const content = newFiles[file];
    fs.writeFileSync(path.join(projectSrcPath, file), content);
  }

  fs.writeFileSync(path.join(projectPath, 'tslint.json'), `{
  "extends": "@infinumjs/tslint-config-react",
  "rules": {
    "no-reserved-keywords": false,
    "react-this-binding-issue": false,
    "no-void-expression": false,
    "completed-docs": false,
    "match-default-export-name": false,
    "no-unsafe-any": false,
    "no-implicit-dependencies": false,
    "no-submodule-imports": false
  }
}`);

  console.log('Step 7/7 Update configs');

  const tsconfig = require(path.join(projectPath, 'tsconfig.json'));
  tsconfig.compilerOptions.experimentalDecorators = true;
  tsconfig.compilerOptions.lib = ['es2015', 'dom'];
  fs.writeFileSync(path.join(projectPath, 'tsconfig.json'), JSON.stringify(tsconfig, null, 2));

  const package = require(path.join(projectPath, 'package.json'));
  package.scripts.lint = `tslint './src/**/*.ts*'`;
  package.scripts.precommit = `lint-staged && CI=true yarn test`;
  package['lint-staged'] = {
    '**/*.ts': [
      'tslint'
    ],
    '**/*.tsx': [
      'tslint'
    ]
  };
  fs.writeFileSync(path.join(projectPath, 'package.json'), JSON.stringify(package, null, 2));

  console.log('Setup done!');
})();
