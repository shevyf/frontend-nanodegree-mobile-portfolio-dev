module.exports = function(grunt) {
    
grunt.initConfig({
  concat: {
    viewsCss: {
      src: ['views/css/bootstrap-grid.css', 'views/css/style.css'],
      dest: 'build/views/css/main.css',
    },
  },
  
  jshint: {
    beforeconcat: ['js/*.js', 'views/js/*.js'], // task goes before concat
    afterconcat: ['build/js/*.js', 'build/views/js/*.js'] // task goes after concat
  },
  
  csslint: {
    css: {
      options: {
        import: false
      },
      src: ['css/*.css', 'views/css/*.css']
    }
  },
  
  cssmin: {
    target: {
      files: [{
        expand: true,
        cwd: 'css',
        src: ['*.css', '!*.min.css'],
        dest: 'build/css',
        ext: '.min.css'
      },
      {
        expand: true,
        cwd: 'views/css',
        src: ['*.css', '!*.min.css'],
        dest: 'build/views/css',
        ext: '.min.css'
      }]
    },
  },
  
  uglify: {
    targets: {
      files: [{
        expand: true,
        cwd: 'js',
        src: '**/*.js',
        dest: 'build/js',
        ext: '.min.js'
      },
      {
        expand: true,
        cwd: 'views/js',
        src: '**/*.js',
        dest: 'build/views/js',
        ext: '.min.js'
      }]
    }
  },
  
  htmlmin: {                                     // Task 
    html: {                                      // Target 
      options: {                                 // Target options 
        removeComments: true,
        collapseWhitespace: true
      },
      files: [{
        expand: true,
        cwd: 'views',
        src: '*.html',
        dest: 'build/views',
        ext: '.html'
      },
      {
        expand: true,
        cwd: '',
        src: '*.html',
        dest: 'build',
        ext: '.html'
      }]
    },
  },
  
  imagemin: {
    images: {
      files: [{
        expand: true,
        cwd: 'img',
        src: ['**/*.{png,jpg,gif}'],
        dest: 'build/img'
      },
      {
        expand: true,
        cwd: 'views/images',
        src: ['**/*.{png,jpg,gif}'],
        dest: 'build/views/images'
      }
      ]
    },
  },
  
  // Order: jslint, csslint, concat (css), cssmin, uglify (js), htmlmin
  watch: {
    js: {
      files: ['js/*.js', 'views/js/*.js'], // watch all js files for changes
      tasks: ['jshint:beforeconcat', 'uglify'],
      },
    html: {
      files: ['*.html', 'views/*.html'], // watch all js files for changes
      tasks: ['htmlmin'],
    },
    css: {
      files: ['css/*.css', 'views/css/*.css'],
      tasks: ['csslint','cssmin'],
    },
    images: {
      files: ['img/*', 'views/images/*'],
      tasks: ['imagemin'],
    }
  },
  
});

grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-imagemin');
grunt.loadNpmTasks('grunt-contrib-csslint');
grunt.loadNpmTasks('grunt-contrib-htmlmin');
   
grunt.registerTask('default', ['jshint:beforeconcat', 'uglify', 'htmlmin', 'csslint','cssmin', 'imagemin', 'watch']);
}