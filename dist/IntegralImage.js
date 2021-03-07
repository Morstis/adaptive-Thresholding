"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntegralImage = void 0;
var ImageTable_1 = require("./ImageTable");
var IntegralImage = /** @class */ (function () {
    /**
     * Speichert eine neue Image Tabelle mit Werten in this.img
     * @param image Entweder eine zweidimensionales number Array oder gleich eine Image Tabelle
     */
    function IntegralImage(image) {
        if (image instanceof ImageTable_1.ImageTable) {
            // ImageTable
            this.img = image;
        }
        else {
            // number[][]
            this.img = new ImageTable_1.ImageTable(image);
        }
    }
    /**
     * Rechnet mit I(x, y) = f(x, y) + I(x - 1, y) + I(x, y - 1) - I(x - 1, y - 1); dem Algorithmus
     * alle Werte des Rechteckes von (0|0) bis zu Punkt b aus.
     * Der Algorithmus sollte nicht bei einer Berechnung weiterer Werte benutzt werden. Da dadurch Rechenoperationen wiederholt werden.
     * Effektiver ist eine Berechnung der ganzen Integraltabelle {@link convert()} und dann die Berechnung
     * der einzelnen Werte über {@link getFromAToB()}. Wenn von (0|0) aus berechnet werden soll muss für Punkt a [0, 0] angegeben werden.
     * @param b Ein number Array, das maximal zwei Einträge haben kann. b[0] ist die x-Coordinate, b[1] die y-Coordinate.
     */
    IntegralImage.prototype.getFrom0ToBSlow = function (b) {
        // Exit für die Rekursion
        if (b[0] < 0 || b[1] < 0) {
            return 0;
        }
        return (this.img.getPixelAt([b[0], b[1]]) +
            this.getFrom0ToBSlow([b[0] - 1, b[1]]) +
            this.getFrom0ToBSlow([b[0], b[1] - 1]) -
            this.getFrom0ToBSlow([b[0] - 1, b[1] - 1]));
    };
    /**
     * Berechnet den Wert einer bestimmten rechteckigen Fläche zwischen a und b. Verwendet folgenden Algorithmus:
     * F(a1, a2, b1, b2) = f(b1, b2) - f(b1, a2 - 1) - f(a1 - 1, b2) + f(a1, a2 - 1)
     * Wenn this.intImg noch nicht über {@link convert()} erstellt wurden ist wird der Fallback {@link getFrom0ToBSlow()}
     * benutzt. Dieser ist jedoch maximal langsam. Und es würden die gesamten Vorteile des Integralbildes verloren gehen.
     *
     * @param a Der erste Punkt des Bereiches, angegeben als ein number Array, das maximal zwei Einträge haben kann. a[0] ist die x-Coordinate, a[1] die y-Coordinate.
     * @param b Der zweite Punkt des Bereiches, angegeben als ein number Array, das maximal zwei Einträge haben kann. b[0] ist die x-Coordinate, b[1] die y-Coordinate.
     */
    IntegralImage.prototype.getFromAToB = function (a, b) {
        if (a[0] < 0) {
            a[0] = 0;
        }
        if (a[1] < 0) {
            a[1] = 0;
        }
        if (b[0] > this.img.width - 1) {
            b[0] = this.img.width - 1;
        }
        if (b[1] > this.img.width - 1) {
            b[1] = this.img.width - 1;
        }
        var aA, bA, cA, dA;
        if (this.intImg === undefined) {
            console.warn("Langsame Methode gewählt. Führe convert() aus, bevor du etwas mit dem Bild machst!\nUm es in ein Integralbild zu verwandeln. Jetzt werden die Integrale vier Mal einzeln berechnet!");
            aA = this.getFrom0ToBSlow([b[0], b[1]]);
            bA = this.getFrom0ToBSlow([b[0], a[1] - 1]);
            cA = this.getFrom0ToBSlow([a[0] - 1, b[1]]);
            dA = this.getFrom0ToBSlow([a[0], a[1] - 1]);
        }
        else {
            aA = this.intImg.getPixelAt(b[0], b[1]);
            bA = this.intImg.getPixelAt(b[0], a[1] - 1);
            cA = this.intImg.getPixelAt(a[0] - 1, b[1]);
            dA = this.intImg.getPixelAt(a[0], a[1] - 1);
        }
        return aA - bA - cA + dA;
    };
    /**
     * Berechnet die Integraltabelle und speichert sie in this.intImg.
     * Dafür wird über die Breite des Arrays geschleift und in jedem Durchgang über die Höhe. Jeder Pixel wird zu der Summe
     * der vorherigen Pixel in der Spalte plus den Pixel zu seiner Linkes des schon erstellten
     * Integralbildes addiert. Wenn keine Pixel links vorhanden sind, ist i = 0 und es werden keine Pixel von Links addiert.
     */
    IntegralImage.prototype.convert = function () {
        this.intImg = new ImageTable_1.ImageTable([this.img.width, this.img.height]);
        for (var i = 0; i < this.img.width; i++) {
            var sum = 0;
            for (var j = 0; j < this.img.height; j++) {
                sum = sum + this.img.getPixelAt(i, j);
                if (i === 0) {
                    this.intImg.setPixelAt(i, j, sum);
                }
                else {
                    this.intImg.setPixelAt(i, j, this.intImg.getPixelAt(i - 1, j) + sum);
                }
            }
        }
    };
    return IntegralImage;
}());
exports.IntegralImage = IntegralImage;
