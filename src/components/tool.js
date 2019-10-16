import "./brushPicker";
import "./colorPicker";

export default class Tool {
    constructor(colorPicker, BrushPicker) {
        this.colorPicker = colorPicker;
        this.BrushPicker = BrushPicker;
    }
}