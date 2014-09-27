# Please find a way to stop or cancel an animation!!!
class Animation
  # Override to insert stuff inside
  constructor: ->

  # Override this to do stuff
  renderAnimation: ->

  resetTimer: ->
    @internalTimer = 0

  # Default binding method. Usually don't need to override
  startAnimation: ->
    @internalTimer = 0
    @renderAnimation()
    instance = @
    setInterval ->
      instance.internalTimer += 1
      instance.renderAnimation()
    , 10
