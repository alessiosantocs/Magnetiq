# Array containing levels
class Levels extends Array
  constructor: ->

  getLevel: (id)->
    for level in @ when level.id == id
      return level

    console.error "Level #{id} was not found!"

  push: (level)->
    super level

# Class to instantiate new levels
class Level
  constructor: (options={})->
    {@id, @name, @fn, @nextLevelId, @tip} = options

  # A shortcut function to generate a galaxy in a level
  createGalaxyIntoUniverse: (universe, options={})->
    # First create a star
    star = new Star options.star
    # Assign the star to a new galaxy
    galaxy = new Galaxy
      star: star
    # Generate corpses for the galaxy
    galaxy.generateCorpses
      quantity: options.corpses.quantity
      radius: options.radius

    # Start the animation for these points
    orbitalAnimation = new OrbitalAnimation
      centerPoint: galaxy.star
      points: galaxy.corpses
    orbitalAnimation.startAnimation()

    universe.galaxies.push galaxy

    galaxy

  call: (scene, options={})->
    {@onLevelEnding} = options
    @scene = scene
    @fn scene, @

  # A basic method you should call when the level ends
  end: (levelResult)->
    if levelResult
      @scene.setLevel levels.getLevel(@nextLevelId) if @scene and @nextLevelId
    else
      @scene.setLevel @
    @onLevelEnding(levelResult) # Invoke the callback because the level has ended

# Global object for levels
levels = new Levels()
