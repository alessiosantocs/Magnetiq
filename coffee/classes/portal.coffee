class Portal extends Point

  # Default stuff is x,y,radius. In addiction parentPoint, gravitationalForce
  constructor: (options={})->
    super options

    {@radius} = options

    @radius ||= 10

    @fillColor = "#222"
    @strokeColor = "#888"
    @strokeWidth = 1

    @gravitationalForce ||= 5

    @radius ||= 3

    if @radius instanceof Function
      @radius = @radius(@)


window.Portal = Portal
