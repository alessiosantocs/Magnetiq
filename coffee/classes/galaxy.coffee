class Galaxy extends Point
  constructor: (options={})->
    super options

    {@corpses, @star, @radius} = options

    @corpses = [] unless @corpses
    @star = new Star({marginRadius: 50}) unless @star

  generateCorpses: (options)->
    corpses = new Array(options.quantity)
    spaceOffset = (options.radius || options.quantity) / options.quantity * 5

    @corpses = []
    for corps in corpses
      @corpses.push new Corps.initWithParentPoint
        parentPoint: @star
        distance: _i * spaceOffset + (@star.marginRadius || 0)

    @corpses

  toPointArray: ->
    array = []

    array.push corps for corps in @corpses
    array.push @star

    array
