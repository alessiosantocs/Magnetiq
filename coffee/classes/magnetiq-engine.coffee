class MagnetiqEngine

  requestAnimFrame = (->
    window.requestAnimationFrame        or
    window.webkitRequestAnimationFrame  or
    window.mozRequestAnimationFrame     or
    window.oRequestAnimationFrame       or
    window.msRequestAnimationFrame      or
    (callback)->
      window.setTimeout(callback, 1000)
  )();

  # Make use of the requestAnimFrame to start drawing the canvas
  drawSceneIntoCanvas = (scene, canvas, ctx, final_ctx)->
    drawSceneIntoCanvasFn scene, canvas, ctx, final_ctx
    requestAnimFrame -> drawSceneIntoCanvas(scene, canvas, ctx, final_ctx)

  drawSceneIntoCanvasFn = (scene, canvas, ctx, final_ctx)->
    ctx.clearRect(0,0,canvas.width,canvas.height);

    # Vectorize the entire scene
    objects = scene.toPointArray()

    # Add every object (canvas ready object) to the scene
    for object in objects
      ctx.beginPath()

      object.drawIntoCanvas(ctx)

    # Draw into final canvas
    if final_ctx
      drawIntoFinalCanvas canvas, final_ctx

  drawIntoFinalCanvas = (canvas, final_ctx)->
    final_ctx.clearRect(0,0,canvas.width,canvas.height)
    final_ctx.drawImage(canvas, 0, 0)


  # Ask for canvas and scene ({canvas: <canvas>, scene: Scene object})
  constructor: (options={})->
    {@canvas, @scene} = options

    @ctx = @canvas.getContext "2d"


  # Start rendering on the canvas
  startEngine: ->
    @pre_canvas = document.createElement "canvas"
    @pre_ctx = @pre_canvas.getContext "2d"

    @canvas.width = @pre_canvas.width = window.innerWidth
    @canvas.height = @pre_canvas.height = window.innerHeight

    drawSceneIntoCanvas(@scene, @pre_canvas, @pre_ctx, @ctx)
