require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"helperModule":[function(require,module,exports){
exports.toggleLayerVisibility = function(layer) {
  if (layer.opacity === 0) {
    return layer.opacity = 1;
  } else {
    return layer.opacity = 0;
  }
};

exports.toggleLayerVisibilityWithAnimation = function(layer) {
  if (layer.opacity === 0) {
    return layer.animate({
      properties: {
        opacity: 1
      },
      curve: "ease-in-out",
      time: 0.2
    });
  } else {
    return layer.animate({
      properties: {
        opacity: 0
      },
      curve: "ease-in-out",
      time: 0.2
    });
  }
};

exports.animateIconBounds = function(icon) {
  var iconTapBounds;
  iconTapBounds = new Layer({
    backgroundColor: "#ffffff",
    opacity: 0.2,
    width: 45,
    height: 45,
    borderRadius: 45,
    midX: icon.midX,
    midY: icon.midY + 20
  });
  iconTapBounds.animate({
    properties: {
      opacity: 0.2
    },
    curve: "ease-in-out",
    time: 0.2
  });
  return iconTapBounds.on(Events.AnimationEnd, function() {
    iconTapBounds.animate({
      properties: {
        opacity: 0
      },
      curve: "ease-in-out"
    });
    return iconTapBounds.destroy();
  });
};

exports.rippleEffect = function(event, layer, rippleColour) {
  var ripple, rippleAnimation, rippleConstraints;
  rippleConstraints = new Layer({
    scale: 1,
    opacity: 0.5,
    superLayer: layer,
    midX: layer.offsetX,
    midY: layer.offsetY,
    width: layer.width,
    height: layer.height,
    borderRadius: layer.height
  });
  layer.clip = true;
  ripple = new Layer({
    borderRadius: "50%",
    scale: 0,
    opacity: .5,
    superLayer: rippleConstraints,
    backgroundColor: rippleColour,
    brightness: 115,
    midX: event.offsetX,
    midY: event.offsetY,
    index: 0,
    force2d: true
  });
  rippleAnimation = ripple.animate({
    properties: {
      scale: layer.width / 50,
      clip: true,
      opacity: 0,
      curve: "ease-out",
      time: .2
    }
  });
  return rippleAnimation.on("end", function() {
    ripple.destroy();
    return rippleConstraints.destroy();
  });
};



},{}],"myModule":[function(require,module,exports){
exports.myVar = "myVariable";

exports.myFunction = function() {
  return print("myFunction is running");
};

exports.myArray = [1, 2, 3];



},{}]},{},[])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvdmVkcmFuYXJuYXV0b3ZpYy9Ecm9wYm94LzA2IC0gVGhhdEJhbGRVWEd1eS9BZ2lsZUd1aWRlQXBwL0FnaWxlR3VpZGUuZnJhbWVyL21vZHVsZXMvaGVscGVyTW9kdWxlLmNvZmZlZSIsIi9Vc2Vycy92ZWRyYW5hcm5hdXRvdmljL0Ryb3Bib3gvMDYgLSBUaGF0QmFsZFVYR3V5L0FnaWxlR3VpZGVBcHAvQWdpbGVHdWlkZS5mcmFtZXIvbW9kdWxlcy9teU1vZHVsZS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNLQSxPQUFPLENBQUMscUJBQVIsR0FBZ0MsU0FBQyxLQUFELEdBQUE7QUFDL0IsRUFBQSxJQUFHLEtBQUssQ0FBQyxPQUFOLEtBQWlCLENBQXBCO1dBQ0MsS0FBSyxDQUFDLE9BQU4sR0FBZ0IsRUFEakI7R0FBQSxNQUFBO1dBR0MsS0FBSyxDQUFDLE9BQU4sR0FBZ0IsRUFIakI7R0FEK0I7QUFBQSxDQUFoQyxDQUFBOztBQUFBLE9BT08sQ0FBQyxrQ0FBUixHQUE2QyxTQUFDLEtBQUQsR0FBQTtBQUM1QyxFQUFBLElBQUcsS0FBSyxDQUFDLE9BQU4sS0FBaUIsQ0FBcEI7V0FDQyxLQUFLLENBQUMsT0FBTixDQUNDO0FBQUEsTUFBQSxVQUFBLEVBQ0M7QUFBQSxRQUFBLE9BQUEsRUFBUyxDQUFUO09BREQ7QUFBQSxNQUVBLEtBQUEsRUFBTyxhQUZQO0FBQUEsTUFHQSxJQUFBLEVBQU0sR0FITjtLQURELEVBREQ7R0FBQSxNQUFBO1dBT0MsS0FBSyxDQUFDLE9BQU4sQ0FDQztBQUFBLE1BQUEsVUFBQSxFQUNDO0FBQUEsUUFBQSxPQUFBLEVBQVMsQ0FBVDtPQUREO0FBQUEsTUFFQSxLQUFBLEVBQU8sYUFGUDtBQUFBLE1BR0EsSUFBQSxFQUFNLEdBSE47S0FERCxFQVBEO0dBRDRDO0FBQUEsQ0FQN0MsQ0FBQTs7QUFBQSxPQXVCTyxDQUFDLGlCQUFSLEdBQTRCLFNBQUMsSUFBRCxHQUFBO0FBRTNCLE1BQUEsYUFBQTtBQUFBLEVBQUEsYUFBQSxHQUFvQixJQUFBLEtBQUEsQ0FDbkI7QUFBQSxJQUFBLGVBQUEsRUFBaUIsU0FBakI7QUFBQSxJQUNBLE9BQUEsRUFBUyxHQURUO0FBQUEsSUFFQSxLQUFBLEVBQU0sRUFGTjtBQUFBLElBRVUsTUFBQSxFQUFPLEVBRmpCO0FBQUEsSUFHQSxZQUFBLEVBQWEsRUFIYjtBQUFBLElBSUEsSUFBQSxFQUFNLElBQUksQ0FBQyxJQUpYO0FBQUEsSUFLQSxJQUFBLEVBQU0sSUFBSSxDQUFDLElBQUwsR0FBVSxFQUxoQjtHQURtQixDQUFwQixDQUFBO0FBQUEsRUFRQSxhQUFhLENBQUMsT0FBZCxDQUNDO0FBQUEsSUFBQSxVQUFBLEVBQ0M7QUFBQSxNQUFBLE9BQUEsRUFBUyxHQUFUO0tBREQ7QUFBQSxJQUVBLEtBQUEsRUFBTyxhQUZQO0FBQUEsSUFHQSxJQUFBLEVBQU0sR0FITjtHQURELENBUkEsQ0FBQTtTQWNBLGFBQWEsQ0FBQyxFQUFkLENBQWlCLE1BQU0sQ0FBQyxZQUF4QixFQUFzQyxTQUFBLEdBQUE7QUFDckMsSUFBQSxhQUFhLENBQUMsT0FBZCxDQUNDO0FBQUEsTUFBQSxVQUFBLEVBQ0M7QUFBQSxRQUFBLE9BQUEsRUFBUyxDQUFUO09BREQ7QUFBQSxNQUVBLEtBQUEsRUFBTyxhQUZQO0tBREQsQ0FBQSxDQUFBO1dBSUEsYUFBYSxDQUFDLE9BQWQsQ0FBQSxFQUxxQztFQUFBLENBQXRDLEVBaEIyQjtBQUFBLENBdkI1QixDQUFBOztBQUFBLE9BZ0RPLENBQUMsWUFBUixHQUF1QixTQUFDLEtBQUQsRUFBUSxLQUFSLEVBQWUsWUFBZixHQUFBO0FBRXRCLE1BQUEsMENBQUE7QUFBQSxFQUFBLGlCQUFBLEdBQXdCLElBQUEsS0FBQSxDQUN2QjtBQUFBLElBQUEsS0FBQSxFQUFPLENBQVA7QUFBQSxJQUNBLE9BQUEsRUFBUyxHQURUO0FBQUEsSUFFQSxVQUFBLEVBQVksS0FGWjtBQUFBLElBR0EsSUFBQSxFQUFNLEtBQUssQ0FBQyxPQUhaO0FBQUEsSUFJQSxJQUFBLEVBQU0sS0FBSyxDQUFDLE9BSlo7QUFBQSxJQUtBLEtBQUEsRUFBTyxLQUFLLENBQUMsS0FMYjtBQUFBLElBTUEsTUFBQSxFQUFRLEtBQUssQ0FBQyxNQU5kO0FBQUEsSUFPQSxZQUFBLEVBQWMsS0FBSyxDQUFDLE1BUHBCO0dBRHVCLENBQXhCLENBQUE7QUFBQSxFQVVBLEtBQUssQ0FBQyxJQUFOLEdBQWEsSUFWYixDQUFBO0FBQUEsRUFZQSxNQUFBLEdBQWEsSUFBQSxLQUFBLENBQ1o7QUFBQSxJQUFBLFlBQUEsRUFBYyxLQUFkO0FBQUEsSUFDQSxLQUFBLEVBQU8sQ0FEUDtBQUFBLElBRUEsT0FBQSxFQUFTLEVBRlQ7QUFBQSxJQUdBLFVBQUEsRUFBWSxpQkFIWjtBQUFBLElBSUEsZUFBQSxFQUFpQixZQUpqQjtBQUFBLElBS0EsVUFBQSxFQUFZLEdBTFo7QUFBQSxJQU1BLElBQUEsRUFBTSxLQUFLLENBQUMsT0FOWjtBQUFBLElBT0EsSUFBQSxFQUFNLEtBQUssQ0FBQyxPQVBaO0FBQUEsSUFRQSxLQUFBLEVBQU8sQ0FSUDtBQUFBLElBU0EsT0FBQSxFQUFTLElBVFQ7R0FEWSxDQVpiLENBQUE7QUFBQSxFQXlCQSxlQUFBLEdBQWtCLE1BQU0sQ0FBQyxPQUFQLENBQ2pCO0FBQUEsSUFBQSxVQUFBLEVBQ0M7QUFBQSxNQUFBLEtBQUEsRUFBTyxLQUFLLENBQUMsS0FBTixHQUFjLEVBQXJCO0FBQUEsTUFDQSxJQUFBLEVBQU0sSUFETjtBQUFBLE1BRUEsT0FBQSxFQUFTLENBRlQ7QUFBQSxNQUdBLEtBQUEsRUFBTyxVQUhQO0FBQUEsTUFJQSxJQUFBLEVBQU0sRUFKTjtLQUREO0dBRGlCLENBekJsQixDQUFBO1NBaUNBLGVBQWUsQ0FBQyxFQUFoQixDQUFtQixLQUFuQixFQUEwQixTQUFBLEdBQUE7QUFDekIsSUFBQSxNQUFNLENBQUMsT0FBUCxDQUFBLENBQUEsQ0FBQTtXQUNBLGlCQUFpQixDQUFDLE9BQWxCLENBQUEsRUFGeUI7RUFBQSxDQUExQixFQW5Dc0I7QUFBQSxDQWhEdkIsQ0FBQTs7Ozs7QUNEQSxPQUFPLENBQUMsS0FBUixHQUFnQixZQUFoQixDQUFBOztBQUFBLE9BRU8sQ0FBQyxVQUFSLEdBQXFCLFNBQUEsR0FBQTtTQUNwQixLQUFBLENBQU0sdUJBQU4sRUFEb0I7QUFBQSxDQUZyQixDQUFBOztBQUFBLE9BS08sQ0FBQyxPQUFSLEdBQWtCLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLENBTGxCLENBQUEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiIyBBZGQgdGhlIGZvbGxvd2luZyBsaW5lIHRvIHlvdXIgcHJvamVjdCBpbiBGcmFtZXIgU3R1ZGlvLiBcbiMgbXlNb2R1bGUgPSByZXF1aXJlIFwibXlNb2R1bGVcIlxuIyBSZWZlcmVuY2UgdGhlIGNvbnRlbnRzIGJ5IG5hbWUsIGxpa2UgbXlNb2R1bGUubXlGdW5jdGlvbigpIG9yIG15TW9kdWxlLm15VmFyXG5cbiMgRnVuY3Rpb24gdG8gdG9nZ2xlIGxheWVyIHZpc2liaWxpdHlcbmV4cG9ydHMudG9nZ2xlTGF5ZXJWaXNpYmlsaXR5ID0gKGxheWVyKSAtPlxuXHRpZiBsYXllci5vcGFjaXR5IGlzIDBcblx0XHRsYXllci5vcGFjaXR5ID0gMVxuXHRlbHNlXG5cdFx0bGF5ZXIub3BhY2l0eSA9IDBcblxuIyBGdW5jdGlvbiB0byB0b2dnbGUgbGF5ZXIgdmlzaWJpbGl0eSB3aXRoIGFuaW1hdGlvblxuZXhwb3J0cy50b2dnbGVMYXllclZpc2liaWxpdHlXaXRoQW5pbWF0aW9uID0gKGxheWVyKSAtPlxuXHRpZiBsYXllci5vcGFjaXR5IGlzIDBcblx0XHRsYXllci5hbmltYXRlXG5cdFx0XHRwcm9wZXJ0aWVzOlxuXHRcdFx0XHRvcGFjaXR5OiAxXG5cdFx0XHRjdXJ2ZTogXCJlYXNlLWluLW91dFwiXG5cdFx0XHR0aW1lOiAwLjJcblx0ZWxzZVxuXHRcdGxheWVyLmFuaW1hdGVcblx0XHRcdHByb3BlcnRpZXM6XG5cdFx0XHRcdG9wYWNpdHk6IDBcblx0XHRcdGN1cnZlOiBcImVhc2UtaW4tb3V0XCJcblx0XHRcdHRpbWU6IDAuMlxuXG5cbiMgRnVuY3Rpb24gdG8gYW5pbWF0ZSB0aGUgYmFja2dyb3VuZCBiZWhpbmQgYW4gaWNvbiB0aGF0IGhhcyBiZWVuIHRhcHBlZFxuZXhwb3J0cy5hbmltYXRlSWNvbkJvdW5kcyA9IChpY29uKSAtPlxuXHRcblx0aWNvblRhcEJvdW5kcyA9IG5ldyBMYXllclxuXHRcdGJhY2tncm91bmRDb2xvcjogXCIjZmZmZmZmXCJcblx0XHRvcGFjaXR5OiAwLjJcblx0XHR3aWR0aDo0NSwgaGVpZ2h0OjQ1XG5cdFx0Ym9yZGVyUmFkaXVzOjQ1XG5cdFx0bWlkWDogaWNvbi5taWRYXG5cdFx0bWlkWTogaWNvbi5taWRZKzIwXG5cdFx0XG5cdGljb25UYXBCb3VuZHMuYW5pbWF0ZVxuXHRcdHByb3BlcnRpZXM6XG5cdFx0XHRvcGFjaXR5OiAwLjJcblx0XHRjdXJ2ZTogXCJlYXNlLWluLW91dFwiXG5cdFx0dGltZTogMC4yXG5cblx0aWNvblRhcEJvdW5kcy5vbiBFdmVudHMuQW5pbWF0aW9uRW5kLCAtPlxuXHRcdGljb25UYXBCb3VuZHMuYW5pbWF0ZVxuXHRcdFx0cHJvcGVydGllczpcblx0XHRcdFx0b3BhY2l0eTogMFxuXHRcdFx0Y3VydmU6IFwiZWFzZS1pbi1vdXRcIlxuXHRcdGljb25UYXBCb3VuZHMuZGVzdHJveSgpXG5cdFx0XG5cbiMgQ3JlYXRlIGEgcmlwcGxlIGVmZmVjdCBmb3IgdGhlIGxheWVyIHRha2luZyBpbnRvIGFjY291bnQgcG9pbnRlciBwb3NpdGlvblxuZXhwb3J0cy5yaXBwbGVFZmZlY3QgPSAoZXZlbnQsIGxheWVyLCByaXBwbGVDb2xvdXIpIC0+XG5cdFxuXHRyaXBwbGVDb25zdHJhaW50cyA9IG5ldyBMYXllclxuXHRcdHNjYWxlOiAxXG5cdFx0b3BhY2l0eTogMC41XG5cdFx0c3VwZXJMYXllcjogbGF5ZXJcblx0XHRtaWRYOiBsYXllci5vZmZzZXRYIFxuXHRcdG1pZFk6IGxheWVyLm9mZnNldFlcblx0XHR3aWR0aDogbGF5ZXIud2lkdGhcblx0XHRoZWlnaHQ6IGxheWVyLmhlaWdodFxuXHRcdGJvcmRlclJhZGl1czogbGF5ZXIuaGVpZ2h0XG5cblx0bGF5ZXIuY2xpcCA9IHRydWVcblxuXHRyaXBwbGUgPSBuZXcgTGF5ZXJcblx0XHRib3JkZXJSYWRpdXM6IFwiNTAlXCJcblx0XHRzY2FsZTogMFxuXHRcdG9wYWNpdHk6IC41XG5cdFx0c3VwZXJMYXllcjogcmlwcGxlQ29uc3RyYWludHNcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IHJpcHBsZUNvbG91clxuXHRcdGJyaWdodG5lc3M6IDExNVxuXHRcdG1pZFg6IGV2ZW50Lm9mZnNldFhcblx0XHRtaWRZOiBldmVudC5vZmZzZXRZXG5cdFx0aW5kZXg6IDBcblx0XHRmb3JjZTJkOiB0cnVlXG5cdFx0XG5cdFx0XG5cdHJpcHBsZUFuaW1hdGlvbiA9IHJpcHBsZS5hbmltYXRlXG5cdFx0cHJvcGVydGllczogXG5cdFx0XHRzY2FsZTogbGF5ZXIud2lkdGggLyA1MFxuXHRcdFx0Y2xpcDogdHJ1ZVxuXHRcdFx0b3BhY2l0eTogMFxuXHRcdFx0Y3VydmU6IFwiZWFzZS1vdXRcIlxuXHRcdFx0dGltZTogLjJcblx0XG5cdHJpcHBsZUFuaW1hdGlvbi5vbiBcImVuZFwiLCAtPiBcblx0XHRyaXBwbGUuZGVzdHJveSgpXG5cdFx0cmlwcGxlQ29uc3RyYWludHMuZGVzdHJveSgpXG4iLCIjIEFkZCB0aGUgZm9sbG93aW5nIGxpbmUgdG8geW91ciBwcm9qZWN0IGluIEZyYW1lciBTdHVkaW8uIFxuIyBteU1vZHVsZSA9IHJlcXVpcmUgXCJteU1vZHVsZVwiXG4jIFJlZmVyZW5jZSB0aGUgY29udGVudHMgYnkgbmFtZSwgbGlrZSBteU1vZHVsZS5teUZ1bmN0aW9uKCkgb3IgbXlNb2R1bGUubXlWYXJcblxuZXhwb3J0cy5teVZhciA9IFwibXlWYXJpYWJsZVwiXG5cbmV4cG9ydHMubXlGdW5jdGlvbiA9IC0+XG5cdHByaW50IFwibXlGdW5jdGlvbiBpcyBydW5uaW5nXCJcblxuZXhwb3J0cy5teUFycmF5ID0gWzEsIDIsIDNdIl19
