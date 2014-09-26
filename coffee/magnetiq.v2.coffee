window.onload = ->

  # Initialize a scene
  scene = new Scene()
  scene.setLevel levels.getLevel("level1"), (success)->
    if success
      scene.setLevel levels.getLevel("level2")
    else
      scene.setLevel levels.getLevel("level1")

  window.scene = scene

  # Starting the graphic engine
  engine = new MagnetiqEngine({canvas: document.getElementById("magnetiq"), scene: scene})
  engine.startEngine()
