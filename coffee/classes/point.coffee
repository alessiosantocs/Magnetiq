class Point
  constructor: (options={})->
    {@x, @y} = options

    @x ||= 0
    @y ||= 0

    @fillColor = "#f00"
    @strokeColor = "#222"
    @strokeWidth = 0

  # Set everything in the object and then call the digest()
  set: (property, value)->
    @preDigest()
    if value instanceof Function
      value = value @
    @[property] = value
    @postDigest()

    @[property] # Returns the property just edited

  # Override this method to give custom appearance
  drawIntoCanvas: (ctx)->
    ctx.beginPath()
    ctx.fillStyle = @fillColor
    ctx.strokeStyle = @strokeColor
    ctx.lineWidth = @strokeWidth
    ctx.arc(@x, @y, @radius || 5, 0, Math.PI * 2, false)
    ctx.fill()
    ctx.stroke() if @strokeWidth > 0

  # Override this method to give custom digest
  preDigest: ->
  postDigest: ->

  isPositionedAt: (point)->
    point.x is @x and point.y is @y

  # Default method to move a point creating a MoveToAnimation and running it
  moveToAnimated: (options={})->
    options.point = @
    anim = new MoveToAnimation options
    anim.startAnimation()
    anim

window.Point = Point
