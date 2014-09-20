class Star extends Corps
  constructor: (options={})->
    super options

    @radius = 10

    {@marginRadius} = options

  # Override this method to give custom appearance
  drawIntoCanvas: (ctx)->
    ctx.fillStyle = "#00f"
    ctx.arc(@x, @y, @radius || 5, 0, Math.PI * 2, false)
