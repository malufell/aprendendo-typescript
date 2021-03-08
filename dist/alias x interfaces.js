"use strict";
//==================definição==================
;
//não posso incluir tipos primitivos na interface
//==================implements==================
//type alias
var CreateGameT = /** @class */ (function () {
    function CreateGameT() {
    }
    return CreateGameT;
}());
//interface
var CreateGame2 = /** @class */ (function () {
    function CreateGame2() {
    }
    return CreateGame2;
}());
[1, 2, 3, "texto"];
[1, 2];
var $ = {
    a: 'foo',
    b: 'bar'
};
//isso pode ser uma vantagem que impede a criação de types duplicados que poderiam confundir e criar problemas no escopo
