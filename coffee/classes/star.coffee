class Star extends Corps
  constructor: (options={})->
    super options

    @radius = 10

    @gravitationalForce = 10

    {@marginRadius} = options

    @fillColor = "#57d0f3"
