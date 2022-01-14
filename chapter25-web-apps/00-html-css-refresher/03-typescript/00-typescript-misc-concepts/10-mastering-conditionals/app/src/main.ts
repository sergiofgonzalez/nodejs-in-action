/*
  Example 1:
  Depending on the value of a boolean variable `isActive`:
  + if isActive == true: Assign the value `on` to another variable `toggle`
  + if isActive == false: Assign the value `off` to the variable `toggle`.
*/

/* simplistic implementation: but can't use const */
// const isActive = true;
// let toggle;
// if (isActive) {
//   toggle = true;
// } else {
//   toggle = false;
// }

/* much better approach with the ternary operator */
// const toggle = isActive? 'on' : 'off';

/*
  Example 2:
  Given a variable `status` of type string, populate the value of another variable `label` according to these rules:
  + if status is `'finished'`, populate `label` with `'Finished task'`
  + if status is `'inactive'`, populate `label` with `'Task inactive'`
  + if status is `'ongoing'`, populate `label` with `'Ongoing task'`
*/

/* straight-forward approach with if */
// const status: string = 'ongoing';
// let label;
// if (status === 'finished') {
//   label = 'Finished task';
// } else if (status === 'inactive') {
//   label = 'Task inactive';
// } else if (status === 'ongoing') {
//   label = 'Ongoing task';
// }

/* alternative using switch */
// const status: string = 'ongoing';
// let label: string;
// switch (status) {
//   case 'finished':
//     label = 'Finished task';
//     break;
//   case 'inactive':
//     label = 'Task inactive';
//     break;
//   case 'ongoing':
//     label = 'Ongoing task';
//     break;
// }

/*
  Example 3:
  Same as example 2 but with the following changes:
  Let's assume a varian on the previous use case in which you need to:
  + populate a `tag` variable with the text `Finished`, `Inactive`, or `Ongoing`.
  + populate a `variant` variable with the text `secondary`, `disabled`, and `primary`
*/

// const status: string = 'ongoing';
// let label: string;
// let tag: string;
// let variant: string;
// switch (status) {
//   case 'finished':
//     label = 'Finished task';
//     tag = 'Finished';
//     variant = 'secondary';
//     break;
//   case 'inactive':
//     label = 'Task inactive';
//     tag = 'Inactive';
//     variant = 'disabled';
//     break;
//   case 'ongoing':
//     label = 'Ongoing task';
//     tag = 'Ongoing';
//     variant = 'primary';
//     break;
// }

/* a better solution is an object map */
// const status: string = 'ongoing';
// const statusMap = {
//   finished: {
//     label: 'Finished task',
//     tag: 'Finished',
//     variant: 'secondary'
//   },
//   inactive: {
//     label: 'Inactive task',
//     tag: 'Inactive',
//     variant: 'disabled'
//   },
//   ongoing: {
//     label: 'Ongoing task',
//     tag: 'Ongoing',
//     variant: 'primary'
//   }
// };


// const { label, tag, variant } = statusMap['ongoing']; // this works OK because it's a literal type

// const { label, tag, variant } = statusMap[status]; // the object cannot be indexed by the variable

/* The error above can be fixed using explicit literal types instead of strings */
// type Status = 'finished' | 'inactive' | 'ongoing';
// const status: Status = 'ongoing';
// const statusMap = {
//   finished: {
//     label: 'Finished task',
//     tag: 'Finished',
//     variant: 'secondary'
//   },
//   inactive: {
//     label: 'Inactive task',
//     tag: 'Inactive',
//     variant: 'disabled'
//   },
//   ongoing: {
//     label: 'Ongoing task',
//     tag: 'Ongoing',
//     variant: 'primary'
//   }
// };

// const { label, tag, variant } = statusMap['ongoing']; // this works now!

/* The TypeScript way to implement it */
type Status = 'finished' | 'inactive' | 'ongoing';

interface StatusObject {
  label: string;
  tag: string;
  variant: string;
}

type StatusMap = Record<Status, StatusObject>;

const statusMap: StatusMap = {
  finished: {
    label: 'Finished task',
    tag: 'Finished',
    variant: 'secondary'
  },
  inactive: {
    label: 'Inactive task',
    tag: 'Inactive',
    variant: 'disabled'
  },
  ongoing: {
    label: 'Ongoing task',
    tag: 'Ongoing',
    variant: 'primary'
  }
};

const { label, tag, variant } = statusMap['finished'];
