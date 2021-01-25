'use strict';

const homework = {
  study() {
    console.log(`Please study ${ this.topic }`);
  }
};

const jsHomework = Object.create(homework);
jsHomework.topic = 'JS';
jsHomework.study(); // this.topic resolves to 'JS' as expected

const mathHomework = Object.create(homework);
mathHomework.topic = 'Math';
mathHomework.study(); // this.topic resolves to 'Math' as expected

