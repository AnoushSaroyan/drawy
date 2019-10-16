export default class ColorPicker {
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