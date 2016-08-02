'use strict';

/**
 * Copy the html files in the dist folder
 */
module.exports = (gulp, config) => {
  const tasks = {
    'copy-html': {
      fn: copyHtmlTask,
      description: 'Copy the html files in the dist folder'
    }
  };
  return tasks;

  function copyHtmlTask() {
    gulp.src('client/*.html')
      .pipe(gulp.dest(config.folders.build));

    gulp.src('graphiql/*.html')
      .pipe(gulp.dest(`${config.folders.build}/graphiql`));
  }
};
