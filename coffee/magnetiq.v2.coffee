window.onload = ->

  # Set a galaxy with one star
  star = new Star({marginRadius: 50})
  galaxy = new Galaxy({star: star, corpses: []})

  # Set a galaxy with a star
  star2 = new Star({marginRadius: 50, x: 800, y: 500})
  star2.gravitationalForce = 2
  galaxy2 = new Galaxy({star: star2, corpses: []})

  # Wrap galaxies in a universe
  universe = new Universe({galaxies: [galaxy, galaxy2]})

  # Bind the user's method of interaction and track it
  interaction = new Interaction
    canvas: document.getElementById("magnetiq")


  # Initialize a scene
  scene = new Scene({universes: [universe], interaction: interaction})

  # Set galaxies
  galaxy.generateCorpses
    quantity: 190
    radius: 200

  galaxy2.generateCorpses
    quantity: 30
    radius: 50
    corpsesRadius: -> Math.floor(Math.random() * 5 + 1)

  # Setting animations
  orbitalAnimation = new OrbitalAnimation
    centerPoint: galaxy.star
    points: galaxy.corpses
  orbitalAnimation.startAnimation()

  orbitalAnimation2 = new OrbitalAnimation
    centerPoint: galaxy2.star
    points: galaxy2.corpses
  orbitalAnimation2.startAnimation()

  # Starting the graphic engine
  engine = new MagnetiqEngine({canvas: document.getElementById("magnetiq"), scene: scene})
  engine.startEngine()

  # Setting what happens on collision
  collisionsHandler = new CollisionsHandler()
  collisionsHandler.onCollisionAmongst galaxy.corpses, [interaction.pointers[0].track.head()], (collisions)->
    console.log "The pointer has collided", collisions
    
