module.exports = function (grunt) {
  var gruntConfig = {};
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  gruntConfig.jasmine = {
    src : {
      src : [
        'src/**/*.js',
        '!src/lib/*.js'
      ],
      options: {
        specs: 'test/**/*.test.js',
        vendor: [
          'src/lib/**/*.js'
        ],
        keepRunner: true 
      }
    }
  };
  grunt.registerTask('test', ['jasmine:src']);
  grunt.initConfig(gruntConfig);
}
