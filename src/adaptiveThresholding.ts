import { twoLong } from "./FixedArrayLength.interface";
import { ImageTable } from "./ImageTable";
import { IntegralImage } from "./IntegralImage";

export class AdaptiveThresholding extends IntegralImage {
  binaryImg: ImageTable;
  constructor(image: number[][] | ImageTable) {
    super(image);
    // Erstellt gleich das Integralbild
    this.convert();
    this.binaryImg = new ImageTable([this.img.width, this.img.height]);
  }

  adaptiveThresholding(windowSize: number, c: number): ImageTable {
    let midSize = Math.floor(windowSize / 2);
    for (let i = 0; i < this.img.width; i++) {
      for (let j = 0; j < this.img.height; j++) {
        const a: twoLong = [i - midSize, j - midSize];
        const b: twoLong = [i + midSize, j + midSize];

        // windowSiz * windowSize
        const count = (b[0] - a[0]) * (b[1] - a[1]);
        const sum = this.getFromAToB(a, b);
        console.log(a, b, sum);
        if (this.img.getPixelAt(i, j) * count <= (sum * (100 - c)) / 100) {
          this.binaryImg.setPixelAt(i, j, 0);
        } else {
          this.binaryImg.setPixelAt(i, j, 1);
        }
      }
    }
    return this.binaryImg;
  }

  grayscale(data: ImageData) {
    let x = new ImageTable([data.width / 4, data.height / 4]);
    const pixels = data.data;
    for (let i = 0; i < pixels.length; i += 4) {
      const lightness =
        pixels[i] * 0.299 + pixels[i + 1] * 0.587 + pixels[i + 2] * 0.114;

      x.setPixelAt(i % data.width, Math.floor(i / data.height), lightness);
    }
    return x;
  }
}
