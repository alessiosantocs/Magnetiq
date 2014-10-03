class Track extends Array
  constructor: (numberOfElements, defaultPoint)->
    super numberOfElements

    defaultPoint ||= new Point
      x: 0
      y: 0

    @push new Point(defaultPoint) for time in new Array(numberOfElements)

  head: ->
    @[@length - 1]
