"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var adaptiveThresholding_1 = require("./adaptiveThresholding");
var IntegralImage_1 = require("./IntegralImage");
var image = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16],
];
var intImg = new IntegralImage_1.IntegralImage(image);
intImg.convert();
// console.log(intImg.intImg);
// console.log(intImg.getFrom0ToBSlow([3, 2]));
console.log(intImg.getFromAToB([-1, 2], [1, 4]));
var ad = new adaptiveThresholding_1.AdaptiveThresholding(image);
console.log(ad.adaptiveThresholding(2, 15));
// const img = new Image();
//     img.src = image;
//     img.onload = () => {
//       const canvas = document.createElement('canvas');
//       const context = canvas.getContext('2d');
//       canvas.width = img.width;
//       canvas.height = img.height;
//       context.drawImage(img, 0, 0, img.width, img.height);
//       const data = context.getImageData(0, 0, img.width, img.height);
//     }
