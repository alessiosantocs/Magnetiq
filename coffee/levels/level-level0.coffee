# File of level 1
# Push a new level into the array of levels
levels.push new Level
  id: "level0"
  nextLevelId: "level1"
  name: "One day in the galaxy"
  tip: "P was floating free..."
  fn: (scene, level)->

    universe = new Universe()

    # Function defined in levels.coffee
    galaxy = level.createGalaxyIntoUniverse universe,
      star:
        x: -100
        y: -100
        marginRadius: 20
      corpses:
        quantity: 0
      radius: 5

    # Bind the user's method of interaction and track it
    interaction = new Interaction
      canvas: document.getElementById("magnetiq")
      defaultPoint: new Point
        x: 500
        y: 150
      ignoreUserInteraction: true

    generateAnimation = ->
      randomY = Math.floor(Math.random()*150 + 100)
      randomX = Math.floor(Math.random()*randomY * 2.5)
      anim = new MoveToAnimation
        point: interaction.pointers[0]
        toPoints: [new Point({x: randomX, y: randomY})]
        onAnimationEnd: ->
          generateAnimation()
      anim.startAnimation()

    # Animate the pointer to make it float around the screen
    # anim = new MoveToAnimation
    #   point: interaction.pointers[0]
    #   toPoints: [
    #     new Point({x: 300, y: 250})
    #     new Point({x: 400, y: 150})
    #     new Point({x: 500, y: 250})
    #     new Point({x: 600, y: 150})
    #   ]
    #   repeatAutomatically: true
    #
    # anim.startAnimation()

    generateAnimation()

    moveGalaxyStepForward = new MoveToAnimation
      point: galaxy.star
      toPoints: [new Point({x: 100, y: 100})]

    moveGalaxyTowardsPointer = new MoveToAnimation
      point: galaxy.star
      toPoints: [interaction.pointers[0]]

    setTimeout ->
      moveGalaxyStepForward.startAnimation()
      scene.interface.displayMessage "An evil star spotted P",
        autoDismissAfter: 2000
    , 5000

    setTimeout ->
      moveGalaxyTowardsPointer.resetAnimation()
      moveGalaxyTowardsPointer.startAnimation()
    , 9000

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
