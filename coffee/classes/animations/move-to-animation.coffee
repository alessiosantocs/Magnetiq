# This animation should be activated on corpses to make them explode
# NOT FINISHED YET NOR TESTED
class MoveToAnimation extends Animation
  constructor: (options={})->
    super options

    {@point, @toPoints, @repeatAutomatically} = options

    @repeatAutomatically ||= false

    @nextPointIndex = 0

    @resetAnimation()

    @

  resetAnimation: ->
    @originalX = @point.x
    @originalY = @point.y


  # calculatePointPositionInTime: (time, fromPoint, toPoint)->
  #   if toPoint.x < fromPoint.x
  #     time *= -1
  #   slope = (toPoint.y - fromPoint.y) / (toPoint.x - fromPoint.x)
  #   x = time + @originalX
  #   y = slope * x - slope * fromPoint.x + fromPoint.y
  #
  #   point = new Point
  #     x: x
  #     y: y
  #
  #   point

  calculatePointPositionInTime: (time, fromPoint, toPoint)->
    @previousPoint ||= fromPoint

    xMove = yMove = 1

    if(toPoint.x < fromPoint.x)
        xMove *= -1

    if(toPoint.y < fromPoint.y)
        yMove *= -1

    x = @previousPoint.x + xMove
    y = @previousPoint.y + yMove

    @previousPoint = point = new Point
        x: x
        y: y

    point

  renderAnimation: ->
    nextPoint = @toPoints[@nextPointIndex]
    point = @calculatePointPositionInTime(@internalTimer, @point, nextPoint)

    # The point hasn't arrived at its destination
    unless @point.isPositionedAt nextPoint
      @point.x = point.x
      @point.y = point.y
    # If it has
    else
      # Try to get the next available point
      @nextPointIndex++
      nextPoint = @toPoints[@nextPointIndex]

      if nextPoint # is present?
        @resetTimer() # Reset the internal timer
        @resetAnimation() # Reset some values of the animation
        # and do not stop the animation
      else if @repeatAutomatically
        @nextPointIndex = 0
        @resetTimer() # Reset the internal timer
        @resetAnimation() # Reset some values of the animation

        @stopAnimation() # Let the user know the animation has stopped
        @startAnimation() # Then start it again
      else
        @stopAnimation()



# Testing purposes
window.MoveToAnimation = MoveToAnimation
