class Galaxy extends Point
  constructor: (options={})->
    super options

    {@corpses, @star} = options

    @corpses = [] unless @corpses
    @star = null unless @star

  toPointArray: ->
    array = [@]

    array.push corps for corps in @corpses
    array.push @star

    array
