const commander = require('commander');
const prompts = require('prompts');
const fs = require('fs');
const path = require('path');

const createModule = require('./module');

const program = new commander.Command();

program.name('generator');

program.action(async () => {
  const promptType = await prompts({
    type: 'select',
    name: 'type',
    message: 'Select generation type',
    choices: [{ title: 'Module', value: 'module' }],
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
