const fs = require('fs');
const path = require('path');

const SOURCE_DIR = path.resolve('scripts/template/queries');

function createQuery({ feature, command }) {
  const featureDir = path.resolve('core', feature, 'application-module');
  const targetHandlerPath = path.join(featureDir, 'queries', 'handlers', `${command}.handler.ts`);
  const targetCommandPath = path.join(featureDir, 'queries', 'impl', `${command}.query.ts`);

  if (!fs.existsSync(featureDir)) {
    console.error('not found feature');
    process.exit(1);
    return;
  }
  if (fs.existsSync(targetHandlerPath) || fs.existsSync(targetCommandPath)) {
    console.error('query or handler already exists');
    process.exit(1);
  }

  if (!fs.existsSync(path.join(featureDir, 'queries'))) {
    fs.mkdirSync(path.join(featureDir, 'queries'));
  }
  if (!fs.existsSync(path.join(featureDir, 'queries/handlers'))) {
    fs.mkdirSync(path.join(featureDir, 'queries/handlers'));
  }
  if (!fs.existsSync(path.join(featureDir, 'queries/impl'))) {
    fs.mkdirSync(path.join(featureDir, 'queries/impl'));
  }

  let handlerSource = fs.readFileSync(path.join(SOURCE_DIR, 'handlers', 'get-feature.handler.ts'), {
    encoding: 'utf-8',
  });
  let commandSource = fs.readFileSync(path.join(SOURCE_DIR, 'impl', 'get-feature.command.ts'), {
    encoding: 'utf-8',
  });

  handlerSource = handlerSource.split('GetFeature').join(command);
  commandSource = commandSource.split('GetFeature').join(command);
  handlerSource = handlerSource.split('get-feature').join(command);

  fs.writeFileSync(targetHandlerPath, handlerSource);
  fs.writeFileSync(targetCommandPath, commandSource);

  console.log(`query "${command}" for "${feature}" module generated`);
}

// createCommand({ feature: 'auth', command: 'refresh' });
module.exports = createQuery;
