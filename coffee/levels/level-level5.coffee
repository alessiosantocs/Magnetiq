# File of level 5
# Push a new level into the array of levels
levels.push new Level
  id: "level5"
  nextLevelId: "level5"
  name: "five"
  tip: "boss"
  fn: (scene, level)->

    universe = new Universe()

    # Function defined in levels.coffee
    level.createGalaxyIntoUniverse universe,
      star:
        x: -250
        y: -250
        marginRadius: 20
        gravitationalForce: 7
      corpses:
        quantity: 90
      radius: 70

    level.createGalaxyIntoUniverse universe,
      star:
        x: scene.width + 250
        y: scene.height + 250
        marginRadius: 20
        gravitationalForce: 8
      corpses:
        quantity: 100
      radius: 80


    # Bind the user's method of interaction and track it
    interaction = new Interaction
      canvas: document.getElementById("magnetiq")
      defaultPoint: new Point
        x: scene.width / 2
        y: scene.height / 2
      onDeviceMotion: (a, b, g, event)->
        array = scene.toPointArray({only: Pointer})
        for star in array
          star.x += b * 3
          star.y += a * 3

      onTouchInteraction: (x, y, deltaX, deltaY)->
        universe.x += deltaX / 2
        universe.y += deltaY / 2


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
          collision.basePoint.collect()

          if scene.toPointArray({only: Star}).reduce((previous, current)-> previous.isCollected() and current.isCollected())
            clearInterval ccc
            level.end(true)

        else if collision.basePoint instanceof Corps
          clearInterval ccc
          level.tip = "!#/:O"
          level.end(false)
