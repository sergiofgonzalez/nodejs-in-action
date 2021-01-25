'use strict';

/* Example 1: ECMAScript modules */
import { getName } from './lib/define-student.mjs'; // exported as `export { getName };`
console.log(getName(73));

/* Example 2: export variation 1 */
/* Fails with 'does not provide an export named 'default'
import getNameV1 from './lib/define-student-v1.mjs'; // exported as `export function getName(studentID) { ... }`
console.log(getNameV1(73));
*/

/* Example 3: export variation 2 */
import getNameV2 from './lib/define-student-v2.mjs'; // exported as `export function getName(studentID) { ... }`
console.log(getNameV2(73));

/* Example 4: export variation 3 */
import getNameV3 from './lib/define-student-v3.mjs'; // exported as `export function getName(studentID) { ... }`
console.log(getNameV3(73));
