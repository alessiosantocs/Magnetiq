class Interaction
  constructor: (options={})->
    {@canvas, @onDeviceMotion, @onTouchInteraction, @ignoreUserInteraction} = options
    @onDeviceMotion ||= (alpha, beta, gamma, event)->
    @onTouchInteraction ||= (x, y, deltaX, deltaY)->

    @ignoreUserInteraction ||= false

    # Where should the pointers positioned at the beginning?
    options.defaultPoint ||= new Point
      x: window.innerWidth
      y: window.innerHeight

    # For now we'll declare only one pointer
    @pointers = [new Pointer
      defaultPoint: options.defaultPoint
    ]

    interaction = @

    # Listen for mouse movements
    @canvas.addEventListener "mousemove", (event)->
      event.preventDefault()

      interaction.pointers[0].recordMovement event.pageX, event.pageY unless interaction.ignoreUserInteraction

    currentTouchEvent = null
    # Listen for touch events
    @canvas.addEventListener "touchmove", (event)->
      event.preventDefault()
      unless interaction.ignoreUserInteraction
        firstCurrentTouch = currentTouchEvent.touches[0]
        touch = event.touches[0]

        deltaX = touch.pageX - firstCurrentTouch.pageX
        deltaY = touch.pageY - firstCurrentTouch.pageY

        pageX = touch.pageX
        pageY = touch.pageY

        interaction.onTouchInteraction(pageX, pageY, deltaX, deltaY)
        interaction.pointers[0].recordMovement pageX, pageY, deltaX, deltaY

        currentTouchEvent = event

    # Disallow default actions
    @canvas.addEventListener "touchstart", (event)->
      event.preventDefault()
      currentTouchEvent = event
      console.log currentTouchEvent

    @canvas.addEventListener "touchend", (event)->
      event.preventDefault()

    # Tracking accelerator
    initialMotionEvent = null

    window.ondevicemotion = (event)->
      # Save the initial motion of the device in order to use it as a base
      unless initialMotionEvent
        # Make a safe copy of the object
        initialMotionEvent =
          accelerationIncludingGravity:
            x: event.accelerationIncludingGravity.x
            y: event.accelerationIncludingGravity.y
            z: event.accelerationIncludingGravity.z

        # If values are too high it means you're still trying to move the pointer
        if Math.abs(initialMotionEvent.accelerationIncludingGravity.x) > 0.8
          initialMotionEvent.accelerationIncludingGravity.x = 0
        if Math.abs(initialMotionEvent.accelerationIncludingGravity.y) > 0.8
          initialMotionEvent.accelerationIncludingGravity.y = 0
        # Therefore set x and y to 0 as default

      accelerationX = event.accelerationIncludingGravity.x - initialMotionEvent.accelerationIncludingGravity.x
      accelerationY = event.accelerationIncludingGravity.y - initialMotionEvent.accelerationIncludingGravity.y
      accelerationZ = event.accelerationIncludingGravity.z - initialMotionEvent.accelerationIncludingGravity.z

      # A simple threshold
      accelerationY = 0 if Math.abs(accelerationY) < 0.3
      accelerationX = 0 if Math.abs(accelerationX) < 0.3

      interaction.onDeviceMotion(accelerationX, accelerationY, accelerationZ, event)
      true

  toPointArray: ->
    @pointers
