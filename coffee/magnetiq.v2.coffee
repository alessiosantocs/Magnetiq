window.onload = ->
  corps = new Corps({x: 10, y: 10})
  star = new Star({marginRadius: 50})
  galaxy = new Galaxy({star: star, corpses: [corps]})
  universe = new Universe({galaxies: [galaxy]})


  window.interaction = new Interaction
    canvas: document.getElementById("magnetiq")


  scene = new Scene({universes: [universe], interaction: interaction})

  window.galaxy = galaxy

  engine = new MagnetiqEngine({canvas: document.getElementById("magnetiq"), scene: scene})
  window.engine = engine
  engine.startEngine()

  galaxy.generateCorpses
    quantity: 190
    radius: 200

  collisionsHandler = new CollisionsHandler()
  collisionsHandler.onCollisionAmongst galaxy.corpses, [interaction.pointers[0].track.head()], (collisions)->
    console.log "The pointer has collided", collisions
    for collision in collisions
      collision.basePoint.fillColor = "#f00"

  collisionsHandler.onCollisionAmongst galaxy.corpses, galaxy.corpses, (collisions)->
    console.log "There has been a collision between corpses", collisions
    for collision in collisions
      collision.basePoint.fillColor = "#00f"
