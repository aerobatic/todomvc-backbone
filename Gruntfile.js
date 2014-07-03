module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      all: ['Gruntfile.js', 'js/**/*.js']
    },
    uglify: {
      build: {
        files: {
          'tmp/backbone.min.js': ['bower_components/underscore/underscore.js', 'bower_components/backbone/backbone.js'],
          // These files appear to need to be concatenated in a specific order
          'dist/app.min.js': ['js/models/*.js', 'js/collections/*.js', 'js/views/*.js', 'js/routers/*.js', 'js/app.js']
        }
      }
    },
    // If you are using a
    cssmin: {
      combine: {
        files: {
          'dist/app.min.css': ['bower_components/todomvc-common/base.css']
        }
      }
    },
    concat: {
      dist: {
        src: [
          'bower_components/jquery/jquery.min.js',
          'tmp/backbone.min.js',
          'bower_components/backbone.localStorage/backbone.localStorage-min.js'
        ],
        dest: 'dist/components.min.js',
      },
    },
    copy: {
      // Need to copy bg.png to the dist folder so the relative background-image
      // url will still resolve in release builds.
      images: {
        src: 'bower_components/todomvc-common/bg.png',
        dest: 'dist/bg.png',
        flatten: true
      }
    },
    watch: {
      options: {
        spawn: true,
        livereload: true
      },
      index: {
        files: ['index.html']
      },
      css: {
        files: ['css/*.css'],
        livereload: true
      },
      scripts: {
        files: ['js/**/*.js']
      }
    },
    clean: ['tmp'],
    aerobatic: {
      // These are the files that should be deployed to the cloud.
      deploy: {
        src: ['index.html', 'dist/*.*', 'favicons/*.*', 'templates/*.mst']
      },
      sim: {
        index: 'index.html',
        port: 3000,
        livereload: true
      }
    }
  });


  grunt.registerTask('build', ['jshint', 'copy', 'uglify', 'concat', 'cssmin', 'clean']);

  // Specify the sync option to avoid blocking the watch task
  grunt.registerTask('sim', ['build', 'aerobatic:sim:sync', 'watch']);

  // Create a deploy alias task which builds then deploys to aerobatic in the cloud
  grunt.registerTask('deploy', ['build', 'aerobatic:deploy']);

  grunt.loadNpmTasks('grunt-aerobatic');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
};
