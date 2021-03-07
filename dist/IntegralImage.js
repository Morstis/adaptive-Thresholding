"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntegralImage = void 0;
var ImageTable_1 = require("./ImageTable");
var IntegralImage = /** @class */ (function () {
    function IntegralImage(image) {
        if (image instanceof ImageTable_1.ImageTable) {
            // ImageTable
            this.img = image;
        }
        else {
            // number[][]
            this.img = new ImageTable_1.ImageTable(image);
        }
    }
    IntegralImage.prototype.getFrom0ToBSlow = function (b) {
        if (b[0] < 0 || b[1] < 0) {
            return 0;
        }
        return (this.img.getPixelAt([b[0], b[1]]) +
            this.getFrom0ToBSlow([b[0] - 1, b[1]]) +
            this.getFrom0ToBSlow([b[0], b[1] - 1]) -
            this.getFrom0ToBSlow([b[0] - 1, b[1] - 1]));
    };
    IntegralImage.prototype.getFromAToB = function (a, b) {
        var aA, bA, cA, dA;
        if (this.intImg === undefined) {
            console.warn("Langsame Methode gew\u00E4hlt. F\u00FChre convert() aus, bevor du etwas mit dem Bild machst!\nUm es in ein Integralbild zu verwandeln. Jetzt werden die Integrale vier Mal einzeln berechnet!");
            aA = this.getFrom0ToBSlow([b[0], b[1]]);
            bA = this.getFrom0ToBSlow([b[0], a[1] - 1]);
            cA = this.getFrom0ToBSlow([a[0] - 1, b[1]]);
            dA = this.getFrom0ToBSlow([a[0], a[1] - 1]);
        }
        else {
            aA = this.intImg.getPixelAt(b[0], b[1]);
            bA = this.intImg.getPixelAt(b[0], a[1] - 1);
            cA = this.intImg.getPixelAt(a[0] - 1, b[1]);
            dA = this.intImg.getPixelAt(a[0], a[1] - 1);
        }
        return aA - bA - cA + dA;
    };
    IntegralImage.prototype.convert = function () {
        this.intImg = new ImageTable_1.ImageTable([this.img.width, this.img.height]);
        for (var i = 0; i < this.img.width; i++) {
            var sum = 0;
            for (var j = 0; j < this.img.height; j++) {
                sum = sum + this.img.getPixelAt(i, j);
                if (i === 0) {
                    this.intImg.setPixelAt(i, j, sum);
                }
                else {
                    this.intImg.setPixelAt(i, j, this.intImg.getPixelAt(i - 1, j) + sum);
                }
            }
        }
    };
    return IntegralImage;
}());
exports.IntegralImage = IntegralImage;
