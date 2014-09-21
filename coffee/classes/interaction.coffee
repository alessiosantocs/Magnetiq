class Interaction
  constructor: (options={})->
    {@canvas} = options

    @pointers = [new Pointer
      defaultPoint: new Point
        x: window.innerWidth
        y: window.innerHeight
    ]

    interaction = @

    @canvas.addEventListener "mousemove", (event)->
      event.preventDefault()

      interaction.pointers[0].recordMovement event.pageX, event.pageY

  toPointArray: ->
    @pointers
