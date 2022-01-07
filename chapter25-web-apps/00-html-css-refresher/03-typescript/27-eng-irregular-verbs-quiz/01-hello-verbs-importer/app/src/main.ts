import { promises as fsPromises } from 'fs';
import path from 'path';
import Papa from 'papaparse';


interface Verb {
  infinitive: string;
  pastSimple: string[];
  pastParticiple: string[];
}

interface ParseResultEntry {
  ' infinitive ': string;
  ' past simple ': string;
  ' past participle ': string;
}

async function main() {
  const contents = await fsPromises.readFile(path.join(__dirname, '..', 'irregular-verbs.md'));
  const parsingResults = Papa.parse<ParseResultEntry>(contents.toString(), { header: true });
  const cleanedResults = parsingResults.data.map(entry => {
    const verb: Verb = {
      infinitive: entry[' infinitive '].trim(),
      pastSimple: entry[' past simple '].trim().split('/'),
      pastParticiple: entry[' past participle '].trim().split('/')
    };
    return { [verb.infinitive]: verb };
  });

  const jsonResults = JSON.stringify(cleanedResults);
  fsPromises.writeFile(path.join(__dirname, '..', 'irregular-verbs.json'), jsonResults);
}

main()
  .then((results) => console.log(results))
  .catch((err) => console.error(`ERROR: ${ (err as Error).message }`));
