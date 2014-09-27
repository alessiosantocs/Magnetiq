class Interaction
  constructor: (options={})->
    {@canvas, @onDeviceMotion} = options
    @onDeviceMotion ||= (alpha, beta, gamma, event)->

    options.defaultPoint ||= new Point
      x: window.innerWidth
      y: window.innerHeight

    @pointers = [new Pointer
      defaultPoint: options.defaultPoint
    ]

    interaction = @

    # Listen for mouse movements
    @canvas.addEventListener "mousemove", (event)->
      event.preventDefault()

      interaction.pointers[0].recordMovement event.pageX, event.pageY

    # Listen for touch events
    @canvas.addEventListener "touchmove", (event)->
      event.preventDefault()
      touch = event.touches[0]
      interaction.pointers[0].recordMovement touch.pageX - 40, touch.pageY - 40

    @canvas.addEventListener "touchstart", (event)->
      event.preventDefault()
    @canvas.addEventListener "touchend", (event)->
      event.preventDefault()

    # Tracking accelerator
    window.ondevicemotion = (event)->
      accelerationX = event.accelerationIncludingGravity.x
      accelerationY = event.accelerationIncludingGravity.y
      accelerationZ = event.accelerationIncludingGravity.z

      accelerationY = 0 if Math.abs(accelerationY) < 0.3
      accelerationX = 0 if Math.abs(accelerationX) < 0.3
      interaction.onDeviceMotion(accelerationX, accelerationY, accelerationZ, event)
      true

  toPointArray: ->
    @pointers
