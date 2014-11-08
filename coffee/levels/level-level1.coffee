# File of level 1
# Push a new level into the array of levels
levels.push new Level
  id: "level1"
  nextLevelId: "level3"
  name: "collect stars energy"
  tip: "make travel possible"

  fn: (scene, level)->

    universe = new Universe()

    # Function defined in levels.coffee
    galaxy = level.createGalaxyIntoUniverse universe,
      star:
        x: scene.width + 200
        y: scene.height / 2
        marginRadius: 20
      corpses:
        quantity: 35
      radius: 25

    galaxy.star.moveToAnimated
      toPoints: [new Point({x: scene.width - 100, y: scene.height / 2})]

    # Bind the user's method of interaction and track it
    interaction = new Interaction
      canvas: document.getElementById("magnetiq")
      defaultPoint: new Point
        x: -50
        y: scene.height / 2

    interaction.pointers[0].moveToAnimated
      toPoints: [new Point({x: 100, y: scene.height / 2})]
      # onTouchInteraction: (x, y, deltaX, deltaY)->
      #   for point in scene.toPointArray({only: Pointer})
      #     point.x += deltaX
      #     point.y += deltaY
      # onDeviceMotion: (a, b, g, event)->
      #   if interaction.pointers[0].x + universe.x > (scene.width) * 0.8 and b > 0
      #     universe.x -= b
      #     # interaction.pointers[0].x -= b
      #   if interaction.pointers[0].x + universe.x < (scene.width) * 0.2 and b < 0
      #     universe.x -= b
      #     # interaction.pointers[0].x -= b
      #   if interaction.pointers[0].y > (scene.height - universe.y) * 0.8 and a > 0
      #     universe.y -= a
      #   if interaction.pointers[0].y + universe.y < (scene.height) * 0.2 and a < 0
      #     universe.y -= a
      #
      #   # console.log "#{scene.width} - #{universe.x} - #{interaction.pointers[0].x}"
      #   interaction.pointers[0].x += b * 5
      #   interaction.pointers[0].y += a * 5
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
