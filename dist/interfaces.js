"use strict";
var crash = {
    title: "Crash",
    description: "Qualquer descrição",
    genre: "Aventura",
    plataform: ["ps1, ps2"],
    getSimilars: function (title) {
        console.log("jogos similares a " + title + ": outro jogo 1, outro jogo 2");
    }
};
console.log(crash.title);
if (crash.getSimilars) {
    crash.getSimilars(crash.title);
}
var crashAventuras = {
    title: "Crash Aventuras",
    description: "Qualquer descrição",
    genre: "Aventura",
    plataform: ["ps1, ps2"],
    originalGame: crash,
    newContent: ["qualquer coisa 1, qualquer coisa 2"]
};
var CreateGame = /** @class */ (function () {
    function CreateGame(t, d, g) {
        this.title = t;
        this.description = d;
        this.genre = g;
    }
    return CreateGame;
}());
