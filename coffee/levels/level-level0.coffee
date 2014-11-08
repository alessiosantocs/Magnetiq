# File of level 1
# Push a new level into the array of levels
levels.push new Level
  id: "level0"
  nextLevelId: "level1"
  name: "One day in the universe"
  tip: ""
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

    stopAnimation = false
    generateAnimation = ->
      unless stopAnimation
        randomY = Math.floor(Math.random()*150 + 100)
        randomX = Math.floor(Math.random()*randomY * 2 + 100)

        console.log "Move from (#{interaction.pointers[0].x}, #{interaction.pointers[0].y}) to (#{randomX}, #{randomY})"

        # Temporary fix to crashes
        # if Math.abs(interaction.pointers[0].x - randomX) < 50
        #   console.log "Too short"
        #   randomX += 100
        # if Math.abs(interaction.pointers[0].x - randomX) < 50
        #   console.log "Too short"
        #   randomX += 50

        interaction.pointers[0].moveToAnimated
          toPoints: [new Point({x: randomX, y: randomY})]
          onAnimationEnd: ->
            generateAnimation()
      else
        interaction.pointers[0].moveToAnimated
          toPoints: [new Point({x: scene.width + 100, y: scene.height / 2})]
          onAnimationEnd: ->
            level.end(true)
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

    setTimeout ->
      scene.interface.displayMessage "A curious point",
        autoDismissAfter: 1500
        onMessageHidden: ->
          scene.interface.displayMessage "started to wonder.",
            autoDismissAfter: 3000
            onMessageHidden: ->
              scene.interface.displayMessage "Other universes",
                secondaryMessage: "What would they look like?"
                autoDismissAfter: 4000
                onMessageHidden: ->
                  setTimeout ->
                    stopAnimation = true
                    scene.interface.displayMessage "I'd love to see them!",
                      secondaryMessage: "I want to see every single one"
                      autoDismissAfter: 4000
                      onMessageHidden: ->
                        stopAnimation = true
                        # console.log "start new"
                  , 1000
    , 5000
    # setTimeout ->
    #   scene.interface.displayMessage "started to wonder"
    # , 8000

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
