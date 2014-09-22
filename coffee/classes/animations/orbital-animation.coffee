class OrbitalAnimation extends Animation

  # Helper method
  distanceFromCenter = (center, distance)->
    center.marginRadius + distance

  constructor: (options)->
    {@centerPoint, @distance, @points} = options

  # Calculate a point's x and y
  corpsPositionFromTimestamp: (timestamp, point)->

    newPointPosition = new Point()

    # The universal law
    force = @centerPoint.gravitationalForce * @centerPoint.radius * point.radius / point.distanceFromParentPoint
    velocity = force * 2

    positionInTime = timestamp * 0.0002 * velocity

    distance = distanceFromCenter(@centerPoint, point.distanceFromParentPoint)

    newPointPosition.x = distance * Math.cos(positionInTime) + @centerPoint.x;
    newPointPosition.y = distance * Math.sin(positionInTime) + @centerPoint.y;

    newPointPosition

  # Overriding the default method to render the animation
  renderAnimation: ->
    for point in @points
      newpoint = @corpsPositionFromTimestamp Date.now(), point

      point.x = newpoint.x
      point.y = newpoint.y
