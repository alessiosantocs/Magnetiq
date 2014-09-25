# File of level 2
# Push a new level into the array of levels
levels.push new Level
  name: "level2"
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
      quantity: 40
      radius: 10
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
