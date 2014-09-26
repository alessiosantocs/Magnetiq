# File of level 1
# Push a new level into the array of levels
levels.push new Level
  name: "level1"
  fn: (scene, level)->
    # Set a galaxy with one star
    star = new Star
      marginRadius: 20
      x: 200
      y: 150

    # star.gravitationalForce = 200
    galaxy = new Galaxy({star: star, corpses: []})
    star.gravitationalForce = 5
    # Set galaxies
    galaxy.generateCorpses
      quantity: 10
      radius: 10
    # Wrap galaxies in a universe
    universe = new Universe({galaxies: [galaxy]})

    # Bind the user's method of interaction and track it
    interaction = new Interaction
      canvas: document.getElementById("magnetiq")
      defaultPoint: new Point
        x: 500
        y: 150

    # Setting animations
    orbitalAnimation = new OrbitalAnimation
      centerPoint: galaxy.star
      points: galaxy.corpses
    orbitalAnimation.startAnimation()

    # Set some values in the scene
    scene.universes = [universe]
    scene.interaction = interaction
    # scene.animations.push orbitalAnimation

    # Setting what happens on collision
    collisionsHandler = new CollisionsHandler()
    ccc = collisionsHandler.onCollisionAmongst scene.toPointArray({skipInteraction: true}), [scene.interaction.pointers[0].track.head()], (collisions)->
      for collision in collisions
        # console.log collision
        if collision.basePoint instanceof Star
          clearInterval ccc
          level.end(true)
        else if collision.basePoint instanceof Corps
          clearInterval ccc
          level.end(false)
