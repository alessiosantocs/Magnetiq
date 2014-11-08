# File of level 1
# Push a new level into the array of levels
levels.push new Level
  id: "endgame"
  nextLevelId: "endgame"
  name: "Game over"
  tip: "you did well"
  fn: (scene, level)->

    universe = new Universe()

    # Function defined in levels.coffee
    galaxy = level.createGalaxyIntoUniverse universe,
      star:
        x: scene.width + 100
        y: scene.height / 2
        marginRadius: 20
      corpses:
        quantity: 3
      radius: 5

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

    setTimeout ->
      scene.interface.displayMessage "Magnetiq",
        autoDismissAfter: 4000
        onMessageHidden: ->
          scene.interface.displayMessage "Made with love by",
            autoDismissAfter: 3000
            onMessageHidden: ->
              scene.interface.displayMessage "Alessio and Salvatore",
                secondaryMessage: "thank you for playing <3"
                autoDismissAfter: 4000
            #     onMessageHidden: ->
            #       setTimeout ->
            #         scene.interface.displayMessage "I'd love to see them!",
            #           secondaryMessage: "I want to see every single one"
            #           autoDismissAfter: 4000
            #           onMessageHidden: ->
            #             stopAnimation = true
            #             console.log "start new"
            #       , 1000
    , 7000

    # Set some values in the scene
    scene.universes = [universe]
    scene.interaction = interaction
    # scene.animations.push orbitalAnimation
