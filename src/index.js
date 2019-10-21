import SketchPad from "./components/sketchPad";
import ColorPicker from "./components/colorPicker";
import ImageUpload from "./components/imageUpload";
import Tool from "./components/tool";
// import stencils from "./components/stencils";
// debugger
// window.stencils = stencils;

// var globalScript = {

//     init: function () {
//         /* svg to inline */
//         (function () {
//             $(function () {
//                 var t;
//                 return (t = $('img[src$="svg"]').hide(), t.each(function (t, e) {
//                     var r = this;
//                     return $.get(this.src).success(function (t) {
//                         var e, n, s, i, c, a, u;
//                         for (e = $(t).find("svg"), c = r.attributes, $.extend(c, e[0].attributes), a = 0, u = c.length; u > a; a += 1) {
//                             n = c[a], s = n.nodeName, i = n.nodeValue, "src" !== s && "style" !== s && e.attr(s, i);
//                         }
//                         return $(r).replaceWith(e);
//                     });
//                 }));
//             });
//         }).call(this);

//     }
// }

// $(document).ready(function () {
//     globalScript.init();
// });

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