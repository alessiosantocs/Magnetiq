class Interaction
  constructor: (options={})->
    {@canvas} = options

    @pointers = [new Pointer()]

    interaction = @

    @canvas.addEventListener "mousemove", (event)->
      event.preventDefault()

      interaction.pointers[0].recordMovement event.pageX, event.pageY

  toPointArray: ->
    @pointers
