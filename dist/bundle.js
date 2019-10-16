/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/components/colorPicker.js":
/*!***************************************!*\
  !*** ./src/components/colorPicker.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ColorPicker; });
class ColorPicker {
    constructor() {
        // color palette
        

    }
}


// var colorBlock = document.getElementById('color-block');
// var ctx1 = colorBlock.getContext('2d');
// var width1 = colorBlock.width;
// var height1 = colorBlock.height;

// var colorStrip = document.getElementById('color-strip');
// var ctx2 = colorStrip.getContext('2d');
// var width2 = colorStrip.width;
// var height2 = colorStrip.height;

// var colorLabel = document.getElementById('color-label');

// var x = 0;
// var y = 0;
// var drag = false;
// var rgbaColor = 'rgba(255,0,0,1)';

// ctx1.rect(0, 0, width1, height1);
// fillGradient();

// ctx2.rect(0, 0, width2, height2);
// var grd1 = ctx2.createLinearGradient(0, 0, 0, height1);
// grd1.addColorStop(0, 'rgba(255, 0, 0, 1)');
// grd1.addColorStop(0.17, 'rgba(255, 255, 0, 1)');
// grd1.addColorStop(0.34, 'rgba(0, 255, 0, 1)');
// grd1.addColorStop(0.51, 'rgba(0, 255, 255, 1)');
// grd1.addColorStop(0.68, 'rgba(0, 0, 255, 1)');
// grd1.addColorStop(0.85, 'rgba(255, 0, 255, 1)');
// grd1.addColorStop(1, 'rgba(255, 0, 0, 1)');
// ctx2.fillStyle = grd1;
// ctx2.fill();

// function click(e) {
//     x = e.offsetX;
//     y = e.offsetY;
//     var imageData = ctx2.getImageData(x, y, 1, 1).data;
//     rgbaColor = 'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)';
//     fillGradient();
// }

// function fillGradient() {
//     ctx1.fillStyle = rgbaColor;
//     ctx1.fillRect(0, 0, width1, height1);

//     var grdWhite = ctx2.createLinearGradient(0, 0, width1, 0);
//     grdWhite.addColorStop(0, 'rgba(255,255,255,1)');
//     grdWhite.addColorStop(1, 'rgba(255,255,255,0)');
//     ctx1.fillStyle = grdWhite;
//     ctx1.fillRect(0, 0, width1, height1);

//     var grdBlack = ctx2.createLinearGradient(0, 0, 0, height1);
//     grdBlack.addColorStop(0, 'rgba(0,0,0,0)');
//     grdBlack.addColorStop(1, 'rgba(0,0,0,1)');
//     ctx1.fillStyle = grdBlack;
//     ctx1.fillRect(0, 0, width1, height1);
// }

// function mousedown(e) {
//     drag = true;
//     changeColor(e);
// }

// function mousemove(e) {
//     if (drag) {
//         changeColor(e);
//     }
// }

// function mouseup(e) {
//     drag = false;
// }

// function changeColor(e) {
//     x = e.offsetX;
//     y = e.offsetY;
//     var imageData = ctx1.getImageData(x, y, 1, 1).data;
//     rgbaColor = 'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)';
//     colorLabel.style.backgroundColor = rgbaColor;
// }

// colorStrip.addEventListener("click", click, false);

// colorBlock.addEventListener("mousedown", mousedown, false);
// colorBlock.addEventListener("mouseup", mouseup, false);
// colorBlock.addEventListener("mousemove", mousemove, false);


// // // import "../../dist/styles/color-picker.css";

// // export default class ColorPicker {
// //     constructor() {
// //         this.colors = document.getElementById("color-picker");
// //         this.colorctx = this.colors.getContext('2d');
// //         this.selectedColor = "#000000";

// //         this.buildColorPalette();
// //         this.getColor = this.getColor.bind(this);
// //     }

// //     buildColorPalette() {
// //         var gradient = this.colorctx.createLinearGradient(0, 0, this.colors.width, 0);
// //         // Create color gradient
// //         gradient.addColorStop(0, "rgb(255,   0,   0)");
// //         gradient.addColorStop(0.15, "rgb(255,   0, 255)");
// //         gradient.addColorStop(0.33, "rgb(0,     0, 255)");
// //         gradient.addColorStop(0.49, "rgb(0,   255, 255)");
// //         gradient.addColorStop(0.67, "rgb(0,   255,   0)");
// //         gradient.addColorStop(0.84, "rgb(255, 255,   0)");
// //         gradient.addColorStop(1, "rgb(255,   0,   0)");
// //         // Apply gradient to canvas
// //         this.colorctx.fillStyle = gradient;
// //         this.colorctx.fillRect(0, 0, this.colorctx.canvas.width, this.colorctx.canvas.height);

// //         // Create semi transparent gradient (white -> trans. -> black)why jezz?
// //         gradient = this.colorctx.createLinearGradient(0, 0, 0, this.colors.height);
// //         gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
// //         gradient.addColorStop(0.5, "rgba(255, 255, 255, 0)");
// //         gradient.addColorStop(0.5, "rgba(0,     0,   0, 0)");
// //         gradient.addColorStop(1, "rgba(0,     0,   0, 1)");
        
// //         this.colorctx.fillStyle = gradient;
// //         this.colorctx.fillRect(0, 0, this.colorctx.canvas.width, this.colorctx.canvas.height);
// //         // this.colors.mousedown(function (e) {
// //         //     // Track mouse movement on the canvas if the mouse button is down
// //         //     document.mousemove(function (e) {
// //         //         this.colorEventX = e.pageX - ms.colors.offset().left;
// //         //         this.colorEventY = e.pageY - ms.colors.offset().top;
// //         //     });

// //         //     // Get the color at the current mouse coordinates
// //         //     this.colorTimer = setInterval(this.getColor, 50);
// //         // })
// //         //     // On mouseup, clear the interval and unbind the mousemove event,
// //         //     // it should only hthisen if the button is down
// //         //     .mouseup(function (e) {
// //         //         clearInterval(ms.colorTimer);
// //         //         document.unbind('mousemove');
// //         //     });

// //         this.colors.addEventListener("mousedown", () => {
// //             // Track mouse movement on the canvas if the mouse button is down
// //             document.addEventListener("mousemove", function(e) {
// //                 // this.colorEventX = e.pageX - this.colors.offset().left;
// //                 // this.colorEventY = e.pageY - this.colors.offset().top;
// //                 this.colorEventX = e.layerX;
// //                 this.colorEventY = e.layerY;
// //             });

// //             // Get the color at the current mouse coordinates
// //             this.colorTimer = setInterval(this.getColor, 50);
// //         });

// //         // On mouseup, clear the interval and unbind the mousemove event,
// //         // it should only hthisen if the button is down
// //         this.colors.addEventListener("mouseup", function (e) {
// //             clearInterval(this.colorTimer);
// //             document.removeEventListener('mousemove', ()=>{});
// //         });
// //     };

// //     getColor(e) {
// //         const imageData = this.colorctx.getImageData(this.colorEventX, this.colorEventY, 1, 1);
// //         this.selectedColor = 'rgb(' + imageData.data[4] + ', ' + imageData.data[5] + ', ' + imageData.data[6] + ')';
// //     };
// // }

/***/ }),

/***/ "./src/components/sketchPad.js":
/*!*************************************!*\
  !*** ./src/components/sketchPad.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SketchPad; });
class SketchPad {
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

/***/ }),

/***/ "./src/components/tool.js":
/*!********************************!*\
  !*** ./src/components/tool.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Tool; });
/* harmony import */ var _colorPicker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./colorPicker */ "./src/components/colorPicker.js");


class Tool {
    constructor(colorPicker, BrushPicker) {
        this.colorPicker = colorPicker;
    }
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_sketchPad__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/sketchPad */ "./src/components/sketchPad.js");
/* harmony import */ var _components_colorPicker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/colorPicker */ "./src/components/colorPicker.js");
/* harmony import */ var _components_tool__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/tool */ "./src/components/tool.js");




document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("canvas");
    canvas.setAttribute('width', 800);
    canvas.setAttribute('height', 800);
    // tools goes here, and then will pass it as a second arg to the cnavas
    // const colorPicker = new ColorPicker();
    // const tool = new Tool(colorPicker);
    new _components_sketchPad__WEBPACK_IMPORTED_MODULE_0__["default"](canvas) //, tool);
});

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map