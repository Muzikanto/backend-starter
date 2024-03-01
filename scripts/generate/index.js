const commander = require('commander');
const prompts = require('prompts');
const fs = require('fs');
const path = require('path');

const createModule = require('./module');
const createCommand = require('./command');
const createQuery = require('./query');

const program = new commander.Command();

program.name('generator');

program.action(async () => {
  const promptType = await prompts({
    type: 'select',
    name: 'type',
    message: 'Select generation type',
    choices: [
      { title: 'Module', value: 'module' },
      { title: 'Command', value: 'command' },
      { title: 'Query', value: 'query' },
    ],
  });

  if (!promptType.type) {
    process.exit();
  }

  switch (promptType.type) {
    case 'module': {
      const promptName = await prompts({
        type: 'text',
        name: 'featureName',
        message: 'Enter module name',
        validate: (v) => (fs.existsSync(path.resolve('core', v)) ? 'directory already used' : true),
      });

      if (!promptName.featureName) {
        process.exit();
      }

      createModule({ featureName: promptName.featureName });
      break;
    }
    case 'command': {
      const promptName = await prompts({
        type: 'text',
        name: 'featureName',
        message: 'Enter module name',
        validate: (v) => (!fs.existsSync(path.resolve('core', v)) ? 'feature not found' : true),
      });

      if (!promptName.featureName) {
        process.exit();
      }

      const promptCommand = await prompts({
        type: 'text',
        name: 'name',
        message: 'Enter command name',
        validate: (v) =>
          v
            ? fs.existsSync(path.resolve('core', v, 'application-module', 'commands', 'handlers', `${v}.handler.ts`))
              ? 'command already exists'
              : true
            : 'Name required',
      });

      if (!promptCommand.name) {
        process.exit();
      }

      createCommand({
        feature: promptName.featureName,
        command: promptCommand.name.slice(0, 1).toUpperCase() + promptCommand.name.slice(1),
      });
      break;
    }
    case 'query': {
      const promptName = await prompts({
        type: 'text',
        name: 'featureName',
        message: 'Enter module name',
        validate: (v) => (!fs.existsSync(path.resolve('core', v)) ? 'feature not found' : true),
      });

      if (!promptName.featureName) {
        process.exit();
      }

      const promptCommand = await prompts({
        type: 'text',
        name: 'name',
        message: 'Enter query name',
        validate: (v) =>
          v
            ? fs.existsSync(path.resolve('core', v, 'application-module', 'queries', 'handlers', `${v}.handler.ts`))
              ? 'query already exists'
              : true
            : 'Name required',
      });

      if (!promptCommand.name) {
        process.exit();
      }

      createQuery({
        feature: promptName.featureName,
        command: promptCommand.name.slice(0, 1).toUpperCase() + promptCommand.name.slice(1),
      });
      break;
    }
    default: {
      console.warn('unknown type, exit..');
      process.exit();
      break;
    }
  }
});

program
  .command('module')
  .argument('name', 'module name')
  .action((featureName) => {
    createModule({ featureName });
  });

program.parse();
