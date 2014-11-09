window.onload = ->

  originalOrientation = window.orientation
  checkOrientation = ->
    if window.orientation?
      if window.orientation is 0
        if originalOrientation isnt 0
          document.getElementById("wrong-device-orientation").innerHTML = "Return to landscape orientation to continue to play. <br>You can <a href='javascript: window.location.reload()'>reload</a> if you want to."
        document.getElementById("wrong-device-orientation").style.display = "block"
      else if originalOrientation isnt 0
        document.getElementById("wrong-device-orientation").style.display = "none"

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
