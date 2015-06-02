# Add the following line to your project in Framer Studio. 
# myModule = require "myModule"
# Reference the contents by name, like myModule.myFunction() or myModule.myVar

# Function to toggle layer visibility
exports.toggleLayerVisibility = (layer) ->
	if layer.opacity is 0
		layer.opacity = 1
	else
		layer.opacity = 0

# Function to toggle layer visibility with animation
exports.toggleLayerVisibilityWithAnimation = (layer) ->
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
exports.animateIconBounds = (icon) ->
	
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
exports.rippleEffect = (event, layer, rippleColour) ->
	
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
