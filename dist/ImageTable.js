"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageTable = void 0;
var ImageTable = /** @class */ (function () {
    function ImageTable(arg) {
        this._image = [];
        if (arg[0][0] !== undefined) {
            this._image = arg;
        }
        else {
            for (var i = 0; i < arg[1]; i++) {
                this._image[i] = new Array(arg[0]);
            }
        }
    }
    Object.defineProperty(ImageTable.prototype, "image", {
        get: function () {
            return this._image;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ImageTable.prototype, "height", {
        get: function () {
            return this._image.length;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ImageTable.prototype, "width", {
        get: function () {
            return this._image[0].length;
        },
        enumerable: false,
        configurable: true
    });
    ImageTable.prototype.getPixelAt = function (insert, y) {
        if (y !== undefined) {
            if (insert < 0 || y < 0) {
                return 0;
            }
            return this._image[y][insert];
        }
        else {
            var ins = insert;
            if (ins[0] < 0 || ins[1] < 0) {
                return 0;
            }
            return this._image[ins[0]][ins[1]];
        }
    };
    ImageTable.prototype.setPixelAt = function (x, y, value) {
        this._image[y][x] = value;
    };
    return ImageTable;
}());
exports.ImageTable = ImageTable;
