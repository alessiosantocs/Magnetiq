class Scene
  constructor: (options={})->
    {@universes} = options

  toPointArray: ->
    array = []

    array = array.concat(universe.toPointArray()) for universe in @universes

    array
