class Track extends Array
  constructor: (options)->
    super options

  head: ->
    @[@length - 1]
