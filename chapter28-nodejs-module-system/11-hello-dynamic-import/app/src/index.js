#!/usr/bin/env node

'use strict';

const SUPPORTED_LANGUAGES = ['el', 'en', 'es', 'it', 'pl'];
const selectedLanguage = process.argv[2];

if (!selectedLanguage) {
  console.error(`ERROR: the script requires a language argument`);
  process.exit(1);
}

if (!SUPPORTED_LANGUAGES.includes(selectedLanguage)) {
  console.error(`ERROR: The specified language '${ selectedLanguage }' is not supported`);
  process.exit(1);
}

const translationModule = `./hello-${ selectedLanguage }.js`;
import(translationModule)
  .then((strings) => {
    console.log(strings.HELLO);
  });