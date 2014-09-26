class Scene
  constructor: (options={})->
    {@universes, @interaction} = options

  toPointArray: (options={})->
    array = []

    options.skipInteraction ||= false
    unless options.skipInteraction
      array = array.concat(@interaction.toPointArray()) if @interaction
    array = array.concat(universe.toPointArray()) for universe in @universes

    array


  clearScene: ->
    @universes = []
    @interaction = null

  setLevel: (level, onLevelEnding=->)->
    console.log onLevelEnding
    @clearScene()
    level.call @, {onLevelEnding: onLevelEnding}
