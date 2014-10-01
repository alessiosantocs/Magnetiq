window.onload = ->

  # Initialize a scene
  scene = new Scene()
  scene.setLevel levels.getLevel("level0")
  window.scene = scene

  # Starting the graphic engine
  engine = new MagnetiqEngine({canvas: document.getElementById("magnetiq"), scene: scene})
  engine.startEngine()
