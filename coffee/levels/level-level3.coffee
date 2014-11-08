# File of level 3
# Push a new level into the array of levels
levels.push new Level
  id: "level3"
  nextLevelId: "endgame"
  name: "exploring possibilities"
  tip: "collect two stars"
  fn: (scene, level)->

    universe = new Universe()

    # Function defined in levels.coffee
    galaxy1 = level.createGalaxyIntoUniverse universe,
      star:
        x: -200
        y: -200
        marginRadius: 40
        gravitationalForce: 6
      corpses:
        quantity: 60
      radius: 45

    # Create a second galaxy
    galaxy2 = level.createGalaxyIntoUniverse universe,
      star:
        x: scene.width + 200
        y: scene.height + 200
        marginRadius: 30
        gravitationalForce: 8
      corpses:
        quantity: 90
      radius: 70


    # Bind the user's method of interaction and track it
    interaction = new Interaction
      canvas: document.getElementById("magnetiq")
      defaultPoint: new Point
        x: -20
        y: scene.height + 20
      # onDeviceMotion: (a, b, g, event)->
      #   array = scene.toPointArray({only: Pointer})
      #   for star in array
      #     star.x += b * 3
      #     star.y += a * 3

    galaxy1.star.moveToAnimated
      toPoints: [new Point({x: 20, y: 20})]
    galaxy2.star.moveToAnimated
      toPoints: [new Point({x: scene.width - 40, y: scene.height - 40})]

    interaction.pointers[0].moveToAnimated
      toPoints: [new Point({x: 150, y: scene.height - 30})]

    # Set some values in the scene
    scene.universes = [universe]
    scene.interaction = interaction
    # scene.animations.push orbitalAnimation

    # Setting what happens on collision
    collisionsHandler = new CollisionsHandler()
    ccc = collisionsHandler.onCollisionAmongst scene.toPointArray({skipInteraction: true}), [scene.interaction.pointers[0].track.head()], (collisions)->

      for collision in collisions

        if collision.basePoint instanceof Star
          collision.basePoint.collect()

          if scene.toPointArray({only: Star}).reduce((previous, current)-> previous.isCollected() and current.isCollected())
            clearInterval ccc
            level.end(true)
        else if collision.basePoint instanceof Corps
          clearInterval ccc
          level.tip = "ouch"
          level.end(false)
