import { getDbInstance as getDbInstanceFromA } from './lib/lib-a.js';
import { getDbInstance as getDbInstanceFromB } from './lib/lib-b.js';

const isSameInstance = getDbInstanceFromA() === getDbInstanceFromB();

console.log(`Is the db instance in lib A the same as the one in lib B? ${ isSameInstance? 'YES' : 'NO'}`);