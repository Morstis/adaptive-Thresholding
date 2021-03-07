export class ImageTable {
  constructor();
  constructor(input: number[][]);
  /**
   *
   * @param size size[0] = imageWidth; size[1] = imageHeight
   */
  constructor(size: number[]);

  constructor(arg?: any) {
    if (arg[0][0] !== undefined) {
      this._image = arg;
    } else {
      for (let i = 0; i < arg[1]; i++) {
        this._image[i] = new Array<number>(arg[0]);
      }
    }
  }
  private _image: number[][] = [];

  get image() {
    return this._image;
  }

  get height() {
    return this._image.length;
  }
  get width() {
    return this._image[0].length;
  }

  getPixelAt(coords: number[]): number;
  getPixelAt(x: number, y: number): number;
  getPixelAt(insert: number[] | number, y?: number) {
    let x;
    if (y !== undefined) {
      x = insert as number;
    } else {
      let ins = insert as number[];
      x = ins[0];
      y = ins[1];
    }
    if (x < 0 || y < 0) {
      return 0;
    }
    return this._image[y][x];
  }
  setPixelAt(x: number, y: number, value: number) {
    this._image[y][x] = value;
  }
}
