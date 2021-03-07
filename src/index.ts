import { AdaptiveThresholding } from "./adaptiveThresholding";
import { ImageTable } from "./ImageTable";
import { IntegralImage } from "./IntegralImage";

const image: number[][] = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16],
];

const intImg = new IntegralImage(image);
intImg.convert();
// console.log(intImg.intImg);
// console.log(intImg.getFrom0ToBSlow([3, 2]));
console.log(intImg.getFromAToB([-1, 2], [1, 4]));

const ad = new AdaptiveThresholding(image);
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
