class Interface
  constructor: (options={})->
    {@container} = options

    @domStandardMessage = @container.getElementsByClassName("standard-message")[0]
    @domOverlay = @container.getElementsByClassName("overlay")[0]

  showInterface: ->
    instance = @
    @container.style.display = "block"

    setTimeout ->
      instance.container.className = "display"
    , 100

    true

  hideInterface: ->
    instance = @
    @container.className = ""
    @domOverlay.className = "overlay"

    setTimeout ->
      instance.container.style.display = "none"
    , 1000

    true

  displayMessage: (message, options={})->
    mainMessage = @domStandardMessage.getElementsByClassName("message-main")[0]
    mainMessage.innerText = message

    instance = @

    @domStandardMessage.style.opacity = 1

    @showInterface()

    if options.showOverlay
      @domOverlay.className = "overlay display"

    if options.autoDismissAfter
      setTimeout ->
        instance.hideInterface()
      , options.autoDismissAfter

    true

window.Interface = Interface
