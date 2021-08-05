import * as shell from 'shelljs';

shell.cp('-R', 'app/src/views', 'dist/');
shell.cp('-R', 'app/src/public/stylesheets', 'dist/public');
shell.cp('-R', 'app/src/public/images', 'dist/public');
