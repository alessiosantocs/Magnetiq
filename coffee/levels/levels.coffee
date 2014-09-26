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

  call: (scene, options={})->
    {@onLevelEnding} = options
    @fn scene, @

  # A basic method you should call when the level ends
  end: (levelResult)->
    @onLevelEnding(levelResult) # Invoke the callback because the level has ended

# Global object for levels
levels = new Levels()
