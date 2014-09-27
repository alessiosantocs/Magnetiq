# File of level 4
# Push a new level into the array of levels
levels.push new Level
  id: "level4"
  nextLevelId: "level5"
  name: "four"
  tip: "tilt the universe"
  fn: (scene, level)->

    universe = new Universe()

    # Function defined in levels.coffee
    level.createGalaxyIntoUniverse universe,
      star:
        x: -50
        y: 150
        marginRadius: 20
        gravitationalForce: 10
      corpses:
        quantity: 40
      radius: 20


    # Bind the user's method of interaction and track it
    interaction = new Interaction
      canvas: document.getElementById("magnetiq")
      defaultPoint: new Point
        x: 500
        y: 150
      onDeviceMotion: (a, b, g, event)->
        array = scene.toPointArray({only: Star})
        for star in array
          star.x += b/3
          # star.y += a/3


    # Set some values in the scene
    scene.universes = [universe]
    scene.interaction = interaction
    # scene.animations.push orbitalAnimation

    # Setting what happens on collision
    collisionsHandler = new CollisionsHandler()
    ccc = collisionsHandler.onCollisionAmongst scene.toPointArray({skipInteraction: true}), [scene.interaction.pointers[0].track.head()], (collisions)->
      console.log collisions

      for collision in collisions
        # console.log collision
        if collision.basePoint instanceof Star
          clearInterval ccc
          level.end(true)
        else if collision.basePoint instanceof Corps
          clearInterval ccc
          level.tip = "!#/:O"
          level.end(false)
