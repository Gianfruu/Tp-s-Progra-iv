"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cuadrado = void 0;
var figuragemotrica_1 = require("./figuragemotrica");
var Cuadrado = /** @class */ (function (_super) {
    __extends(Cuadrado, _super);
    function Cuadrado(lado) {
        var _this = _super.call(this, "cuadrado") || this; //le dice a figurageometrica el nombre de esta subclase
        _this.lado = lado;
        return _this;
    }
    Cuadrado.prototype.calcularArea = function () {
        return this.lado * this.lado;
    };
    return Cuadrado;
}(figuragemotrica_1.FiguraGeometrica));
exports.Cuadrado = Cuadrado;
