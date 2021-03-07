"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IntegralImage_1 = require("./IntegralImage");
var image = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16],
];
var intImg = new IntegralImage_1.IntegralImage(image);
console.log(intImg.getFrom0ToBSlow([3, 2]));
intImg.convert();
console.log(intImg.getFromAToB([0, 0], [3, 2]));
