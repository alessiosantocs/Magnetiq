window.onload = ->

  # Initialize a scene
  scene = new Scene()
  scene.setLevel levels.getLevel("level1")

  window.scene = scene

  # Setting what happens on collision
  collisionsHandler = new CollisionsHandler()
  ccc = collisionsHandler.onCollisionAmongst scene.toPointArray({skipInteraction: true}), [scene.interaction.pointers[0].track.head()], (collisions)->
    scene.setLevel levels.getLevel("level1")
    clearInterval(ccc)


  # Starting the graphic engine
  engine = new MagnetiqEngine({canvas: document.getElementById("magnetiq"), scene: scene})
  engine.startEngine()
