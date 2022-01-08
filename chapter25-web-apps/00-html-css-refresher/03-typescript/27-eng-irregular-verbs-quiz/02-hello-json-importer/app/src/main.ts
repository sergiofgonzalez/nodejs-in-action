import jsonVerbs from './lib/irregular-verbs.json';


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

export async function main() {
  console.log(jsonVerbs);
  console.log(jsonVerbs[15]);
}

main()
  .then(() => console.log('-- done!'))
  .catch((err) => console.error(`ERROR: ${ (err as Error).message }`));
