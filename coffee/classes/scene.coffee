class Scene
  constructor: (options={})->
    {@universes, @interaction} = options

  toPointArray: ->
    array = []

    array = array.concat(@interaction.toPointArray()) if @interaction
    array = array.concat(universe.toPointArray()) for universe in @universes

    array
