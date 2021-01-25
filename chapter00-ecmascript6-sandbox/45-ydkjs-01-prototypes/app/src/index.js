'use strict';

/* Object prototype linkage can be set through Object.create() */
const homework = {
  topic: 'JS'
};

// establishes `homework` as the prototype of `otherHomework`
const otherHomework = Object.create(homework);

console.log(otherHomework.topic);

/* shadowing */
otherHomework.topic = 'Maths';
console.log(otherHomework.topic);


/* some other examples */
let Classroom = {
  welcome() { console.log(`Welcome students`); }
};

// link the mathClass instance to the Classroom object through its prototype
const mathClass = Object.create(Classroom); 

mathClass.welcome();

// alternative
function ClassroomAlt() { }
ClassroomAlt.prototype.welcome = function welcome() { console.log(`Welcome students`); };

const mathClassAlt = new ClassroomAlt();
mathClassAlt.welcome();

// definitely, this is much much cleaner

class ClassroomBest {
  welcome() { console.log(`Welcome students`); }
}

const mathClassBest = new ClassroomBest();
mathClassBest.welcome();