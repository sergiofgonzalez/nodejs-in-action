import * as shell from 'shelljs';

shell.cp('-R', 'app/src/public/*.html', 'dist/public');
shell.cp('-R', 'app/src/public/icons', 'dist/public');
shell.cp('-R', 'app/src/public/stylesheets', 'dist/public');
