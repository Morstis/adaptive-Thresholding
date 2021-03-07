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
console.log(intImg.intImg);
console.log(intImg.getFrom0ToBSlow([3, 2]));
console.log(intImg.getFromAToB([0, 0], [3, 2]));
