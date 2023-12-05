// node generate-component.js [ComponentName]
// node generate-component.js Avatar

// eslint-disable-next-line
const path = require('path');
// eslint-disable-next-line
const fs = require('fs');

const migrationsFolder = path.resolve('libs/migrations');

const migrationName = process.argv[2];
const migrationTime = new Date().getTime();

if (!migrationName) {
  throw Error('Require migrationName');
}

const pathExample = path.join(__dirname, 'migration-example.ts');

const pathToMigrationFile = path.join(migrationsFolder, `${migrationTime}_${migrationName}.ts`);

// filesContent

const fileContent = fs
  .readFileSync(path.join(pathExample), { encoding: 'utf-8' })
  .toString()
  .split('Example')
  .join(
    migrationName
      .split('_')
      .map((word) => word.slice(0, 1).toUpperCase() + word.slice(1))
      .join('')
  )
  .split('TIME')
  .join(migrationTime.toString());

if (!fs.existsSync(pathToMigrationFile)) {
  fs.writeFileSync(pathToMigrationFile, fileContent, { encoding: 'utf-8' });
}

console.log(`New "${migrationName}" migration success created`);
console.log(`path: ${pathToMigrationFile}`);
