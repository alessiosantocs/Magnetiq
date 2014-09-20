window.onload = ->
  corps = new Corps({x: 10, y: 10})
  star = new Star()
  galaxy = new Galaxy({star: star, corpses: [corps]})
  universe = new Universe({galaxies: [galaxy]})
  scene = new Scene({universes: [universe]})

  window.corps = corps

  engine = new MagnetiqEngine({canvas: document.getElementById("magnetiq"), scene: scene})
  window.engine = engine
  engine.startEngine()
