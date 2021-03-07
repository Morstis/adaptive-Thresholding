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
        var x;
        if (y !== undefined) {
            x = insert;
        }
        else {
            var ins = insert;
            x = ins[0];
            y = ins[1];
        }
        if (x < 0 || y < 0) {
            return 0;
        }
        return this._image[y][x];
    };
    ImageTable.prototype.setPixelAt = function (x, y, value) {
        this._image[y][x] = value;
    };
    return ImageTable;
}());
exports.ImageTable = ImageTable;
