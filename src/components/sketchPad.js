import "../../dist/styles/sketch-pad.scss";

export default class SketchPad {
    constructor(canvas, tools) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        // this.dimensions = { width: canvas.width, height: canvas.height };
        this.setBackground();
        this.dragging = false; // indicates if the mouse is held down
        this.putPoint = this.putPoint.bind(this);
        this.engage = this.engage.bind(this);
        this.disengage = this.disengage.bind(this);
        this.canvas.addEventListener("mousedown", this.engage);
        const html = document.getElementsByTagName("html")[0];
        html.addEventListener("mouseup", this.disengage)
        // this.canvas.addEventListener("mouseup", this.disengage);
        this.canvas.addEventListener("mousemove", this.putPoint);


    }

    putPoint(e) {
        const radius = 10;
        if(this.dragging) {
            this.context.lineWidth = 2*radius;
            this.context.strokeStyle = "#FF0000";
            this.context.lineCap = "round";

            this.context.lineTo(e.offsetX, e.offsetY);
            this.context.stroke(); // nothing will show untill we do stroke() or fill()
            this.context.beginPath();
            // this.context.arc(e.offsetX, e.offsetY, radius, 0, Math.PI*2);
            // this.context.fill();
            // this.context.beginPath();
            this.context.moveTo(e.offsetX, e.offsetY); // sets an active point
        }
    }

    engage(e) {
        this.dragging = true;
        this.putPoint(e);
    }

    disengage() {
        this.dragging = false;
        this.context.beginPath(); // clears any current path
    }

    setBackground() {
        const background = new Image();
        background.src = "/dist/images/sketchpad.jpg";

        background.onload = () => {
            this.context.drawImage(
                background,
                0,
                0,
                this.canvas.width,
                this.canvas.height
            );
        };
    }
}