# File of level 1
level = new Level
  name: "level1"
  fn: (scene)->
    # Set a galaxy with one star
    star = new Star
      marginRadius: 20
      x: 300
      y: 400

    # star.gravitationalForce = 200
    galaxy = new Galaxy({star: star, corpses: []})
    star.gravitationalForce = 5
    # Set galaxies
    galaxy.generateCorpses
      quantity: 80
      radius: 30
    # Wrap galaxies in a universe
    universe = new Universe({galaxies: [galaxy]})

    # Bind the user's method of interaction and track it
    interaction = new Interaction
      canvas: document.getElementById("magnetiq")

    # Setting animations
    orbitalAnimation = new OrbitalAnimation
      centerPoint: galaxy.star
      points: galaxy.corpses
    orbitalAnimation.startAnimation()

    # Set some values in the scene
    scene.universes = [universe]
    scene.interaction = interaction
    # scene.animations.push orbitalAnimation

# Push a new level into the array of levels
levels.push level
