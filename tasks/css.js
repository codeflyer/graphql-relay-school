'use strict';

/**
 * Bundle and copy the css/scss files in the dist folder
 */
module.exports = (gulp, config) => {
  const tasks = {
    css: {
      seq: [
        cssTask,
        () => {
          gulp.src('node_modules/graphiql/graphiql.css')
            .pipe(gulp.dest(`${config.folders.build}/graphiql`));
        }
      ],
      description: 'Bundle and copy the css/scss files in the dist folder'
    }
  };
  return tasks;

  function cssTask() {
    const sass = require('gulp-sass');
    const cssGlobbing = require('gulp-css-globbing');

    return gulp.src(['client/styles.scss'])
      .pipe(cssGlobbing({
        extensions: ['.css', '.scss'],
        ignoreFolders: ['../styles'],
        autoReplaceBlock: {
          onOff: true,
          globBlockBegin: 'cssGlobbingBegin',
          globBlockEnd: 'cssGlobbingEnd',
          globBlockContents: '../**/*.scss'
        },
        scssImportPath: {
          leading_underscore: false,
          filename_extension: false
        }
      }))
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest(config.folders.build));
  }
};
