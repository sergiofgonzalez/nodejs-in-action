import * as shell from 'shelljs';

/* views */
shell.cp('-R', 'app/src/views', 'dist/');

/* static resources */
shell.cp('-R', 'app/src/public/stylesheets', 'dist/public');
shell.cp('-R', 'node_modules/bootstrap/dist/css/bootstrap.min.css*', 'dist/public/stylesheets/');
shell.cp('-R', 'app/src/public/images', 'dist/public');
