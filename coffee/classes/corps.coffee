class Corps extends Point
  @initWithParentPoint = (options)->
    corps = new Corps(options)

    corps.distanceFromParentPoint = options.distance

    corps.x = corps.parentPoint.x + corps.distanceFromParentPoint
    corps.y = corps.parentPoint.y + corps.distanceFromParentPoint

    # corps.orbit = new Orbit
    #   centerPoint: corps.parentPoint
    #   distance: corps.distanceFromParentPoint
    #   point: corps

    corps
  # Default stuff is x,y,radius. In addiction parentPoint, gravitationalForce
  constructor: (options={})->
    super options

    {@radius, @parentPoint, @gravitationalForce} = options

    @gravitationalForce ||= 5

    @radius ||= 5

  drawIntoCanvas: (ctx)->
    super ctx
