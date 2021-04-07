# Aprendendo typescript

Minhas anotações sobre a [excelente série de vídeos](https://www.youtube.com/watch?v=mRixno_uE2o&list=PLlAbYrWSYTiPanrzauGa7vMuve7_vnXG_&index=4) que o Willian Justen disponibilizou gratuitamente no youtube.

<details>
  <summary>Introdução!</summary>

- Documentação oficial: https://www.typescriptlang.org/


TypeScript adiciona novas funcionalidades ao JavaScript (é um superset)! No final, o TS compila para JS, o resultado vai ser em JS para ser interpretado. Posso ter arquivo .ts convivendo com .js. a sintaxe dos dois é a mesma! 

- vantagens de usar o TS:
  - Exemplo do que o TS resolve com a tipagem de dados:
  ```javascript
  function sum(a,b) {
    return a + b
  }

  sum (1, 2) //3 (OK)
  sum ("1", "2") //12 (erro, como eu passei string, ele concatenou)
  ```
  - O TS também avisa se eu estiver fazendo algumas coisas sem sentido no código (ex: dividir um número por um array)
  - Funciona como espécie de "primeira documentação", por está declarado aquilo que se espera receber 
  - Deixa o auto complete muito poderoso, informando o que está disponível

<br>

- desvantagens do TS:
  - precisa ser compilado
  - aprendizado inicial dos tipos e boas práticas
  - erros nem sempre estão claros ou são enormes e ruins de entender

<br>

Algumas considerações sobre o TS:

- Em um projeto, a adoção para o TS pode ser feita gradualmente, não é necessário reescrever o código inteiro, não tem problema ficar JS e TS no mesmo app
- Mesmo que tenha testes no projetos, o typescript aumenta a segurança da aplicação, eles são usados em conjunto
- Funciona bem com programação funcional (não é só para orientação a objetos, isso é um mito)
- Não obriga que tudo seja tipado, algumas coisas são por inferência (se eu passar uma string na prop ele entende que é uma string então eu não preciso declarar)
- Serve para qualquer complexidade de projeto
- Não é o mesmo que "PropTypes" (aquela lib do react), pq ela não bloqueia nada, nem da erro, o máximo que faz é informar um alerta no console log. O TS sim nos bloqueia. Se usar o TS, não precisa usar o PropTypes!

</details>

---

## Praticando

<details>
  <summary>Conteúdo!</summary>

Essa função me permite concatenar números ao invés de somar:

```html
<body>
    <input type="number" id="num1" />
    <span>+</span>
    <input type="number" id="num2" />
    <button id="button">Somar</button>
    <script src="index.js"></script>
</body>
```

```javascript
const input1 = document.getElementById("num1")
const input2 = document.getElementById("num2")
const button = document.getElementById("button")

function sum(a,b) {
    return a + b
}

button.addEventListener("click", function(){
    console.log(sum(input1.value, input2.value))
})
```

Por padrão, a informação que vem de um input é sempre uma **string**.

Esse mesmo código, no TS, vai dar erro, os tipos não estão definidos.

Se eu informar que o input é um elemento do HTML, e definir que "a" e "b" são números (pq é isso que eu espero receber pra função soma), vai dar erro aqui `input1.value`: "O argumento do tipo 'string' não pode ser atribuído ao parâmetro do tipo 'número'."

```typescript
const input1 = document.getElementById("num1") as HTMLInputElement
const input2 = document.getElementById("num2") as HTMLInputElement
const button = document.getElementById("button")

function sum(a: number, b: number) {
    return a + b
}

button.addEventListener("click", function(){
    console.log(sum(input1.value, input2.value))
})
```

**Se o código estiver assim e eu for compilar ele para JS, vai dar erro.**

Essa é a forma de corrigir o erro e deixar tudo certinho:

```javascript
const input1 = document.getElementById("num1") as HTMLInputElement
const input2 = document.getElementById("num2") as HTMLInputElement
const button = document.getElementById("button")

function sum(a: number, b: number) {
    return a + b
}

button.addEventListener("click", function(){
    console.log(sum(Number(input1.value), Number(input2.value)))
})
``` 
</details>

---

## Configurando o TypeScript - TSconfig

<details>
  <summary>Conteúdo!</summary>

Enquanto não existe o TSconfig, o código pra compilar um arquivo é `tsc index.ts --watch` no cmder.

O "--watch" é parecido com o nodemon, vai atualizando a compilação conforme salvo os arquivos. 

Para cada arquivo ".ts" que eu criar, na hora da compilação, vai ser gerado um arquivo igual ".js". Por isso algumas coisas precisam ser configuradas (onde esses arquivos serão salvos e etc).

- comando `tsc --init`, cria o arquivo "tsconfig.json"
- no arquivo "tsconfig.json", informar a pasta onde os arquivos compilados serão armazenados: "outDir": "./dist". 
- ao rodar `tsc`, já será criada uma pasta no projeto durante a compilação

Importante: agora que o arquivo "tsconfig.json" existe, o TS já vai compilar todos os arquivos ".ts" que existirem no meu projeto, não preciso especificar o nome deles.

Agora, para compilar basta usar o comando `tsc`.

<br>
</details>

---

## Criando os tipos - types

<details>
  <summary>Conteúdo!</summary>

Esses são alguns básicos!

Existem os tipos primitivos do javascript (string, number e etc) e alguns que foram criados para uso com o typescript.

Registrei os que não conhecia muito:

- **tupla**: pra quando eu tenho um array e sei a quantidade e tipos de elementos dentro dele:
```javascript
let title: [number, string, string]
title = [1, "foo", "bar"]
```

- **enun**: ajuda com a criação de "chave = valor", assim posso passar informações mais amigáveis ao usuário, por exemplo:
```javascript
enum Colors {
  white = '#fff',
  black = '000'
}  
```

- **any**: pra quando pode ser de qualquer tipo. (não é bom utilizar ele - dentro do TSconfig posso configurar pra que esse tipo não seja permitido).

- **void (vazio)**: pra tipar funções onde eu sei que não retorna nada. exemplo:

```javascript
function logger(): void {
  console.log('foo')
}
```
Obs.: nesse caso o typescript entende que o console log é vazio, eu não precisaria colocar isso ali, mas quando for uma função minha eu tenho que indicar então é bom acostumar.

- **null / undefined**: na prática os dois são a mesma coisa (não tem conteúdo então da false). o uso seria pra quando eu tenho um campo que pode ser undefined ou outra coisa, exemplo:
```javascript
type info = string | undefined
```

- **never**: nunca vai retornar nada. seria mais pra quando eu vou lançar um erro:
```javascript
function error(): never {
  throw new Error("error")
}
```

- **object**: qualquer coisa que não seja um tipo primitivo, é um objeto. se eu colocar um boolean, string, number e etc, vai dar erro.

```javascript
let cart: object;

cart = {
  key: "foo"
}
```

- **union**: pra quando a propriedade pode ser de mais de um tipo (igual acima no undefined). usado com esse operador:
```javascript
string | undefined
```

- **alias**

Tem duas utilidades:

1. pra quando eu crio um tipo personalizado. se eu tenho duas funções com uma prop que podem ser tanto number quanto string, por exemplo, não preciso ficar repetindo essas duas tipagens com o union, posso criar uma nova e utilizar assim:

```javascript
type Uid: string | number

function log(uuid: Uid, item: string) {
  console.log(uuid, item)
}  
```

2. pra quando eu quero deixar os valores pré-definidos. (como se fosse uma lista suspensa)

```javascript
type Plataform = "Windows" | "Linux" | "Mac Os"

function renderPlataform(plataform: Plataform) {
  return plataform
}

renderPlataform('Windows') //se eu colocar "ios" vai dar erro, dizendo que isso não está na definição do type
```

- **aliases com intersection**: 

usado para uma personalização mais complexa, por exemplo, ao invés de colocar o valor padrão que a variável vai receber, posso montar um objeto vários tipos e se um deles for opcional eu informo também para não dar erro na validação:

```javascript
type AccountInfo = {
  id: number;
  name: string;
  email?: string //essa interrogação informa que o campo é opcional, é o mesmo que definir "string | undefined"
}

const account: AccountInfo = {
  id: 123,
  name: "Maria"
}   
```

Mas eu posso ter também um segundo type personalizado, exemplo:
```javascript
type CharInfo = {
  nickname: string;
  level: number
}

const char: CharInfo = {
  nickname: "Maria",
  level: 100
}   
```

E agora eu posso querer um terceiro tipo que tem informação dos dois anteriores! Para este caso vou usar o "intersection", ele faz a junção de outros types:

```javascript
type PlayerInfo = AccountInfo & CharInfo

const player: PlayerInfo = {
  id: 12,
  name: "Maria",
  nickname: "Malu", 
  level: 100
}
```
Obs.: as informações não precisam estar na mesma ordem em que foram definidas nos types unidos.

Neste caso, será obrigatório preencher todas as informações dos dois types que foram unidos, a menos que algum deles tenha uma informação opcional (como foi o caso do email).

<br>

### Type inference


Não é obrigatório tipar todos os meus dados! A inferência faz isso quando entende o que estou passando, exemplo:

```javascript
let message = "mensagem abc";
```

Como estou passando uma string, ele entende que é string, não preciso definir o type. Se eu tentar mudar o valor para um número, vai dar erro :) 

</details>

---

## Classes

<details>
  <summary>Conteúdo!</summary>

Não são obrigatórias no TS.

O typescript resolve aquele problema dos atributos privados (em que a convenção é usar um underline no início do nome do atributo, mas que era só uma informação visual para o dev, não causava nenhum tipo de bloqueio).

- Criando uma classe com um método e instanciando um objeto:

```javascript
class UserAccount {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age
    };

    logDetails(): void {
        console.log(`A usuária ${this.name} tem ${this.age} anos`)
    }
};


const malu = new UserAccount("Malu", 30);
console.log(malu);
console.log(malu.age);
malu.logDetails();

//Resultado:
UserAccount { name: 'Malu', age: 30 }
30
A usuária Malu tem 30 anos
```

Até aqui a novidade é definir os types na construção da classe.

- Criando um método estendido (com herança)

```javascript
class CharAccount extends UserAccount {
    nickname: string;
    level: number;

    constructor(name: string, age: number, nickname: string, level: number) { //aqui eu preciso repetir as propriedades da classe mãe
        super(name, age)
        this.nickname = nickname;
        this.level = level
    }
}

const joao = new CharAccount("João", 30, "John", 3);
console.log(joao)
joao.nickname = "scott"
console.log(joao)

//dessa forma, consigo alterar as informações do objeto. resultado:
CharAccount { name: 'João', age: 30, nickname: 'John', level: 3 }
CharAccount { name: 'João', age: 30, nickname: 'scott', level: 3 }
```

E agora entram os Modifiers, recurso muito legal do TS!

<br>

### Modifiers

- **PRIVATE:** Se eu quiser definir que uma propriedade não pode ser chamada (e ai nem vai ser alterada) em outro lugar além daquele em que foi definido (do lado de fora da classe, digamos assim).

Importante: esse método não permite o uso do atributo nas classes que foram estendidas, realmente é só dentro da classe em que foi declarado.

Neste exemplo, "nickname" receberá o private:

```javascript
class CharAccount extends UserAccount {
    private nickname: string; //modifier aqui
    level: number;

    constructor(name: string, age: number, nickname: string, level: number) {
        super(name, age)
        this.nickname = nickname;
        this.level = level
    }
};

const joao = new CharAccount("João", 30, "John", 3);
console.log(joao)
joao.nickname = "scott" //agora aqui está com erro, porque "nickname" é privado e não pode ser acessado
//Property 'nickname' is private and only accessible within class 'CharAccount'.
console.log(joao)
```

Com esse erro o TS nem vai compilar para JS:
```console
[10:54:04] File change detected. Starting incremental compilation...
classes.ts:35:6 - error TS2341: Property 'nickname' is private and only accessible within class 'CharAccount'.
35 joao.nickname = "scott"
        ~~~~~~~~
[10:54:04] Found 1 error. Watching for file changes.
```

- Mas eu posso acessar esse atributo em um método que está dentro da classe, isso é permitido. O TS irá compilar normalmente:

```javascript
class CharAccount extends UserAccount {
    private nickname: string;
    level: number;

    constructor(name: string, age: number, nickname: string, level: number) { 
        super(name, age)
        this.nickname = nickname;
        this.level = level
    }

    logCharDetails(): void {
        console.log(`O usuário tem o apelido ${this.nickname}`) //chamando a propriedade privada 
    }
}

const joao = new CharAccount("João", 30, "John", 3);
console.log(joao)
joao.logCharDetails();

//não funcionaria um console.log(joao.nickname), por exemplo
```

Resultado:
```console
CharAccount { name: 'João', age: 30, nickname: 'John', level: 3 }
O usuário tem o apelido John
```

- **READONLY:** utilizado para definir que um objeto pode ser lido mas não pode ser editado depois da criação (nem se estiver dentro da classe com um set)

Neste exemplo o "level" receberá o modifier "readonly":

```javascript
class CharAccount extends UserAccount {
    private nickname: string;
    readonly level: number;

    constructor(name: string, age: number, nickname: string, level: number) {
        super(name, age)
        this.nickname = nickname;
        this.level = level
    }
}

const joao = new CharAccount("João", 30, "John", 3);
console.log(joao.level) //isso funciona, pq estou apenas lendo a informação
joao.level = 4; //isso não funciona, pq não é permitido mudar o valor depois que ele foi criado!

//aparece o erro: Cannot assign to 'level' because it is a read-only property.
```

- **PUBLIC**: é uma propriedade implícita que permite qualquer coisa. é o mesmo que eu não definir nada!

- **PROTECTED**: permite o acesso dentro das classes que estendem dela, mas não permite do lado de fora. Não permite nem chamar a propriedade, igual ao private.

É bem parecido com o private, a diferença é que o private só permite dentro da classe em que o atributo foi declarado, nas classes estendidas não permite que seja chamado, já o protected permite que as classes estendidas chamem o atributo

- PRIVATE

```javascript
class UserAccount {
    private name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age
    };

    logDetails(): void {
        console.log(`A usuária ${this.name} tem ${this.age} anos`)
    }
};

class CharAccount extends UserAccount {
    private nickname: string;
    readonly level: number;

    constructor(name: string, age: number, nickname: string, level: number)
        super(name, age)
        this.nickname = nickname;
        this.level = level
    }

    logCharDetails(): void {
        console.log(`O usuário tem o apelido ${this.nickname} e o nome ${this.name}`) //da erro
        //Property 'name' is private and only accessible within class 'UserAccount'.
    }
}
```

- PROTECTED

O mesmo código acima vai funcionar se eu utilizar o modifier protected!

```javascript
class UserAccount {
    protected name: string;
    age: number;
//...restante segue igual ao código anterior, apenas não dá o erro
```

<br>

### Get e Set

- get = podemos pegar valores e propriedades de dentro da classe. ele funciona como uma função, mas é chamado como uma propriedade que retorna o que foi definido.

o método get sempre deve possuir return de algum valor!

```javascript
class CharAccount extends UserAccount {
    private nickname: string;
    readonly level: number;

    constructor(name: string, age: number, nickname: string, level: number) 
        super(name, age)
        this.nickname = nickname;
        this.level = level
    }

    get getLevel () {
        console.log('-----GET-----')
        return this.level;
    }
}

const user1 = new CharAccount("Malu", 30, "Lu", 3);
console.log(user1.getLevel) //ele não é chamado como uma função "getLevel()" e sim como uma propriedade
```

Retorno:
```console
-----GET-----
3
```

- set = vai setar um valor

O método set não tem return igual ao get, ele deve ter declarado o parâmetro esperado (com type)

```javascript
set setLevel (level: number) {
    this.level = level;
}

const user1 = new CharAccount("Malu", 30, "Lu", 3);

//set não é chamado como função, aqui é passado algum valor para o atributo
user1.setLevel = 10;

//get não é chamado como uma função "getLevel()" e sim como uma propriedade
console.log(user1.getLevel) 
```

Retorno:
```console
-----GET-----
10
```

</details>

---

## Interfaces

<details>
  <summary>Conteúdo!</summary>
 
São muitos famosas no typescript porque existem somente no TS (JS puro não).

São um conjunto de dados para descrever a estrutura de um objeto mais complexo. Ela é utilizada exclusivamente para objetos.

Muito semelhante ao type Alias (também aceita union), mas com a inclusão dos modifiers que existem nas classes e mais as assinaturas dos métodos (essa parte ainda não peguei muito bem).

```javascript
interface Game {
    title: string;
    description: string;
    genre: string;
    plataform: string[];
    getSimilars: (title: string) => void;
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

console.log(crash.title)
crash.getSimilars(crash.title)
```

Retorno:
```console
Crash
jogos similares a Crash: outro jogo 1, outro jogo 2
``` 

Assim como nas Classes, existem os modifiers também nas interfaces e assim como nos aliases eu posso deixar um campo como opcional usando o "?":

```javascript
interface Game {
    readonly title: string;
    description: string;
    genre: string;
    plataform?: string[];
    getSimilars: (title: string) => void;
}
``` 

A ideia é exatamente a mesma.

As interfaces também podem ser estendidas, igual as classes:

Obs.: pra não criar outro 'getSimilars' dentro do objeto 'crashAventuras', ele foi alterado para opcional (com o '?'). Em função disso, deu erro nessa etapa da aplicação: `crash.getSimilars(crash.title)`, porque um campo adicional pode ser undefined e o TS bloqueia isso. Nesses casos, é incluído um if para verificar se existe algo no get.


```javascript
interface Game {
    readonly title: string;
    description: string;
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

console.log(crashAventuras)
```

### Classes que implementam interfaces

É bem comum utilizar classes com interfaces. Diferente do type alias que serve também para primitivos, as interfaces sempre são para objetos. Normalmente as interfaces são utilizadas para criação de objetos mais complexos, quando são coisas mais simples de tipos primitivos não se usa interface e sim o type alias.

Exemplo de uma classe implementando a interface Game:

```javascript
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
```
</details>

---

## Quando utilizar Alias ou Interface

<details>
  <summary>Conteúdo!</summary>

Os dois recursos são muito parecidos!

```javascript
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
class CreateGame implements GameCollection {}

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
```

- Quando optar por interface
  - quando estiver criando libs, pois são mais extensíveis (em função das múltiplas declarações)
  - quando estiver programando orientado a objetos, aí faz sentido usar seguir esse padrão de class e interface

- Quando optar pelo type alias
  - é mais recomendável na maioria das vezes, pois é um pouquinho mais simplificado e facilita na forma de escrita (menos verboso, mas é tão sutil a diferença...)
  - quando estiver usando React - Props  

O MAIS importante é ter **consistência**, se o projeto inteiro já está usando interface, é melhor assim, da mesma forma se estiver usando type alias.

</details>

---

## Generics 

<details>
  <summary>Conteúdo!</summary>

- Serve para trazer um pouco de flexibilidade à linguagem tipada
- Os métodos ficam mais genéricos para permitir diferentes tipos de entrada e facilitar a reutilização do código
- É bastante utilizado nos hooks do React
- Funciona com tipos primitivos e com objetos mais complexos
- Da pra utilizar o Type Alias e Interface para personalizar um tipo e simplificar o código

- Na prática:
  - Utilizado para quando eu quero definir um método que pode receber mais de um type, mas diferente do union (string | number) eu quero definir que será apenas de um desses tipos, então: depois que eu definir na chamada do método, ou é um tipo ou é outro tipo, mas não pode ser os dois!
  - A definição é feita diretamente na chamada do método
  - Se eu quiser colocar boolean na chamada do método, não funciona, pq na função informei apenas number ou string (exemplo)

```javascript
function useState<S extends number | string>(){ //definição do generic
    let state: S

    function getState(){
        return state;
    }

    function setState(newState: S){
        state = newState
    }

    return { getState, setState }
}
 
const newState = useState<string>(); //na chamada estou definindo que será apenas string

newState.setState('foo') //funciona normalmente 
console.log(newState.getState())

newState.setState(123)
console.log(newState.getState()) //erro
//Argument of type 'number' is not assignable to parameter of type 'string'

newState.setState(true)
console.log(newState.getState()) //erro
//Argument of type 'boolean' is not assignable to parameter of type 'string'.
```

- Aqui: `function useState<S extends number | string>(){`
  - trecho `S` é uma forma usual de indicar o atributo que está sendo passado no método (na real pode usar qualquer letra)
- Forma usual de indicar o atributo:
  -   S => State
  -   T => Type
  -   K => Key
  -   V => Value
  -   E => Element

- trecho `S extends number | string` é onde estou definindo o generic, informando os tipos possíveis dele

Se dentro do generic eu quiser definir que será sempre de um tipo específico, ficaria assim:

```javascript
function useState<S extends number | string = string>(){ //aqui está a definição default string
    let state: S
    //... função segue igual acima
}
 
const newState = useState();

newState.setState('foo') //funciona normalmente 
console.log(newState.getState())

newState.setState(123)
console.log(newState.getState()) //erro
//Argument of type 'number' is not assignable to parameter of type 'string'

```

- trecho "`= string`" não tem relação com o que está a esquerda no código, serve para indicar o tipo padrão (default).

</details>

--- 

## Type Utilities

<details>
  <summary>Conteúdo!</summary>

São feitos com base nos generics. São utilitários para trabalhar com os types, servem para quando queremos fazer operações em cima dos próprios types.

Os utilities são definidos na chamada do type!

Existem vários, estes são apenas alguns:

- **Readonly**: para trabalhar com o princípio da imutabilidade, que seria não modificar o objeto inicial que foi criado (é a mesma lógica das interfaces e classes).

Criando um objeto básico sem nenhum utilities: 

```javascript
type Todo = {
    title: string;
    description: string;
    completed: boolean;
}

const todo: Todo = {
    title: "Assistir série",
    description: "Relaxar",
    completed: false,
}

console.log(todo)
//resultado: { title: 'Assistir série', description: 'Relaxar', completed: false }

//assim estou mudando o objeto inicial que foi criado
todo.completed = true;
console.log(todo)
//resultado: { title: 'Assistir série', description: 'Relaxar', completed: true }
```

- Implementando o readonly:

```
const todo: Readonly<Todo> = { //aqui
    title: "Assistir série",
    description: "Relaxar",
    completed: false,
}

todo.completed = true; //erro
//Cannot assign to 'completed' because it is a read-only property.
```

Seguindo o princípio da imutabilidade, a forma correta de alterar a informação é criar uma função que irá gerar um novo objeto com as informações atualizadas, sem alterar o objeto original. Aí entra o Partial.

- **Partial**: permite que nem todos os campos do objeto sejam preenchidos durante o update. Na criação do objeto os campos continuam obrigatórios, é apenas no update que poderá acontecer o preenchimento de apenas um campo, por exemplo. 

Outro ponto é que se no update eu informar campos que não existem, vai dar erro. Então é obrigatório seguir a estrutura original do objeto que foi definido no type!

```javascript
type Todo = {
    title: string;
    description: string;
    completed: boolean;
}

const todo: Readonly<Todo> = {
    title: "Assistir série",
    description: "Relaxar",
    completed: false,
}

function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) { //Make all properties in T optional
    return { ...todo, ...fieldsToUpdate }
}

const todo2 : Todo = updateTodo(todo, { completed: true })
//sem utilizar o Partial, aqui estava dando o erro 
//"Type '{ completed: true; }' is missing the following properties from type 'Todo': title, description", 
```

- **Pick**: pega algumas propriedades do type que já está criado e cria um novo type com elas.

```javascript
type Todo = {
    title: string;
    description: string;
    completed: boolean;
}
//pick:
type TodoPreview = Pick<Todo, "title" | "completed">

const todo3 : TodoPreview = {
    title: "Ler um livro",
    completed: false
}
```

Se eu tentar preencher "description" na variável do tipo "TodoPreview" vai dar erro, pois posso utilizar somente os campos que foram pegos (pick) do type "Todo".

- **Omit**: seria o contrário do pick, ao invés de pegar, ele omite a propriedade informada.

Se eu criar um objeto com a propriedade omitida, vai dar erro:

```javascript
//omit
type TodoPreview2 = Omit<Todo, "description">

const todo4 : TodoPreview2 = {
    title: "Ler um livro",
    description: "teste", //erro
    //Object literal may only specify known properties, and 'description' does not exist in type 'TodoPreview2'.
    completed: false
}
```

**Quando utilizar pick ou omit?** Vai depender da quantidade de propriedades existentes e do que eu quero fazer com elas, obviamente... 

- Se quero pegar quase todas as propriedades, basta omitir as poucas que não quero. 
- Se quero pegar somente poucas, utilizar o pick nelas.

</details>
