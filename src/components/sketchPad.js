const API_ENDPOINT = 'https://inputtools.google.com/request?ime=handwriting&app=autodraw&dbg=1&cs=1&oe=UTF-8';
const STENCILS_ENDPOINT = 'src/data/stencils.json';
const stencils = require("../data/stencils.json");

export default class SketchPad {
    constructor(canvas, tool) {
        
        this.canvas = canvas;
        this.tool = tool;
        this.context = canvas.getContext("2d");

        // set the background to white
        this.context.fillStyle = "white";
        this.context.fillRect(0, 0, canvas.width, canvas.height);

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

        // list for undo and redo 
        this.undoList = [];
        this.redoList = [];

        // shapes
        this.currentShape;
        this.shapes = [];

        // start time 
        this.pressedAt = 0;

        // stencils 
        this.stencils = stencils;

        this.dragging = false; // indicates if the mouse is held down
        this.loadStencils();
        this.prepareNewShape(); 

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
        this.drawSuggestions.addEventListener("click", this.pickSuggestion);
    }

    loadStencils() {
        // debugger
        // this.Http.get(STENCILS_ENDPOINT).subscribe(response => this.stencils = response.json());
    }

    displaySuggestions(iconList) {
        this.drawSuggestions.innerHTML = '';

        iconList.forEach(icon => {
            // debugger
            if (icon in this.stencils) {
                // each icon has different versions of drawing
                this.stencils[icon].forEach(type => {
                    // debugger
                    // let img = new Image();
                    // img.crossOrigin = "Anonymous"
                    // img.src = type.src;
                    this.drawSuggestions.innerHTML += '<img src="' + type.src + '" crossOrigin="Anonymous" />';
                });
            }

            // debugger
        });
    }

    loadSuggestionsFromAPI(shapes) {
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

    pickSuggestion(e) {
        try { 
            // debugger
            // this.clear();
            let xMax = this.canvas.width;
            let yMax = this.canvas.height;

            let xAv = (Math.max.apply(null, this.shapes[0]) + Math.min.apply(null, this.shapes[0])) / 2;
            let yAv = (Math.max.apply(null, this.shapes[1]) + Math.min.apply(null, this.shapes[1])) / 2;

            let w = 200;
            let h = 200;

            let image = new Image();
            image.crossOrigin = "Anonymous";
            image.src = e.target.src;
            image.setAttribute('style', "width: 50px; height:50px;");
            // image.setAttribute('height', 50);

            // this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            image.backgroundColor = 'transparent';
            image.onload = () => this.context.drawImage(
                image, 
                e.offsetX - 25,
                e.offsetY - 25,
                50 * (1 / 2 * this.context.lineWidth),
                50 * (1 / 2 * this.context.lineWidth));


        } catch {
            console.log("sugesstions are not completed.")
        }        
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

        if(this.dragging) {
            this.context.lineWidth = brushWidth.value;
            // this.context.strokeStyle = "#58d33a";
            this.context.strokeStyle = this.tool.colorPicker.selectedColor;
            this.context.lineCap = "round";

            if (this.tool.imageUpload.currentImg) {
                this.context.drawImage(
                    this.tool.imageUpload.currentImg,
                    e.offsetX - 25,
                    e.offsetY - 25,
                    50 * (1 / 2 * brushWidth.value),
                    50 * (1 / 2 * brushWidth.value)
                );
            } else {
                this.context.lineTo(e.offsetX, e.offsetY);
                this.context.stroke(); // nothing will show untill we do stroke() or fill()
                this.context.beginPath(); 
                this.context.moveTo(e.offsetX, e.offsetY); // sets an active point
            }

            // save the coords to the current shape
            this.storeCoordinates(e.offsetX, e.offsetY, Date.now() - this.pressedAt);
        }
    }

    engage(e) {
        this.saveState();
        this.dragging = true;
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
        this.drawSuggestions.innerHTML = '';

        document.getElementById("draw-suggestions").innerHTML = "";
        // this.suggestionsCompleted = true;
    }
}