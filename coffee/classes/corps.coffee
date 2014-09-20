class Corps extends Point
  constructor: (options={})->
    super options

    {@radius} = options

    @radius ||= 5
