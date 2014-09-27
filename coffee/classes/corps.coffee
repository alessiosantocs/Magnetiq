class Corps extends Point
  @initWithParentPoint = (options)->
    options.distanceFromParentPoint = options.distance

    corps = new Corps(options)

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

    {@radius, @parentPoint, @gravitationalForce, @distanceFromParentPoint} = options

    @gravitationalForce ||= 5

    @radius ||= 3

    if @radius instanceof Function
      @radius = @radius(@)

  drawIntoCanvas: (ctx)->
    super ctx


window.Corps = Corps
