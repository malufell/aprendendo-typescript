//==================definição==================

//type Alias
type GameT = {
    title: string;
};

//interface
interface Game {
    title: string;
};

//==================intersection==================

//type Alias
type GameCollectionT = Game & DLCT & { content: boolean };
//posso incluir tipos primitivos no alias

//interface
interface GameCollection extends Game {}
//não posso incluir tipos primitivos na interface

//==================implements==================

//type alias
class CreateGameT implements GameCollectionT {}

//interface
class CreateGame2 implements GameCollection {}

//exatamente igual

//==================declarar função==================

//type Alias
type getSimilarsT = (title: string) => void

//interface
interface getSimilars {
    (title: string): void;
}


// ***** DIFERENÇAS *****

//==================tipo primitivo==================

// Interface não pode estender de um tipo primitivo
interface ID extends number{} //isso não existe

// No type alias eu posso:
type Uui = string | number;

//==================tuplas==================

// Interface não pode definir as Tuplas
interface Tuple {
    0: number;
    1: number;
}

[1, 2, 3, "texto" ] as Tuple;

//isso não existe. nas tuplas eu devo saber a quantidade de valores e o tipo de cada um deles. na interface eu posso colocar qualquer coisa que é aceitável

//type alias
type TupleT = [number, number]
[1, 2] as TupleT;

//==================múltiplas declarações==================

// Interface pode ter múltiplas declarações e todas serão unidas com o mesmo nome

interface JQuery {
    a: string;
}

interface JQuery {
    b: string;
}

const $: JQuery = {
    a: 'foo',
    b: 'bar'
}

// Type alias é apenas uma declaração por escopo, ele não vai entender e unir da mesma forma que a interface
type JQueryT = { a: string }
type JQueryT = { b: string } //da erro

//isso pode ser uma vantagem que impede a criação de types duplicados que poderiam confundir e criar problemas no escopo


