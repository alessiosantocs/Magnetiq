# This animation should be activated on corpses to make them explode
# NOT FINISHED YET NOR TESTED
class ExplosionAnimation extends Animation
  constructor: (options={})->
    super options
    
    {@point, @pointArray} = options

    @resetPoints()

    @
  resetPoints: ->
    console.log @point
    @explosionPoint = new Point()
    @pointArray.push @explosionPoint
    @explosionPoint.set "x", 0
    @explosionPoint.set "y", 0
    console.log @explosionPoint
    true

  moveExplosionPoint: (time)->
    @explosionPoint.x += time
    console.log @explosionPoint.x

  renderAnimation: ->
    @moveExplosionPoint @internalTimer

# Testing purposes
# window.ExplosionAnimation = ExplosionAnimation
