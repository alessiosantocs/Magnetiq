class Corps extends Point
  @initWithParentPoint = (options)->
    corps = new Corps(options)

    corps.distanceFromParentPoint = options.distance

    corps.x = corps.parentPoint.x + corps.distanceFromParentPoint
    corps.y = corps.parentPoint.y + corps.distanceFromParentPoint

    corps.orbit = new Orbit
      centerPoint: corps.parentPoint
      distance: corps.distanceFromParentPoint
      point: corps

    corps
  constructor: (options={})->
    super options

    {@radius, @parentPoint} = options

    @radius ||= 5

  drawIntoCanvas: (ctx)->
    @moveInOrbit()
    super ctx

  moveInOrbit: ()->
    if @orbit
      point = @orbit.corpsPositionFromTimestamp Date.now()
      @set "x", point.x
      @set "y", point.y
