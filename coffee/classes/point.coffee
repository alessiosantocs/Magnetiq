class Point
  constructor: (options={})->
    {@x, @y} = options

    @x ||= 0
    @y ||= 0

  # Set everything in the object and then call the digest()
  set: (property, value)->
    @[property] = value

    @digest()

    @[property] # Returns the property just edited

  # Override this method to give custom appearance
  drawIntoCanvas: (ctx)->
    ctx.fillStyle = "#f00"
    ctx.arc(@x, @y, @radius || 5, 0, Math.PI * 2, false)

  # Override this method to give custom digest
  digest: ->
