module.exports = function(grunt) {

  grunt.initConfig({

    jshint: {
      js: ['portfoliodev/js/perfmatters.js', 'portfoliodev/views/js/main.js']
    },

    csslint: {
      css: {
        options: {
          import: false
        },
        src: ['portfoliodev/css/*.css', 'portfoliodev/views/css/*.css']
      }
    },

    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'portfoliodev/css',
          src: ['*.css', '!*.min.css'],
          dest: 'portfoliodev/css',
          ext: '.min.css'
        }, {
          expand: true,
          cwd: 'portfoliodev/views/css',
          src: ['*.css', '!*.min.css'],
          dest: 'portfoliodev/views/css',
          ext: '.min.css'
        }]
      }
    },

    uglify: {
      targets: {
        files: [{
          expand: true,
          cwd: 'portfoliodev/js',
          src: ['*.js', '!*.min.js'],
          dest: 'portfoliodev/js',
          ext: '.min.js'
        }, {
          expand: true,
          cwd: 'portfoliodev/views/js',
          src: ['*.js', '!*.min.js'],
          dest: 'portfoliodev/views/js',
          ext: '.min.js'
        }]
      }
    },

    htmlmin: {
      html: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: [{
          expand: true,
          cwd: 'portfoliodev/views',
          src: '*.html',
          dest: 'portfolio/views',
          ext: '.html'
        }, {
          expand: true,
          cwd: 'portfoliodev',
          src: '*.html',
          dest: 'portfolio',
          ext: '.html'
        }]
      }
    },

    imagemin: {
      images: {
        files: [{
          expand: true,
          cwd: 'portfoliodev/img',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'portfolio/img'
        }, {
          expand: true,
          cwd: 'portfoliodev/views/images',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'portfolio/views/images'
        }]
      }
    },

    copy: {
      js: {
        files: [
        {
          expand:true, 
          cwd: 'portfoliodev/js',
          src: ['*.min.js'], 
          dest: 'portfolio/js/'
        },
        {
          expand:true, 
          cwd: 'portfoliodev/views/js',
          src: ['*.min.js'], 
          dest: 'portfolio/views/js/'
        }
        ]
      },
      css: {
        files: [
        {expand:true, src:['portfoliodev/css/*.min.css'], dest: 'portfolio/css/'},
        {expand: true, src:['portfoliodev/views/css/*.min.css'], dest: 'portfolio/views/css/'}
        ]
      }
    },

    // Order: jslint, csslint, concat (css), cssmin, uglify (js), htmlmin
    watch: {
      js: {
        files: ['portfoliodev/js/*.js', 'portfoliodev/views/js/*.js'], // watch all js files for changes
        tasks: ['jshint', 'uglify', 'copy:js']
      },
      html: {
        files: ['portfoliodev/*.html', 'portfoliodev/views/*.html'], // watch all js files for changes
        tasks: ['htmlmin']
      },
      css: {
        files: ['portfoliodev/css/*.css', 'portfoliodev/views/css/*.css'],
        tasks: ['csslint', 'cssmin', 'copy:css']
      },
      images: {
        files: ['portfoliodev/img/*', 'portfoliodev/views/images/*'],
        tasks: ['imagemin']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['jshint', 'uglify', 'htmlmin',
    'csslint', 'cssmin', 'imagemin', 'watch'
  ]);
  grunt.registerTask('js', ['jshint', 'uglify', 'copy:js']);
  grunt.registerTask('css', ['csslint', 'cssmin', 'copy:css']);
  grunt.registerTask('html', 'htmlmin');
  grunt.registerTask('image', 'imagemin');
  grunt.registerTask('watching', 'watch');
};