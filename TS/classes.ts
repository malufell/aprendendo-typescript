class UserAccount {
    protected name: string;
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
    level: number;

    constructor(name: string, age: number, nickname: string, level: number) { //aqui eu preciso repetir as propriedades da classe mãe
        super(name, age)
        this.nickname = nickname;
        this.level = level
    }

    get getLevel () {
        console.log('-----GET-----')
        return this.level;
    }

    set setLevel (level: number) {
        this.level = level;
    }

    logCharDetails(): void {
        console.log(`O usuário tem o apelido ${this.nickname} e o nome ${this.name}`)
    }
}


const malu = new UserAccount("Malu", 30);
console.log(malu);
console.log(malu.age);
malu.logDetails();

const user1 = new CharAccount("Malu", 30, "Lu", 3);

//set não é chamado como função, aqui é passado algum valor para o atributo
user1.setLevel = 10;

//get não é chamado como uma função "getLevel()" e sim como uma propriedade
console.log(user1.getLevel) 