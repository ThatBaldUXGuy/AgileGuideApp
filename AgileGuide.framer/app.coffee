# SETUP ------------------------------------------------------------
# Import layers from Sketch
sketch = Framer.Importer.load "imported/AgileGuideFramer"
document.body.style.cursor = "auto" 
# "auto" # normal cursor
# "finger"


# Globals
topicBubbleDiameter = 170
colorBlue = "#03A9F4"
colorWhite = "#ffffff"

topicShadowX = -2
topicShadowY = 4
topicShadowBlur = 4
topicShadowColor = "#c9c9c9"





# SKETCH LAYERS ----------------------------------------------------
# 360 x 780
screenBounds = sketch['screenBounds']
artboard = sketch.InitialView

# AGILE BUBBLE & TITLE
# Looks like you can't clip a layer when imported from Sketch,
# so instead, I will re-draw the bubble layer in code
agileBubbleSketch = sketch['agileBubble']
agileBubbleSketch.opacity = 0

agileBubbleTitle = sketch['agileBubbleTitle']
agileBubbleNav = sketch['agileBubbleNav']
agileBubbleNav.opacity = 0
agileBubbleNav.scale = 0

agileBubble = new Layer
	width: topicBubbleDiameter
	height: topicBubbleDiameter
	borderRadius: topicBubbleDiameter
	backgroundColor: colorBlue
	x: 90
	y: 214
	opacity: 0
	scale: 0
	shadowX: topicShadowX
	shadowY: topicShadowY
	shadowBlur: topicShadowBlur
	shadowColor: topicShadowColor

# Make sure the bubble and the title have the same super layer
# so that we can control their position relative to each other
agileBubble.superLayer = screenBounds
agileBubbleTitle.superLayer = screenBounds


# position the title over the bubble 
agileBubbleTitle.midX = agileBubble.midX
agileBubbleTitle.midY = agileBubble.midY


# AGILE TOPIC CONTENT
agileTopicContent = sketch['agileCopy']
agileTopicContent.opacity = 0


# APP BAR
appBar = sketch['appBar']
appBar.opacity = 0
appBar.superLayer = artboard
appBar.x = screenBounds.x

# FAVOURITE ICON
favourite = sketch['Favourite']
favourited = sketch['Favourited']
favourited.opacity = 0

# MENU
menu = sketch['menu']

# CLOSE
closeIcon = sketch['closeIcon']
closeIcon.opacity = 0

# SIDE DRAWER
# sideDrawer = sketch['sideDrawer']
# sideDrawer.opacity = 0
# 
# SCRIM
# scrim = sketch['scrim']
# scrim.opacity = 0
	

# LAYER STATES ----------------------------------------------------
# Object states we will be animating between
agileBubble.states.add
	default: {scale: 1, opacity: 1} 
	expanded_colour: {scale: 10} 
	hidden: {scale: 10, opacity: 0}

	
agileBubbleNav.states.add
	default: {scale: 1, opacity: 1} 
	hidden: {scale: 0.25, opacity: 0} 


agileBubbleNav.states.animationOptions = 
    curve: "spring(600,30,0)"


agileBubbleTitle.states.add
	default: {scale: 1, opacity: 1, midX: agileBubble.midX, midY: agileBubble.midY} 
	onTheAppBar: {scale: 1, opacity: 1, midX: appBar.midX, midY: appBar.midY} 
	hidden: {scale: 0, opacity: 0}
	
agileBubbleTitle.states.animationOptions = 
	curve: "spring(600,35,0)"


appBar.states.add
	default: {scale: 1, opacity: 1} 
	hidden: {scale: 1, opacity: 0}

appBar.states.animationOptions = 
	delay: 0.1


menu.states.add
	default: {scale: 1, opacity: 1}
	hidden: {opacity: 0} 

menu.states.animationOptions = 
    curve: "spring(600,30,0)"


agileTopicContent.states.add
	hidden: {y: agileTopicContent.y+30, opacity:0}
	shown: {y: agileTopicContent.y, opacity:1}
	
agileTopicContent.states.animationOptions = 
    curve: "spring(750,30,0)"



# INTRO ANIMATION -------------------------------------------------


agileBubble.animate
	properties:
		scale: 1
		opacity: 1
	delay: 0.5
	curve: "spring(150,10,10,0)"
	
agileBubbleNav.animate
	properties:
		scale: 1
		opacity: 1
	delay: 0.7
	curve: "spring(150,10,10,0)"



# FUNCTIONS -------------------------------------------------------


# Function to toggle layer visibility
toggleLayerVisibility = (layer) ->
	if layer.opacity is 0
		layer.opacity = 1
	else
		layer.opacity = 0

# Function to toggle layer visibility with animation
toggleLayerVisibilityWithAnimation = (layer) ->
	if layer.opacity is 0
		layer.animate
			properties:
				opacity: 1
			curve: "ease-in-out"
			time: 0.2
	else
		layer.animate
			properties:
				opacity: 0
			curve: "ease-in-out"
			time: 0.2


# Function to animate the background behind an icon that has been tapped
animateIconBounds = (icon) ->
	
	iconTapBounds = new Layer
		backgroundColor: "#ffffff"
		opacity: 0.2
		width:45, height:45
		borderRadius:45
		midX: icon.midX
		midY: icon.midY+20
		
	iconTapBounds.animate
		properties:
			opacity: 0.2
		curve: "ease-in-out"
		time: 0.2

	iconTapBounds.on Events.AnimationEnd, ->
		iconTapBounds.animate
			properties:
				opacity: 0
			curve: "ease-in-out"
		iconTapBounds.destroy()
		

# Create a ripple effect for the layer taking into account pointer position
rippleEffect = (event, layer, rippleColour) ->
	
	rippleConstraints = new Layer
		scale: 1
		opacity: 0.5
		superLayer: layer
		midX: layer.offsetX 
		midY: layer.offsetY
		width: layer.width
		height: layer.height
		borderRadius: layer.height

	layer.clip = true

	ripple = new Layer
		borderRadius: "50%"
		scale: 0
		opacity: .5
		superLayer: rippleConstraints
		backgroundColor: rippleColour
		brightness: 115
		midX: event.offsetX
		midY: event.offsetY
		index: 0
		force2d: true
		
		
	rippleAnimation = ripple.animate
		properties: 
			scale: layer.width / 50
			clip: true
			opacity: 0
		curve: "ease-out"
		time: .2
	
	rippleAnimation.on "end", -> 
		ripple.destroy()
		rippleConstraints.destroy()


# INTERACTIONS ----------------------------------------------------



# Open a topic ----------------------------------------------------
agileBubble.on Events.Click, (event)-> 
	
		
	rippleEffect(event, agileBubble, colorWhite)


# Splash the bubble colour out
	agileBubble.states.animationOptions = 
		delay: 0.2
		curve: "spring(300,30,0)"
	agileBubble.states.switch("expanded_colour")
	

# Hide the nav bubble	
	agileBubbleNav.states.animationOptions = 
	    delay: 0.2
	    curve: "spring(600,30,0)"
	agileBubbleNav.states.switch("hidden")

# Splash the white	
	agileBubble.states.switch("hidden")

# Show the app bar
	menu.states.switch("hidden")
	appBar.states.animationOptions =
		delay: 0.2

	appBar.states.switch("default")	
	toggleLayerVisibilityWithAnimation(closeIcon)

# Animate the title
	
	agileBubbleTitle.superLayer = appBar.superLayer
	
	agileBubbleTitle.states.animationOptions =
		delay: 0.1
		curve: "spring(600,30,0)"
	agileBubbleTitle.states.switch("onTheAppBar")

# # Animate the content
	agileTopicContent.states.switchInstant("hidden")
	agileTopicContent.bringToFront()
	
	agileTopicContent.states.animationOptions = 
		delay: 0.3
		time: 0.3
	agileTopicContent.states.switch("shown")
	
	 

	
# 	Do nothing when I tap the app bar ------------------------------
appBar.on Events.Click, ->
	# I had to do this, otherwise even layers below were receiving clicks

	

# Close a topic ----------------------------------------------------
closeIcon.on Events.Click, ->
	animateIconBounds(closeIcon)

	agileTopicContent.states.animationOptions = 
		delay: 0
		time: 0.1
	agileTopicContent.states.switch("hidden")

	agileBubble.states.switch("default")
	
	appBar.states.animationOptions = 
		delay: 0
		time: 0.1 
		curve: "spring(450,30,0)"
	appBar.states.switch("hidden")
	toggleLayerVisibilityWithAnimation(closeIcon)
	
	agileBubbleTitle.superLayer = screenBounds
	agileBubbleTitle.states.switch("default")
	agileBubbleTitle.placeBefore(agileBubble)
	
	agileBubbleNav.states.animationOptions = 
	    delay: 0.2
	    curve: "spring(600,30,0)"
	agileBubbleNav.states.switch("default")
	
	menu.states.switch("default")
	
	


# Favourite a topic ----------------------------------------------------
favourite.on Events.Click, ->
	animateIconBounds(favourite)
	toggleLayerVisibilityWithAnimation(favourited)
	










