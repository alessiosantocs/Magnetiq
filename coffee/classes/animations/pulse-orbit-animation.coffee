# This animation should be useful when asking the user to pickup something
# NOT FINISHED YET NOR TESTED
class PulseOrbitAnimation extends Animation

  # Helper method
  distanceFromCenter = (center, distance)->
    center.marginRadius + distance

  constructor: (options)->
    {@ring, @minRadius, @maxRadius} = options
    @timestamp = 0

  # Calculate a point's x and y
  radiusValueFromTimestamp: (timestamp)->

    radius = Math.abs(Math.sin(timestamp / 15) * @maxRadius) + @minRadius

    radius

  # Overriding the default method to render the animation
  renderAnimation: ->
    @timestamp += 1
    # if @timestamp > 20
    #   @timestamp = 0
    console.log @timestamp
    radius = @radiusValueFromTimestamp(@timestamp)

    @ring.radius = radius
