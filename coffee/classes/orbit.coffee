class Orbit

  distanceFromCenter = (center, distance)->
    center.marginRadius + distance
  constructor: (options)->
    {@centerPoint, @distance, @point} = options

  corpsPositionFromTimestamp: (timestamp)->

    newPointPosition = new Point()

    # The universal law
    force = @centerPoint.gravitationalForce * @centerPoint.radius * @point.radius / @distance
    velocity = force * 2

    positionInTime = timestamp * 0.0002 * velocity

    distance = distanceFromCenter(@centerPoint, @distance)

    newPointPosition.x = distance * Math.cos(positionInTime) + @centerPoint.x;
    newPointPosition.y = distance * Math.sin(positionInTime) + @centerPoint.y;

    newPointPosition
