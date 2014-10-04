class Universe extends Point
  constructor: (options={})->
    super options

    {@galaxies} = options
    @galaxies ||= []

    @fillColor = "#222"
    @strokeColor = "#555"
    @strokeWidth = 1

  addGalaxy: (galaxy)->
    @galaxies.push galaxy

  toPointArray: ->
    array = [@]

    array = array.concat(galaxy.toPointArray()) for galaxy in @galaxies

    array
