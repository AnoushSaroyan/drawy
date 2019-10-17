import SketchPad from "./components/sketchPad";
import ColorPicker from "./components/colorPicker";
import Tool from "./components/tool";

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("canvas");
    canvas.setAttribute('width', 800);
    canvas.setAttribute('height', 800);
    // tools goes here, and then will pass it as a second arg to the cnavas
    const colorPicker = new ColorPicker();
    const tool = new Tool(colorPicker);
    new SketchPad(canvas, tool);
});