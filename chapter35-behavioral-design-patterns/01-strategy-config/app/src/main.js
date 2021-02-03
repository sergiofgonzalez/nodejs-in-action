import { Config } from './lib/config.js';
import { iniStrategy } from './lib/strategies/ini-strategy.js';
import { jsonStrategy } from './lib/strategies/json-strategy.js';

async function main() {
  /* INI */
  const iniConfig = new Config(iniStrategy);
  await iniConfig.load(`samples/conf.ini`);
  console.log(iniConfig.get(`greeting`));
  iniConfig.set('book.nodejs', 'design patterns');
  await iniConfig.save(`samples/conf_mod.ini`);

  /* JSON */
  const jsonConfig = new Config(jsonStrategy);
  await jsonConfig.load(`samples/conf.json`);
  console.log(jsonConfig.get(`greeting`));
  jsonConfig.set('book.nodejs', 'design patterns');
  await jsonConfig.save(`samples/conf_mod.json`);
}

main()
  .then(() => console.log(`Done!!!`))
  .catch((err) => console.error(`ERROR: ${ err.message }`));
