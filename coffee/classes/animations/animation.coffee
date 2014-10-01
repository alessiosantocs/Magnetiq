# Please find a way to stop or cancel an animation!!!
class Animation
  # Override to insert stuff inside
  constructor: (options={})->
    {@onAnimationEnd} = options

    @onAnimationEnd ||= -> console.log "Animation ended"

  # Override this to do stuff
  renderAnimation: ->

  resetTimer: ->
    @internalTimer = 0

  stopAnimation: ()->
    @resetTimer()
    clearInterval @intervalInstance

    @onAnimationEnd()

  # Default binding method. Usually don't need to override
  startAnimation: ->
    console.log "Animation started"
    @internalTimer = 0
    @renderAnimation()
    instance = @
    @intervalInstance = setInterval ->
      instance.internalTimer += 1
      instance.renderAnimation()
    , 10
