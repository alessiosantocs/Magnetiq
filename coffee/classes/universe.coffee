class Universe extends Point
  constructor: (options={})->
    super options

    {@galaxies} = options
    @galaxies ||= []

  addGalaxy: (galaxy)->
    @galaxies.push galaxy

  toPointArray: ->
    array = [@]

    array = array.concat(galaxy.toPointArray()) for galaxy in @galaxies

    array
