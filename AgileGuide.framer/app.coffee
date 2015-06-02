# SETUP ------------------------------------------------------------
# Import layers from Sketch
sketch = Framer.Importer.load "imported/AgileGuideFramer"
document.body.style.cursor = "finger" 
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
		time: .3
	
	rippleAnimation.on "end", -> 
		ripple.destroy()
		rippleConstraints.destroy()


# INTERACTIONS ----------------------------------------------------

# Open a topic ----------------------------------------------------
agileBubble.on Events.Click, (event)-> 
	
	defaultDelayOnOpen = 0.2
			
	rippleEffect(event, agileBubble, colorWhite)


# Splash the bubble colour out

	splashOutAnimation = new Animation
		layer: agileBubble
		properties:
			scale: 10
			opacity: 0
		delay: defaultDelayOnOpen
		curve: "spring(300,30,0)"
	
	splashOutAnimation.start()
	
	
# Hide the nav bubble	

	hideNavBubbleAnimation = new Animation
		layer: agileBubbleNav
		properties:
			scale: 0.25
			opacity: 0
		delay: defaultDelayOnOpen
		curve: "spring(600,30,0)"
		
	hideNavBubbleAnimation.start()


# Show the app bar

	showAppBarAnimation = new Animation
		layer: appBar
		properties:
			scale: 1
			opacity: 1
		delay: defaultDelayOnOpen
		
	showAppBarAnimation.start()
	
	toggleLayerVisibilityWithAnimation(menu)
	toggleLayerVisibilityWithAnimation(closeIcon)


# Animate the title
	
	agileBubbleTitle.superLayer = appBar.superLayer
	
	topicTitleAnimation = new Animation
		layer: agileBubbleTitle
		properties:
			scale: 1
			opacity: 1
			midX: appBar.midX
			midY: appBar.midY 
		delay: defaultDelayOnOpen
		curve: "spring(600,30,0)"
		
	topicTitleAnimation.start()
	
# Animate the content

	contentOffset = 30
	agileTopicContent.y = agileTopicContent.y + contentOffset
	agileTopicContent.bringToFront()
	
	showContentAnimation = new Animation
		layer: agileTopicContent
		properties:
			opacity: 1
			y: agileTopicContent.y - contentOffset
		delay: defaultDelayOnOpen
		time: 0.3
		
	showContentAnimation.start()
	
# 	Do nothing when I tap the app bar ------------------------------
appBar.on Events.Click, ->
	# I had to do this, otherwise even layers below were receiving clicks

	

# Close a topic ----------------------------------------------------
closeIcon.on Events.Click, ->

	animateIconBounds(closeIcon)
	
# 	short delay to make sure we can see the icon bounds
	Utils.delay 0.1, ->

# hide the content

		contentOffset = 30
		hideContentAnimation = new Animation
			layer: agileTopicContent
			properties:
				opacity: 0
			time: 0.1
		
		hideContentAnimation.start()

# reset the bubble

		resetBubbleAnimation = new Animation
			layer: agileBubble
			properties:
				scale: 1
				opacity: 1
			delay: 0.1
			curve: "spring(300,30,0)"
	
		resetBubbleAnimation.start()

# hide the app bar and toggle icons

		hideAppBarAnimation = new Animation
			layer: appBar
			properties:
				scale: 1
				opacity: 0
			delay: 0
			time: 0.1
		
		hideAppBarAnimation.start()
	
		toggleLayerVisibilityWithAnimation(menu)
		toggleLayerVisibilityWithAnimation(closeIcon)
	
# move the title back to the bubble
	
		agileBubbleTitle.superLayer = screenBounds
	
		topicTitleAnimation = new Animation
			layer: agileBubbleTitle
			properties:
				scale: 1
				opacity: 1
				midX: agileBubble.midX
				midY: agileBubble.midY
			delay: 0.1
			curve: "spring(600,30,0)"
		
		topicTitleAnimation.start()
	
# show the nav bubble again

		showNavBubbleAnimation = new Animation
			layer: agileBubbleNav
			properties:
				scale: 1
				opacity: 1
			delay: 0.2
			curve: "spring(600,30,0)"
		
		showNavBubbleAnimation.start()
	

# Favourite a topic ----------------------------------------------------
favourite.on Events.Click, ->
	animateIconBounds(favourite)
	toggleLayerVisibilityWithAnimation(favourited)
	










