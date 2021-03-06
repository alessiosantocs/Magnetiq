module.exports = (grunt) ->
  grunt.initConfig
    coffee:
      compileJoined:
        options:
          join: true
        files:
          'js/magnetiq.v2.js':
            [
              'coffee/classes/point.coffee'
              'coffee/classes/animations/*.coffee'
              'coffee/levels/levels.coffee' # First of all
              'coffee/levels/level-*.coffee' # Then load all levels
              'coffee/classes/*.coffee'
              'coffee/*.coffee'
            ]
    watch:
      files: [
              'coffee/classes/point.coffee'
              'coffee/classes/animations/*.coffee'
              'coffee/levels/levels.coffee' # First of all
              'coffee/levels/level-*.coffee' # Then load all levels
              'coffee/classes/*.coffee'
              'coffee/*.coffee'
            ]
      tasks:
        [
          'coffee'
        ]

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-watch'

  grunt.registerTask 'default', ['coffee']
