class Scene
  constructor: (options={})->
    scene = @
    {@universes, @interaction} = options

    @interface = new Interface
      container: document.getElementById("interface")

  # A useful function to put all the elements of the scene into a drawable array of points
  toPointArray: (options={})->
    array = []

    options.skipInteraction ||= false
    unless options.skipInteraction
      array = array.concat(@interaction.toPointArray()) if @interaction
    array = array.concat(universe.toPointArray()) for universe in @universes

    # If options.include is active. Make a copy of the array
    originalArray = []
    if options.include
      originalArray.push point for point in array

    # If the options.only is active, select only stuff that is of that stuff
    if options.only
      temparray = []
      temparray.push point for point in array when point instanceof options.only
      array = temparray

    # If options.except is active, select stuff that isnt of that class
    if options.except
      temparray = []
      temparray.push point for point in array when not (point instanceof options.except)
      array = temparray

    # At last, include stuff that probably was excluded
    if options.include
      array.push point for point in originalArray when point instanceof options.include

    array

  clearScene: ->
    @universes = []
    @interaction = null

  setLevel: (level, onLevelEnding=->)->
    console.log onLevelEnding
    @interface.displayMessage(level.name, {autoDismissAfter: 3000, secondaryMessage: level.tip})
    @clearScene()
    level.call @, {onLevelEnding: onLevelEnding}
