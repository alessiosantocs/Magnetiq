class Star extends Corps
  constructor: (options={})->
    super options

    @radius = 10

    @collected = false

    {@marginRadius} = options

    @fillColor = "#57d0f3"

  collect: ->
    @strokeColor = "#57d0f3"
    @fillColor = "#222"
    @strokeWidth = 2
    @gravitationalForce = 2

    @collected = true

  isCollected: ->
    @collected

window.Star = Star
