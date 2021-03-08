interface Game {
    title: string;
    readonly description: string;
    genre: string;
    plataform?: string[];
    getSimilars?: (title: string) => void;
}

const crash: Game = {
    title: "Crash",
    description: "Qualquer descrição",
    genre: "Aventura",
    plataform: ["ps1, ps2"],
    getSimilars: (title: string) => {
        console.log(`jogos similares a ${title}: outro jogo 1, outro jogo 2`)
    }
}

interface Extensao extends Game {
    originalGame: Game;
    newContent: string[];
}

console.log(crash.title)
if(crash.getSimilars) {
    crash.getSimilars(crash.title)
}

const crashAventuras: Extensao = {
    title: "Crash Aventuras",
    description: "Qualquer descrição",
    genre: "Aventura",
    plataform: ["ps1, ps2"],
    originalGame: crash,
    newContent: ["qualquer coisa 1, qualquer coisa 2"]
} 

class CreateGame implements Game {
    title: string;
    description: string;
    genre: string;

    constructor(t: string, d: string, g: string) {
        this.title = t;
        this.description = d;
        this.genre = g;
    }
}