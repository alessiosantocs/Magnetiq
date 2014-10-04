window.onload = ->

  # Initialize a scene
  scene = new Scene()

  window.scene = scene

  # Starting the graphic engine
  engine = new MagnetiqEngine({canvas: document.getElementById("magnetiq"), scene: scene})
  engine.startEngine()

  scene.setLevel levels.getLevel("level2")
