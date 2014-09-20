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

  # Start drawing
  drawSceneIntoCanvas = (scene, canvas, ctx)->
    drawSceneIntoCanvasFn scene, canvas, ctx
    requestAnimFrame -> drawSceneIntoCanvas(scene, canvas, ctx)

  drawSceneIntoCanvasFn = (scene, canvas, ctx)->
    ctx.clearRect(0,0,canvas.width,canvas.height);

    # Vectorize the entire scene
    objects = scene.toPointArray()

    # Add every object (canvas ready object) to the scene
    for object in objects
      ctx.beginPath();
      object.drawIntoCanvas(ctx)
      ctx.fill();


  # Ask for canvas and scene ({canvas: <canvas>, scene: Scene object})
  constructor: (options={})->
    {@canvas, @scene} = options

    @ctx = @canvas.getContext "2d"

  # Start rendering on the canvas
  startEngine: ->
    drawSceneIntoCanvas(@scene, @canvas, @ctx)
