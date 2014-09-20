class Pointer extends Point
  trackLengthLimit = 50
  constructor: (options={})->
    super options

    @track = new Track()

    # @startEating()
  preDigest: ->
    @track.push new Point
      x: @x
      y: @y
    
    if @track.length > trackLengthLimit
      @track.shift()

  slowTrackHeadDown: ->
    track_head = @track.head()
    dX = Math.abs(@x - track_head.x)
    dY = Math.abs(@y - track_head.y)

    x = 0
    y = 0

    coeffX = dX / 20
    coeffY = dY / 20

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
      previous_point = @track[_i + 1]
      point.x = previous_point.x
      point.y = previous_point.y

  drawIntoCanvas: (ctx)->

    # Draw the ball
    if @track.head()
      @slowTrackHeadDown()

      ctx.fillStyle = "#f00"
      ctx.arc(@track.head().x, @track.head().y, @radius || 5, 0, Math.PI * 2, false)
      ctx.fill()

    pointer_color = "#aeff00"
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
