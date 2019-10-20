import SketchPad from "./components/sketchPad";
import ColorPicker from "./components/colorPicker";
import ImageUpload from "./components/imageUpload";
import Tool from "./components/tool";

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("canvas");
    canvas.setAttribute('width', 700);
    canvas.setAttribute('height', 600);
    // tools goes here, and then will pass it as a second arg to the cnavas
    const colorPicker = new ColorPicker();
    const imageUpload = new ImageUpload();
    const tool = new Tool(colorPicker, imageUpload);
    new SketchPad(canvas, tool);
});