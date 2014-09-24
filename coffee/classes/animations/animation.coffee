# Please find a way to stop or cancel an animation!!!
class Animation
  # Override to insert stuff inside
  constructor: ->

  # Override this to do stuff
  renderAnimation: ->

  # Default binding method. Usually don't need to override
  startAnimation: ->
    @renderAnimation()
    instance = @
    setInterval ->
      instance.renderAnimation()
    , 10
