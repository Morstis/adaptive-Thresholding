"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdaptiveThresholding = void 0;
var ImageTable_1 = require("./ImageTable");
var IntegralImage_1 = require("./IntegralImage");
var AdaptiveThresholding = /** @class */ (function (_super) {
    __extends(AdaptiveThresholding, _super);
    function AdaptiveThresholding(image) {
        var _this = _super.call(this, image) || this;
        // Erstellt gleich das Integralbild
        _this.convert();
        _this.binaryImg = new ImageTable_1.ImageTable([_this.img.width, _this.img.height]);
        return _this;
    }
    AdaptiveThresholding.prototype.adaptiveThresholding = function (windowSize, c) {
        var midSize = Math.floor(windowSize / 2);
        for (var i = 0; i < this.img.width; i++) {
            for (var j = 0; j < this.img.height; j++) {
                var a = [i - midSize, j - midSize];
                var b = [i + midSize, j + midSize];
                // windowSiz * windowSize
                var count = (b[0] - a[0]) * (b[1] - a[1]);
                var sum = this.getFromAToB(a, b);
                console.log(a, b, sum);
                if (this.img.getPixelAt(i, j) * count <= (sum * (100 - c)) / 100) {
                    this.binaryImg.setPixelAt(i, j, 0);
                }
                else {
                    this.binaryImg.setPixelAt(i, j, 1);
                }
            }
        }
        return this.binaryImg;
    };
    AdaptiveThresholding.prototype.grayscale = function (data) {
        var x = new ImageTable_1.ImageTable([data.width / 4, data.height / 4]);
        var pixels = data.data;
        for (var i = 0; i < pixels.length; i += 4) {
            var lightness = pixels[i] * 0.299 + pixels[i + 1] * 0.587 + pixels[i + 2] * 0.114;
            x.setPixelAt(i % data.width, Math.floor(i / data.height), lightness);
        }
        return x;
    };
    return AdaptiveThresholding;
}(IntegralImage_1.IntegralImage));
exports.AdaptiveThresholding = AdaptiveThresholding;
