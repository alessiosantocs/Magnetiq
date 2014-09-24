# A helpful collision object
class Collision
  constructor: (options)->
    {@basePoint, @controlPoint} = options

class CollisionsHandler
  # Nothing special here
  constructor: ->

  detectCollisionsAmongst: (pointsGroup1, pointsGroup2)->
    collisionsArray = []

    # We can have multiple control points
    for controlPoint in pointsGroup2

      for point in pointsGroup1 when point isnt controlPoint
        dx = controlPoint.x - point.x
        dy = controlPoint.y - point.y
        # Teorema di Pitagora to calculate distance
        distanceFromObject = Math.sqrt( Math.pow( dx, 2) + Math.pow(dy , 2) )
        collisionCoefficentRadius = (point.radius || 3) + (controlPoint.radius || 3)

        if distanceFromObject <= collisionCoefficentRadius
          collisionsArray.push new Collision
            basePoint: point
            controlPoint: controlPoint

    collisionsArray


  onCollisionAmongst: (pointsGroup1, pointsGroup2, handler)->
    instance = @
    interval = setInterval ->
      collisions = instance.detectCollisionsAmongst pointsGroup1, pointsGroup2

      if collisions.length > 0
        # Pass to the handler the collision array
        handler(collisions)
    , 10

    interval
