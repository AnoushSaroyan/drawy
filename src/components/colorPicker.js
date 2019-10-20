export default class ColorPicker {
    constructor() {
        this.colorStrip = document.getElementById('color-strip');
        this.colorctx = this.colorStrip.getContext('2d');

        // label to keep a track of the current color
        this.colorLabel = document.getElementById('color-label');

        this.x = 0;
        this.y = 0;
        this.dragging = false;
        this.selectedColor = "#58d33a";

        this.colorPalette();

        this.mousedown = this.mousedown.bind(this);
        // this.mousemove = this.mousemove.bind(this);
        this.mouseup = this.mouseup.bind(this);
        this.changeColor = this.changeColor.bind(this);

        // events
        this.colorStrip.addEventListener("mousedown", this.mousedown);
        this.colorStrip.addEventListener("mouseup", this.mouseup);
        // this.colorStrip.addEventListener("mousemove", this.mousemove);
    }

    colorPalette() {
        this.colorctx.rect(0, 0, this.colorStrip.width, this.colorStrip.height);
        let gradient = this.colorctx.createLinearGradient(0, 0, this.colorStrip.width, 0);
        gradient.addColorStop(0, 'rgba(255, 0, 0, 1)');
        gradient.addColorStop(0.17, 'rgba(255, 255, 0, 1)');
        gradient.addColorStop(0.34, 'rgba(0, 255, 0, 1)');
        gradient.addColorStop(0.51, 'rgba(0, 255, 255, 1)');
        gradient.addColorStop(0.68, 'rgba(0, 0, 255, 1)');
        gradient.addColorStop(0.85, 'rgba(255, 0, 255, 1)');
        gradient.addColorStop(1, 'rgba(255, 0, 0, 1)');

        // gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
        // gradient.addColorStop(0.5, "rgba(255, 255, 255, 0)");
        // gradient.addColorStop(0.5, "rgba(0,     0,   0, 0)");
        // gradient.addColorStop(1, "rgba(0,     0,   0, 1)");
        this.colorctx.fillStyle = gradient;
        this.colorctx.fill();

        gradient = this.colorctx.createLinearGradient(0, 0, 0, this.colorStrip.height);

        // gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
        // gradient.addColorStop(0.5, "rgba(255, 255, 255, 0)");
        // gradient.addColorStop(0.5, "rgba(0,     0,   0, 0)");
        // gradient.addColorStop(1, "rgba(0,     0,   0, 1)");

        // this.colorctx.fillStyle = gradient;
        // this.colorctx.fillRect(0, 0, this.colorctx.canvas.width, this.colorctx.canvas.height);
    }

    mousedown(e) {
        this.dragging = true;
        this.changeColor(e);
    }

    // mousemove(e) {
    //     if (this.dragging ) {
    //     this.changeColor(e);
    //     }
    // }

    mouseup(e) {
        this.dragging  = false;
    }

    changeColor(e) {
        this.x = e.offsetX;
        this.y = e.offsetY;
        let imageData = this.colorctx.getImageData(this.x, this.y, 1, 1);
        // debugger
        this.selectedColor = 'rgba(' + imageData.data[0] + ',' + imageData.data[1] + ',' + imageData.data[2] + ',1)';
        // rgba(255, 0, 0, 1)
        this.colorLabel.style.backgroundColor = this.selectedColor;
        document.getElementById("logo").setAttribute("style", `text-shadow: 1px 1px 5px ${this.selectedColor}`)
    }
}


