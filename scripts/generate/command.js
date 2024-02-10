const fs = require('fs');
const path = require('path');

const SOURCE_DIR = path.resolve('scripts/template/commands');

function createCommand({ feature, command }) {
  const featureDir = path.resolve('core', feature, 'application-module');
  const targetHandlerPath = path.join(featureDir, 'commands', 'handlers', `${command}.handler.ts`);
  const targetCommandPath = path.join(featureDir, 'commands', 'impl', `${command}.command.ts`);

  if (!fs.existsSync(featureDir)) {
    console.error('not found feature');
    process.exit(1);
    return;
  }
  if (fs.existsSync(targetHandlerPath) || fs.existsSync(targetCommandPath)) {
    console.error('command or handler already exists');
    process.exit(1);
  }

  if (!fs.existsSync(path.join(featureDir, 'commands'))) {
    fs.mkdirSync(path.join(featureDir, 'commands'));
  }
  if (!fs.existsSync(path.join(featureDir, 'commands/handlers'))) {
    fs.mkdirSync(path.join(featureDir, 'commands/handlers'));
  }
  if (!fs.existsSync(path.join(featureDir, 'commands/impl'))) {
    fs.mkdirSync(path.join(featureDir, 'commands/impl'));
  }

  let handlerSource = fs.readFileSync(path.join(SOURCE_DIR, 'handlers', 'create-feature.handler.ts'), {
    encoding: 'utf-8',
  });
  let commandSource = fs.readFileSync(path.join(SOURCE_DIR, 'impl', 'create-feature.command.ts'), {
    encoding: 'utf-8',
  });

  handlerSource = handlerSource.split('CreateFeature').join(command);
  commandSource = commandSource.split('CreateFeature').join(command);
  handlerSource = handlerSource.split('create-feature').join(command);

  fs.writeFileSync(targetHandlerPath, handlerSource);
  fs.writeFileSync(targetCommandPath, commandSource);

  console.log(`command "${command}" for "${feature}" module generated`);
}

// createCommand({ feature: 'auth', command: 'refresh' });
module.exports = createCommand;
