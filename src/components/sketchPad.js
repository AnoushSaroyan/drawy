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

        // list for undo and redo 
        this.undoList = [];
        this.redoList = [];

        this.dragging = false; // indicates if the mouse is held down

        this.putPoint = this.putPoint.bind(this);
        this.engage = this.engage.bind(this);
        this.disengage = this.disengage.bind(this);
        this.clear = this.clear.bind(this);
        this.colorFill = this.colorFill.bind(this);
        this.undo = this.undo.bind(this);
        this.redo = this.redo.bind(this);
        this.saveState = this.saveState.bind(this);
        this.restoreState = this.restoreState.bind(this);

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
    }

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

            img.onload = () => {
                this.clear()
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
            this.context.strokeStyle = "#58d33a";
            // this.context.strokeStyle = this.tool.colorPicker.selectColor;
            this.context.lineCap = "round";

            this.context.lineTo(e.offsetX, e.offsetY);
            this.context.stroke(); // nothing will show untill we do stroke() or fill()
            this.context.beginPath(); 
            this.context.moveTo(e.offsetX, e.offsetY); // sets an active point
        }
    }

    engage(e) {
        this.saveState();
        this.dragging = true;
        this.putPoint(e);  
    }

    disengage(e) {
        this.dragging = false;
        this.context.beginPath(); // clears any current path
        
    }

    colorFill() {
        this.context.fillStyle = this.context.strokeStyle;
        this.context.fillRect(0, 0, canvas.width, canvas.height);
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
    }


    // this.points.push({
        //     // x: this.mouseX,
        //     // y: this.mouseY,
        //     x: e.offsetX,
        //     y: e.offsetY,
        //     size: this.context.lineWidth,
        //     color: this.context.strokeStyle,
        //     mode: "end"
        // });

     // this.points.push({
        //     // x: this.mouseX,
        //     // y: this.mouseY,
        //     x: e.offsetX,
        //     y: e.offsetY,
        //     size: this.context.lineWidth,
        //     color: this.context.strokeStyle,
        //     mode: "begin"
        // });

        // this.lastX = this.mouseX;
        // this.lastY = this.mouseY;

    // this.interval;
        // this.undoBtn.addEventListener("mousedown", () => {
        //     this.interval = setInterval(this.undoLast, 40);
        // });
        // this.undoBtn.addEventListener("mouseup", () => {
        //     clearInterval(this.interval);
        // });
    // redrawAll() {
    //     if (this.points.length === 0) {
    //         return;
    //     }

    //     // this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    //     this.clear();

    //     for (let i = 0; i < this.points.length; i++) {
    //         let point = this.points[i];
    //         let begin = false;
    //         if (this.context.lineWidth != point.size) {
    //             this.context.lineWidth = point.size;
    //             begin = true;
    //         }
    //         if (this.context.strokeStyle != point.color) {
    //             this.context.strokeStyle = point.color;
    //             begin = true;
    //         }
    //         if (point.mode == "begin" || begin) {
    //             this.context.beginPath();
    //             this.context.moveTo(point.x, point.y);
    //         }
    //         this.context.lineTo(point.x, point.y);
    //         if (point.mode == "end" || (i == this.points.length - 1)) {
    //             this.context.stroke();
    //         }
    //     }
    //     this.context.stroke();
    // }

    // undoLast() {
    //     this.points.pop();
    //     // debugger
    //     this.redrawAll();
    // }

    // setBackground() {
    //     const background = new Image();
    //     background.src = "/dist/images/sketchpad.jpg";

    //     background.onload = () => {
    //         this.context.drawImage(
    //             background,
    //             0,
    //             0,
    //             this.canvas.width,
    //             this.canvas.height
    //         );
    //     };
    // }
}