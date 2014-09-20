class Interaction
  constructor: (options={})->
    {@canvas} = options

    @pointers = [new Pointer()]

    interaction = @

    @canvas.addEventListener "mousemove", (event)->
      event.preventDefault()

      interaction.pointers[0].preDigest()
      interaction.pointers[0].x = event.pageX
      interaction.pointers[0].y = event.pageY

  toPointArray: ->
    @pointers
