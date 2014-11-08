window.onload = ->

  checkOrientation = ->
    if window.orientation? and window.orientation is 0
      document.getElementById("wrong-device-orientation").style.display = "block"
  checkOrientation()
  window.addEventListener "orientationchange", ->
    checkOrientation()

  document.ontouchmove = (e)-> e.preventDefault() if document.ontouchmove

  # Initialize a scene
  scene = new Scene()

  window.scene = scene

  # Starting the graphic engine
  engine = new MagnetiqEngine({canvas: document.getElementById("magnetiq"), scene: scene})
  engine.startEngine()

  scene.setLevel levels.getLevel("level0")
