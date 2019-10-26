const API_ENDPOINT = 'https://inputtools.google.com/request?ime=handwriting&app=autodraw&dbg=1&cs=1&oe=UTF-8';
// const STENCILS_ENDPOINT = 'src/data/stencils.json';
// const stencils = require("../data/stencils.json");
const request = require('request');
// const request = require('http').request;
// window.stencils = stencils;

export default class SketchPad {
    constructor(canvas, tool) {
        
        this.canvas = canvas;
        this.tool = tool;
        this.context = canvas.getContext("2d");

        // set the background to white
        // this.context.fillStyle = "white";
        // this.context.fillRect(0, 0, canvas.width, canvas.height);

        // clear canvas
        this.clearCanvasBtn = document.getElementById('clear-canvas-btn');

        // color fill
        this.colorFillBtn = document.getElementById("color-fill");
        
        // undo button
        this.undoBtn = document.getElementById("undo-btn");

        // redo button
        this.redoBtn = document.getElementById("redo-btn");

        // suggestions section
        this.drawSuggestions = document.getElementById("draw-suggestions");

        // download btn
        this.downloadBtn = document.getElementById("download-btn");

        // list for undo and redo 
        this.undoList = [];
        this.redoList = [];

        // shapes
        this.currentShape;
        this.shapes = [];

        // start time 
        this.pressedAt = 0;

        // stencils 
        // this.stencils = stencils;

        // current brush
        this.currentBrush ="regular";

        // this.initCurrentBrush();

        this.dragging = false; // indicates if the mouse is held down
        this.predict = false;
        this.loadStencils();
        this.prepareNewShape(); 
        this.saveState(); // cuz the first time it won't have a second to last to undo


        // this.offsetX = document.body.offsetLeft;
        // this.offsetY = document.body.offsetTop;
        this.offsetX = this.canvas.offsetLeft;
        this.offsetY = this.canvas.offsetTop;

        // binds
        this.putPoint = this.putPoint.bind(this);
        this.engage = this.engage.bind(this);
        this.disengage = this.disengage.bind(this);
        this.clear = this.clear.bind(this);
        this.colorFill = this.colorFill.bind(this);
        this.undo = this.undo.bind(this);
        this.redo = this.redo.bind(this);
        this.saveState = this.saveState.bind(this);
        this.restoreState = this.restoreState.bind(this);
        this.loadSuggestionsFromAPI = this.loadSuggestionsFromAPI.bind(this);
        this.displaySuggestions = this.displaySuggestions.bind(this);
        this.prepareNewShape = this.prepareNewShape.bind(this);
        this.storeCoordinates = this.storeCoordinates.bind(this);
        this.commitCurrentShape = this.commitCurrentShape.bind(this);
        this.pickSuggestion = this.pickSuggestion.bind(this);
        this.handleBrushIconClick = this.handleBrushIconClick.bind(this);
        this.determineCurrentBrush = this.determineCurrentBrush.bind(this);
        this.handleEraserIconClick = this.handleEraserIconClick.bind(this);
        this.download = this.download.bind(this);
        // this.prepareStencil = this.prepareStencil.bind(this);
        // this.drawUndoListExceptLast = this.drawUndoListExceptLast.bind(this);

        // draw events
        this.canvas.addEventListener("mousedown", this.engage);
        const html = document.getElementsByTagName("html")[0];
        html.addEventListener("mouseup", this.disengage)
        // this.canvas.addEventListener("mouseup", this.disengage);
        this.canvas.addEventListener("mousemove", this.putPoint);

        // action events
        this.clearCanvasBtn.addEventListener('click', this.clear);
        this.colorFillBtn.addEventListener("click", this.colorFill);
        this.undoBtn.addEventListener("click", this.undo);
        this.redoBtn.addEventListener("click", this.redo);
        this.drawSuggestions.addEventListener("click", (e) => { this.pickSuggestion(e); this.saveState(); });
        this.downloadBtn.addEventListener("click", this.download);


        document.getElementById("eraser-icon").addEventListener("click", this.handleEraserIconClick);
        document.getElementById("brush-icon").addEventListener("click", this.handleBrushIconClick);

        // hide/show the brush slider
        document.getElementById("tool-pencil-div").addEventListener("mouseover", () => { 
            document.getElementById("brush-slider-div").setAttribute("style", "display: block");
            document.getElementById("tool-pencil-div").setAttribute("style", "width: 200px");
        });

        document.getElementById("tool-pencil-div").addEventListener("mouseout", () => { 
            document.getElementById("brush-slider-div").setAttribute("style", "display: hide");
            document.getElementById("tool-pencil-div").setAttribute("style", "width: 44px"); 
        });

        // hide/show the image uploads
        document.getElementById("tool-upload-div").addEventListener("mouseover", () => {
            document.getElementById("images").setAttribute("style", "display: block");
            document.getElementById("tool-upload-div").setAttribute("style", "width: 200px");
        });

        document.getElementById("tool-upload-div").addEventListener("mouseout", () => {
            document.getElementById("images").setAttribute("style", "display: hide");
            document.getElementById("tool-upload-div").setAttribute("style", "width: 44px");
        });

        // hide/show color-strip
        document.getElementById("tool-color-div").addEventListener("mouseover", () => {
            document.getElementById("colors").setAttribute("style", "display: block");
            document.getElementById("color-strip").setAttribute("style", "display: block");
            document.getElementById("tool-color-div").setAttribute("style", "width: 200px");
        });

        document.getElementById("tool-color-div").addEventListener("mouseout", () => {
            document.getElementById("colors").setAttribute("style", "display: none");
            document.getElementById("color-strip").setAttribute("style", "display: none");
            document.getElementById("tool-color-div").setAttribute("style", "width: 46px");
        });
    }

    handleEraserIconClick(e) {
        document.getElementById("eraser-icon").setAttribute("style", "background-color: black; box-shadow: none;");
        document.getElementById("eraser-icon").src = "../../dist/images/eraser-on.png";
        document.getElementById("eraser-icon").classList.add("selected");

        document.getElementById("upload-icon").setAttribute("style", "background-color: white; box-shadow: 0.1rem 0.1rem 0 rgba(0,0,0,0.25);");
        document.getElementById("upload-icon").src = "../../dist/images/tree.png";
        document.getElementById("upload-icon").classList.remove("selected");

        document.getElementById("brush-icon").setAttribute("style", "background-color: white; box-shadow: 0.1rem 0.1rem 0 rgba(0,0,0,0.25);");
        document.getElementById("brush-icon").src = "../../dist/images/pencil.png";
        document.getElementById("brush-icon").classList.remove("selected");
        this.currentBrush = "eraser";
    }

    handleBrushIconClick(e) {
        document.getElementById("brush-icon").setAttribute("style", "background-color: black; box-shadow: none;");
        document.getElementById("brush-icon").src = "../../dist/images/pencil-on.png";
        document.getElementById("brush-icon").classList.add("selected");

        document.getElementById("upload-icon").setAttribute("style", "background-color: white; box-shadow: 0.1rem 0.1rem 0 rgba(0,0,0,0.25);");
        document.getElementById("upload-icon").src = "../../dist/images/tree.png";
        document.getElementById("upload-icon").classList.remove("selected");

        document.getElementById("eraser-icon").setAttribute("style", "background-color: white; box-shadow: 0.1rem 0.1rem 0 rgba(0,0,0,0.25);");
        document.getElementById("eraser-icon").src = "../../dist/images/eraser.png";
        document.getElementById("eraser-icon").classList.remove("selected");

        this.currentBrush === "regular";
    }

    determineCurrentBrush() {
        // const uploadIcon = document.getElementById("upload-icon");
        // const brushIcon = document.getElementById("brush-icon");
        if (document.getElementById("upload-icon").classList.contains("selected")) {
            this.currentBrush = "image"
        } else if (document.getElementById("brush-icon").classList.contains("selected")) {
            this.currentBrush = "regular";
        } else if (document.getElementById("eraser-icon").classList.contains("selected")) {
            this.currentBrush = "eraser";
        }
    }

    loadStencils() {
        // debugger
        // this.Http.get(STENCILS_ENDPOINT).subscribe(response => this.stencils = response.json());
    }

    displaySuggestions(iconList) {
        this.drawSuggestions.innerHTML = '';
        document.getElementById("draw-suggestions").innerHTML = "";


        iconList.forEach(icon => {
            // debugger
            if (icon in window.stencils) {
                // debugger
                // each icon has different versions of drawing
                window.stencils[icon].forEach(type => {
                    // debugger
                    // let img = new Image();
                    // img.crossOrigin = "Anonymous"
                    // img.src = type.src;
                    this.drawSuggestions.innerHTML += '<img class="img-svg" src="' + type.src + '" crossOrigin="Anonymous" />';
                });
            }
        });

        // this.translateSVGToInlineSVG();
    }

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
                // debugger
                return response.json();
            }).then((jsonResponse) => {
                // debugger
                this.displaySuggestions(jsonResponse[1][0][1]);
            });

            this.predict = false;
        }

        this.shapes = [];
    }

    /////
    prepareNewShape() {
        this.currentShape = [
            [], // X coordinates
            [], // Y coordinates
            []  // Times
        ];
    }
    storeCoordinates(X, Y, time) {
        this.currentShape[0].push(X);
        this.currentShape[1].push(Y);
        this.currentShape[2].push(time);
    }

    commitCurrentShape() {
        this.shapes.push(this.currentShape);
        // displaySuggestions goes here
    }

    // prepareStencil(imgURL) {
    //     // <object id="svg-object" data="path/to/external.svg" type="image/svg+xml"></object>
        
    //     // let obj = document.createElement('object');
    //     // obj.id = "svg-obj";
    //     // obj.data = image.src;
    //     // obj.type = "image/svg+xml";

    //     request(imgURL, (error, response, body) => {
    //         response;
    //         error;
    //         body;
    //         debugger
    //         const parser = new DOMParser();
    //         const xmlDoc = parser.parseFromString(body, 'text/html');

    //         const paths = xmlDoc.getElementsByTagName("path");
    //         // let svg = xmlDoc.querySelector('svg');
    //         debugger

    //         Array.from(paths).forEach(path => {
    //             debugger
    //             const style = window.getComputedStyle(path);
    //             const fill = style.getPropertyValue("fill");

    //             path.setAttribute("style", "stroke: blue");
    //             console.log(fill);
    //             debugger
    //             if (fill === "rgb(255, 255, 255)") {
    //                 path.parentElement.removeChild(path);
    //                 debugger
    //             }
    //         })
    //     });
    // }

    // drawUndoListExceptLast() {
    //     let undoListCopy = this.undoList.slice();
    //     undoListCopy.pop();

    //     undoListCopy.forEach(drawing => {
    //         let img = document.createElement('img');
    //         img.src = drawing;
    //         img.crossOrigin = "Anonymous"

    //         img.onload = () => {
    //             // this.clear();
    //             this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    //             this.context.drawImage(img, 0, 0, this.canvas.width, this.canvas.height, 0, 0, this.canvas.width, this.canvas.height);
    //         }
    //     })

    // }

    // drawSecondToLast() {

    // }

    pickSuggestion(e) {
        // try { 
            // debugger
            // this.clear();
            // let xMax = this.canvas.width;
            // let yMax = this.canvas.height;

            debugger

        let xAvg = (Math.max.apply(null, this.currentShape[0]) + Math.min.apply(null, this.currentShape[0])) / 2;
        let yAvg = (Math.max.apply(null, this.currentShape[1]) + Math.min.apply(null, this.currentShape[1])) / 2;

            let width = 200;
            let height = 200;

            debugger
            // let image = new Image();
            // image.crossOrigin = "Anonymous";
            // image.src = e.target.src;
            // image.className = "img-svg";
            // image.setAttribute('style', "width: 50px; height:50px;");
            
            // this.prepareStencil(image);

            // debugger
            // remove the white background and fill with the current color
            ////////////
            // const imgID = image.getAttribute('id');
            // const imgClass = image.getAttribute('class');
            // const imgURL = image.getAttribute('src');

            // debugger

            // this.saveState();

            const imgURL = e.target.src;
            // this.undo();
            // draw second to last element of the undo_list
            let secondToLastDrawingSRC = this.undoList[this.undoList.length - 1];
            let secondToLastDrawing = document.createElement('img');
            secondToLastDrawing.src = secondToLastDrawingSRC;
            secondToLastDrawing.crossOrigin = "Anonymous"

            secondToLastDrawing.onload = () => {
                // debugger
                // this.clear();
                this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.context.drawImage(secondToLastDrawing, 0, 0, this.canvas.width, this.canvas.height, 0, 0, this.canvas.width, this.canvas.height);
                // this.saveState(this.undoList, true);
                // this.download();
            }
            request(imgURL, (error, response, body) => {
                response;
                error;
                body;
                imgURL
                // debugger
                
                // gets rid of all the white fills and fills with the current color
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(body, 'text/html');
                let svg = xmlDoc.querySelector('svg');

                const paths = xmlDoc.getElementsByTagName("path");
                const circles = xmlDoc.getElementsByTagName("circle");
                const ellipses = xmlDoc.getElementsByTagName("ellipse");
                const lines = xmlDoc.getElementsByTagName("line");
                const polygons = xmlDoc.getElementsByTagName("polygon");
                const polylines = xmlDoc.getElementsByTagName("polyline");
                const rects = xmlDoc.getElementsByTagName("rect");

                // debugger
                Array.from(rects).forEach(rect => {
                    rect.setAttribute("style", `stroke: ${this.tool.colorPicker.selectedColor}; fill: none;`);
                })

                Array.from(polylines).forEach(polyline => {
                    polyline.setAttribute("style", `stroke: ${this.tool.colorPicker.selectedColor}; fill: none;`);
                })

                Array.from(polygons).forEach(polygon => {
                    polygon.setAttribute("style", `stroke: ${this.tool.colorPicker.selectedColor}; fill: none;`);
                })

                Array.from(lines).forEach(line => {
                    line.setAttribute("style", `stroke: ${this.tool.colorPicker.selectedColor}; fill: none;`);
                })

                Array.from(ellipses).forEach(ellipse => {
                    ellipse.setAttribute("style", `stroke: ${this.tool.colorPicker.selectedColor}; fill: none;`);
                })

                Array.from(circles).forEach(circle => {
                    circle.setAttribute("style", `stroke: ${this.tool.colorPicker.selectedColor}; fill: none;`);
                })

                Array.from(paths).forEach(path => {
                    
                    // const style = window.getComputedStyle(path);
                    // const fill = style.getPropertyValue("fill");
                    // const fill = svg.style.getPropertyValue("fill");
                    // debugger

                    path.setAttribute("style", `stroke: ${this.tool.colorPicker.selectedColor}; fill: none;`);
                    // path.setAttribute("style", "fill: none");
                    // console.log(fill);
                    // // debugger
                    // if (fill === "rgb(255, 255, 255)") {
                    //     path.parentElement.removeChild(path);
                    //     // debugger
                    // }
                })

                // this.clear();
                // this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
                // this.context.fillStyle = "white";
                // this.context.fillRect(0, 0, canvas.width, canvas.height);
                // this.drawUndoListExceptLast();

                // draw second to last element of the undo_list
                // let secondToLastDrawingSRC = this.undoList[this.undoList.length - 2];
                // let secondToLastDrawing = document.createElement('img');
                // secondToLastDrawing.src = secondToLastDrawingSRC;
                // secondToLastDrawing.crossOrigin = "Anonymous"

                // secondToLastDrawing.onload = () => {
                //     // this.clear();
                //     this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
                //     this.context.drawImage(secondToLastDrawing, 0, 0, this.canvas.width, this.canvas.height, 0, 0, this.canvas.width, this.canvas.height);
                // }


                const brushWidth = document.getElementById("brush-size");
                let newImg = new Image();
                // get svg data
                let xml = new XMLSerializer().serializeToString(svg);

                // make it base64
                var svg64 = btoa(xml);
                var b64Start = 'data:image/svg+xml;base64,';

                // prepend a "header"
                var image64 = b64Start + svg64;
                // debugger

                // set it as the source of the newImg element
                newImg.src = image64;

                newImg.onload = () => { 
                    // debugger
                    // this.saveState(); 

                    // this.context.drawImage(newImg, 10, 10);

                    // this.context.drawImage(
                    //     newImg,
                    //     e.offsetX - 25,
                    //     e.offsetY - 25,
                    //     50 * (1/2 * brushWidth.value),
                    //     50 * (1/2 * brushWidth.value)
                    // );

                    this.context.drawImage(newImg, (xAvg - width / 2), (yAvg - height / 2), width, height);

                    this.shapes = [];
                    debugger
                    // this.saveState(); 
                    // this.download();
                };

                // newImg.onload = () => {
                //     this.context.drawImage(newImg, (xAvg - weight / 2), (yAvg - height / 2), 200, 200)
                // }


                // this.saveState();   

                // image.parentNode.replaceChild(svg, image);
            });
            ///////////

            // this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            // image.onload = () => { 
                
            // debugger
            //     this.context.drawImage(
            //     image, 
            //     e.offsetX - 25,
            //     e.offsetY - 25,
            //     // 50 * (1 / 2 * this.context.lineWidth),
            //     // 50 * (1 / 2 * this.context.lineWidth));
            //     50 * (1 / 2 * 10),
            //     50 * (1 / 2 * 10));
            // debugger
            // }
        // } catch {
        //     console.log("sugesstions are not completed.")
        // }        
    }
    ///////

    saveState(list, keepRedo) {
        keepRedo = keepRedo || false;
        if (!keepRedo) {
            this.redoList = [];
        }

        (list || this.undoList).push(this.canvas.toDataURL());
    }

    restoreState(popList, pushList) {
        if (popList.length) {
            this.saveState(pushList, true);
            let ele = popList.pop();
            // let img = new Element('img', { 'src': ele });
            let img = document.createElement('img');
            img.src = ele;
            img.crossOrigin = "Anonymous"

            img.onload = () => {
                // this.clear();
                this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.context.drawImage(img, 0, 0, this.canvas.width, this.canvas.height, 0, 0, this.canvas.width, this.canvas.height);
            }
        }
    }

    undo() { 
        this.restoreState(this.undoList, this.redoList);
    }

    redo() { 
        this.restoreState(this.redoList, this.undoList);
    }

    putPoint(e) {
        const brushWidth = document.getElementById("brush-size");
        // current collor goes here
        // const uploadIcon = document.getElementById("upload-icon");
        // const brushIcon = document.getElementById("brush-icon");

        this.determineCurrentBrush();

        if(this.dragging) {
            this.context.lineWidth = brushWidth.value;
            // this.context.strokeStyle = "#58d33a";
            this.context.strokeStyle = this.tool.colorPicker.selectedColor;

            if( this.currentBrush === "regular") {
                this.context.lineCap = "round";
                this.context.lineTo(e.offsetX, e.offsetY);
                this.context.stroke(); // nothing will show untill we do stroke() or fill()
                this.context.beginPath(); 
                this.context.moveTo(e.offsetX, e.offsetY); // sets an active point
            } else if (this.currentBrush === "image"){ // current brush is "image"
                this.context.drawImage(
                    this.tool.imageUpload.currentImg,
                    e.offsetX - 15,
                    e.offsetY - 15,
                    5 * brushWidth.value,
                    5 * brushWidth.value
                );
            } else if (this.currentBrush === "eraser") {
                // debugger
                this.context.strokeStyle = "white";
                this.context.lineCap = "round";
                this.context.lineTo(e.offsetX, e.offsetY);
                this.context.stroke(); // nothing will show untill we do stroke() or fill()
                this.context.beginPath();
                this.context.moveTo(e.offsetX, e.offsetY); // sets an active point
            }

            // if (this.tool.imageUpload.currentImg) {
            //     debugger
            //     this.context.drawImage(
            //         this.tool.imageUpload.currentImg,
            //         e.offsetX - 25,
            //         e.offsetY - 25,
            //         50 * (1 / 2 * brushWidth.value),
            //         50 * (1 / 2 * brushWidth.value)
            //     );
            // } else {
            //     this.context.lineTo(e.offsetX, e.offsetY);
            //     this.context.stroke(); // nothing will show untill we do stroke() or fill()
            //     this.context.beginPath(); 
            //     this.context.moveTo(e.offsetX, e.offsetY); // sets an active point
            // }

            // save the coords to the current shape
            // this.storeCoordinates(e.clientX - this.offsetX, e.clientY - this.offsetY, Date.now() - this.pressedAt);
            let mouseX = parseInt(e.clientX - this.offsetX);
            let mouseY = parseInt(e.clientY - this.offsetY);
            this.storeCoordinates(mouseX, mouseY, Date.now() - this.pressedAt);
        }
    }

    engage(e) {
        this.saveState();
        this.dragging = true;
        this.predict = true;
        this.prepareNewShape();
        this.pressedAt = Date.now();
        this.putPoint(e);  
    }

    disengage(e) {
        this.dragging = false;
        this.context.beginPath(); // clears any current path 
        this.commitCurrentShape();
        this.loadSuggestionsFromAPI(this.shapes);
    }

    colorFill() {
        this.saveState();
        this.context.fillStyle = this.tool.colorPicker.selectedColor;
        this.context.fillRect(0, 0, canvas.width, canvas.height);
        // this.saveState();
    }

    clear(e) {
        this.context.clearRect(
            0,
            0,
            this.context.canvas.width,
            this.context.canvas.height
        );
        this.context.fillStyle = "white";
        this.context.fillRect(0, 0, canvas.width, canvas.height);

        this.shapes = [];
        this.undoList = [];
        this.redoList = [];
        // this.drawSuggestions.innerHTML = '';

        document.getElementById("draw-suggestions").innerHTML = "";
        // this.suggestionsCompleted = true;
    }

    download(e) {
        const canvaschik = this.canvas.toDataURL(); // default png
        const link = document.createElement('a');
        link.setAttribute('download', 'drawy.png');
        link.setAttribute('href', canvaschik);
        link.click();
    }
}