const _image: number[][] = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16],
];
function I(x: number, y: number): number {
  if (x < 0 || y < 0) {
    return 0;
  }
  return f(x, y, _image) + I(x - 1, y) + I(x, y - 1) - I(x - 1, y - 1);
}

function f(x: number, y: number, image: number[][]) {
  if (x < 0 || y < 0) {
    return 0;
  }
  return image[y][x];
}

console.log(I(1, 2)); // 33

function createInt(img: number[][]): number[][] {
  let intImg: number[][] = [];

  const width = img[1].length;
  const height = img.length;

  for (let i = 0; i < width; i++) {
    intImg[i] = new Array<number>(height);
  }

  for (let i = 0; i < width; i++) {
    let sum = 0;
    for (let j = 0; j < height; j++) {
      sum = sum + f(i, j, img);
      if (i === 0) {
        intImg[j][i] = sum;
      } else {
        intImg[j][i] = f(i - 1, j, intImg) + sum;
      }
    }
  }
  return intImg;
}
const intImg = createInt(_image);
console.log(intImg);
// [
//   [ 1, 3, 6, 10 ],
//   [ 6, 14, 24, 36 ],
//   [ 15, 33, 54, 78 ],
//   [ 28, 60, 96, 136 ]
// ]

function integralFromAtoB(
  a1: number,
  a2: number,
  b1: number,
  b2: number,
  intImg: number[][]
) {
  const aA = f(b1, b2, intImg);
  const bA = f(b1, a2 - 1, intImg);
  const cA = f(a1 - 1, b2, intImg);
  const dA = f(a1, a2 - 1, intImg);

  return aA - bA - cA + dA;
}

console.log(integralFromAtoB(0, 0, 1, 2, intImg)); // 33

console.log(integralFromAtoB(1, 2, 3, 2, intImg)); // 41
