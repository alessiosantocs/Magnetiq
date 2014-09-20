class Pointer extends Point
  trackLengthLimit = 50
  constructor: (options={})->
    super options

    @track = new Track()

    @startEating()
  preDigest: ->
    @track.push new Point
      x: @x
      y: @y

    if @track.length > trackLengthLimit
      @track.shift()

  startEating: ->
    instance = @
    setInterval ->
      if instance.track.length > 1
        instance.track.shift()
    , 100

  drawIntoCanvas: (ctx)->
    super ctx

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

class Track extends Array
  constructor: (options)->
    super options

class Interaction
  constructor: (options={})->
    {@canvas} = options

    @pointers = [new Pointer()]

    interaction = @

    @canvas.addEventListener "mousemove", (event)->
      event.preventDefault()

      interaction.pointers[0].preDigest()
      interaction.pointers[0].x = event.pageX
      interaction.pointers[0].y = event.pageY



  toPointArray: ->
    @pointers
