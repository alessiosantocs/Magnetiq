window.onload = ->
  corps = new Corps({x: 10, y: 10})
  star = new Star({marginRadius: 50})
  galaxy = new Galaxy({star: star, corpses: [corps]})


  star2 = new Star({marginRadius: 50, x: 800, y: 500})
  star2.gravitationalForce = 2
  galaxy2 = new Galaxy({star: star2, corpses: []})


  universe = new Universe({galaxies: [galaxy, galaxy2]})


  interaction = new Interaction
    canvas: document.getElementById("magnetiq")


  scene = new Scene({universes: [universe], interaction: interaction})

  window.galaxy = galaxy

  engine = new MagnetiqEngine({canvas: document.getElementById("magnetiq"), scene: scene})
  window.engine = engine
  engine.startEngine()

  galaxy.generateCorpses
    quantity: 190
    radius: 200

  galaxy2.generateCorpses
    quantity: 30
    radius: 50

  collisionsHandler = new CollisionsHandler()
  collisionsHandler.onCollisionAmongst galaxy.corpses, [interaction.pointers[0].track.head()], (collisions)->
    console.log "The pointer has collided", collisions
    for collision in collisions
      collision.basePoint.fillColor = "#f00"

  collisionsHandler.onCollisionAmongst galaxy.corpses, galaxy2.corpses, (collisions)->
    console.log "There has been a collision between corpses", collisions
    # for collision in collisions
    #   collision.basePoint.fillColor = "#00f"
