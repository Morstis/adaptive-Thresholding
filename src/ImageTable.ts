export class ImageTable {
  constructor();
  constructor(input: number[][]);
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
    if (y !== undefined) {
      if (insert < 0 || y < 0) {
        return 0;
      }
      return this._image[y][insert as number];
    } else {
      let ins = insert as number[];
      if (ins[0] < 0 || ins[1] < 0) {
        return 0;
      }
      return this._image[ins[0]][ins[1]];
    }
  }
  setPixelAt(x: number, y: number, value: number) {
    this._image[y][x] = value;
  }
}
