# Drawy
![](drawy/images/overview-drawy.gif)

[Live](https://drawy.netlify.com)

## Technologies
- [ ] JavaScript
- [ ] HTML Canvas
- [ ] CSS
- [ ] Google API 

## Overview
Drawy is a drawing application with funny fonts. It has a functionality to upload photos and use them as a stroke. In Drawy users will also get suggestions to pick from while drawing. 

## Current Features
* Canvas Board
* Clear Button
* Eraser 
* Undo Button
* Redo Button
* Download Button
* Brush Selection 
* Color Picker
* Pre-loaded funny fonts
* Photo uploading as new fonts
* Suggestions window based on the drawing 

## Code Snippets
* Drawing Implementation
	* calls engage() on mousedown and changes the dragging mode to true: 
	```javascript
	engage(e) {
	  ...
	  this.dragging = true;
	  this.putPoint(e);  
	  ...
	}
	```
	* calls disengage() on mouseup and changes the dragging mode to false: 
	```javascript
	disengage(e) {
	  this.dragging = false;
	  this.context.beginPath();
	  ...
	}
	```
	* putPoint() is called on mousemove event; it checks if the dragging mode is true then draws a point:
	```javascript
	putPoint(e) {
	  ...
	  if(this.dragging) {
	  	this.context.lineCap = "round";
	  	this.context.lineTo(e.offsetX, e.offsetY);
	  	this.context.stroke(); 
	  	this.context.beginPath(); 
	  	this.context.moveTo(e.offsetX, e.offsetY); 
	  }
	  ...
	}
	```
* Fetch Request to Google API
	* loadSuggestionsFromAPI() takes a shapes object that consists of the X-coordinates, Y-coordinates, and the time when the point was placed in putPoint() function. Then passes the shapes object to fetch for the ink object to get the stencil suggestions from the API 
	```javascript
	loadSuggestionsFromAPI(shapes) {
      if(this.predict) { 
          let url = API_ENDPOINT;
          let requestBody = {
              input_type: 0,
              requests: [{
                  ink: shapes,
                  language: 'autodraw',
                  writing_guide: {
                      height: this.canvas.height,
                      width: this.canvas.width
                  }
              }]
          };

          let headers = new Headers({
              'Content-Type': 'application/json; charset=utf-8'
          });
          fetch(url, {
              method: 'POST',
              headers,
              body: JSON.stringify(requestBody),
          }).then((response) => {
              return response.json();
          }).then((jsonResponse) => {
              this.displaySuggestions(jsonResponse[1][0][1]);
          });  
          ...
      }  
      this.shapes = [];
    }
	```

## Future Features
* Save the current board to the local storage
* Websockets to send the final image over to other users




