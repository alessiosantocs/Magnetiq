# Array containing levels
class Levels extends Array
  constructor: ->

  getLevel: (name)->
    for level in @ when level.name == name
      return level

    console.error "Level #{name} was not found!"

  push: (level)->
    super level

# Class to instantiate new levels
class Level
  constructor: (options={})->
    {@name, @fn} = options

  call: (scene)->
    @fn scene

# Global object for levels
levels = new Levels()
