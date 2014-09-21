class Pointer extends Point
  trackLengthLimit = 50
  constructor: (options={})->
    super options

    {@pickupRadius} = options

    # Default pickup radius
    @pickupRadius ||= 300
    @fillColor = "#0f0"
    @radius = 5

    options.defaultPoint ||= new Point
      x: 0
      y: 0

    @x = options.defaultPoint.x
    @y = options.defaultPoint.y

    @track = new Track(50, options.defaultPoint)


  recordMovement: (x, y)->
    dx = x - @x
    dy = y - @y
    distance = Math.sqrt(dx*dx + dy*dy)

    if distance < @pickupRadius
      @x = x
      @y = y

  # I use it to smooth out the tail and the head of the pointer
  update: ->
    smooth_coefficent = 10

    track_head = @track.head()
    dX = Math.abs(@x - track_head.x)
    dY = Math.abs(@y - track_head.y)

    x = 0
    y = 0

    coeffX = dX / smooth_coefficent
    coeffY = dY / smooth_coefficent

    if @x > track_head.x
      x = coeffX
    else
      x = -coeffX

    if @y > track_head.y
      y = coeffY
    else
      y = -coeffY

    track_head.x += x
    track_head.y += y

    for point in @track when @track[_i + 1]
      next_point = @track[_i + 1]
      point.x = next_point.x
      point.y = next_point.y

  drawIntoCanvas: (ctx)->
    @update()

    pointer_color = @fillColor
    ctx.fillStyle = pointer_color
    ctx.strokeStyle = pointer_color
    ctx.lineWidth = pointer_color

    ctx.beginPath()
    for point in @track
      if _i == 0
        ctx.moveTo point.x, point.y
      else
        previous_point = @track[_i - 1]

        ctx.quadraticCurveTo(
          previous_point.x,
          previous_point.y,
          previous_point.x + (point.x - previous_point.x) / 2,
          previous_point.y + (point.y - previous_point.y) / 2
        )

    ctx.stroke()
    ctx.closePath()

    # Draw the ball
    if @track.head()
      ctx.beginPath()

      ctx.fillStyle = pointer_color
      ctx.arc(@track.head().x, @track.head().y, @radius || 5, 0, Math.PI * 2, false)
      ctx.fill()

    ctx.beginPath()
    ctx.arc(@track.head().x, @track.head().y, (@radius || 5) * 5, 0, Math.PI * 2, false)
    ctx.stroke()
