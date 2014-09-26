class Orbit extends Corps
  constructor: (options={})->
    super options

    {@borderColor} = options

    # This should mean transparend
    @fillColor = null
    @borderColor ||= "#aeff00"

  drawIntoCanvas: (ctx)->
    ctx.beginPath()
    ctx.strokeStyle = @borderColor
    ctx.arc(@x, @y, (@radius || 5), 0, Math.PI * 2, false)
    ctx.stroke()
