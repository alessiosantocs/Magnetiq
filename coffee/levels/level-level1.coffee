# File of level 1
# Push a new level into the array of levels
levels.push new Level
  id: "level1"
  nextLevelId: "level2"
  name: "one"
  tip: "eat"
  fn: (scene, level)->

    universe = new Universe()

    # Function defined in levels.coffee
    level.createGalaxyIntoUniverse universe,
      star:
        x: 200
        y: 150
        marginRadius: 20
      corpses:
        quantity: 35
      radius: 25

    # Bind the user's method of interaction and track it
    interaction = new Interaction
      canvas: document.getElementById("magnetiq")
      defaultPoint: new Point
        x: 500
        y: 150
      onTouchInteraction: (x, y, deltaX, deltaY)->
        universe.x += deltaX / 2
        universe.y += deltaY / 2
      onDeviceMotion: (a, b, g, event)->
        array = scene.toPointArray({only: Pointer})
        for star in array
          star.x += b * 3
          star.y += a * 3

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
          level.tip = "dots hurt"
          level.end(false)
