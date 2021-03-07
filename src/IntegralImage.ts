import { ImageTable } from "./ImageTable";
interface FixedLengthArray<T extends any, L extends number> extends Array<T> {
  0: T;
  length: L;
}
export class IntegralImage {
  img: ImageTable;
  intImg: ImageTable | undefined;

  constructor(image: number[][] | ImageTable) {
    if (image instanceof ImageTable) {
      // ImageTable
      this.img = image;
    } else {
      // number[][]
      this.img = new ImageTable(image);
    }
  }

  getFrom0ToBSlow(b: FixedLengthArray<number, 2>): number {
    if (b[0] < 0 || b[1] < 0) {
      return 0;
    }
    return (
      this.img.getPixelAt([b[0], b[1]]) +
      this.getFrom0ToBSlow([b[0] - 1, b[1]]) +
      this.getFrom0ToBSlow([b[0], b[1] - 1]) -
      this.getFrom0ToBSlow([b[0] - 1, b[1] - 1])
    );
  }

  getFromAToB(a: FixedLengthArray<number, 2>, b: FixedLengthArray<number, 2>) {
    let aA, bA, cA, dA;
    if (this.intImg === undefined) {
      console.warn(
        `Langsame Methode gewählt. Führe convert() aus, bevor du etwas mit dem Bild machst!\nUm es in ein Integralbild zu verwandeln. Jetzt werden die Integrale vier Mal einzeln berechnet!`
      );

      aA = this.getFrom0ToBSlow([b[0], b[1]]);
      bA = this.getFrom0ToBSlow([b[0], a[1] - 1]);
      cA = this.getFrom0ToBSlow([a[0] - 1, b[1]]);
      dA = this.getFrom0ToBSlow([a[0], a[1] - 1]);
    } else {
      aA = this.intImg.getPixelAt(b[0], b[1]);
      bA = this.intImg.getPixelAt(b[0], a[1] - 1);
      cA = this.intImg.getPixelAt(a[0] - 1, b[1]);
      dA = this.intImg.getPixelAt(a[0], a[1] - 1);
    }

    return aA - bA - cA + dA;
  }

  convert(): void {
    this.intImg = new ImageTable([this.img.width, this.img.height]);

    for (let i = 0; i < this.img.width; i++) {
      let sum = 0;
      for (let j = 0; j < this.img.height; j++) {
        sum = sum + this.img.getPixelAt(i, j);
        if (i === 0) {
          this.intImg.setPixelAt(i, j, sum);
        } else {
          this.intImg.setPixelAt(i, j, this.intImg.getPixelAt(i - 1, j) + sum);
        }
      }
    }
  }
}
