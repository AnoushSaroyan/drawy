import SketchPad from "./components/sketchPad";
import ColorPicker from "./components/colorPicker";
import ImageUpload from "./components/imageUpload";
import Tool from "./components/tool";

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    canvas.setAttribute('width', 750);
    canvas.setAttribute('height', 600);
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
    // Get a reference to the image element
    // let elephant = document.getElementById("elephant");

    // // Take action when the image has loaded
    // elephant.addEventListener("load", function () {
    //     // let imgCanvas = document.getElementById("canvas");
    //     // let imgContext = imgCanvas.getContext("2d");

    //     // // Make sure canvas is as big as the picture
    //     // canvas.width = elephant.width;
    //     // canvas.height = elephant.height;

    //     // Draw image into canvas element
    //     context.drawImage(elephant, 0, 0, elephant.width, elephant.height);

    //     // Get canvas contents as a data URL
    //     let imgAsDataURL = canvas.toDataURL("image/png");

    //     // Save image into localStorage
    //     try {
    //         localStorage.setItem("elephant", imgAsDataURL);
    //     }
    //     catch (e) {
    //         console.log("Storage failed: " + e);
    //     }
    // }, false); 

    // tools goes here, and then will pass it as a second arg to the cnavas
    const colorPicker = new ColorPicker();
    const imageUpload = new ImageUpload();
    const tool = new Tool(colorPicker, imageUpload);
    new SketchPad(canvas, tool);
});