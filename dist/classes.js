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
var UserAccount = /** @class */ (function () {
    function UserAccount(name, age) {
        this.name = name;
        this.age = age;
    }
    ;
    UserAccount.prototype.logDetails = function () {
        console.log("A usu\u00E1ria " + this.name + " tem " + this.age + " anos");
    };
    return UserAccount;
}());
;
var CharAccount = /** @class */ (function (_super) {
    __extends(CharAccount, _super);
    function CharAccount(name, age, nickname, level) {
        var _this = _super.call(this, name, age) || this;
        _this.nickname = nickname;
        _this.level = level;
        return _this;
    }
    Object.defineProperty(CharAccount.prototype, "getLevel", {
        get: function () {
            console.log('-----GET-----');
            return this.level;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CharAccount.prototype, "setLevel", {
        set: function (level) {
            this.level = level;
        },
        enumerable: false,
        configurable: true
    });
    CharAccount.prototype.logCharDetails = function () {
        console.log("O usu\u00E1rio tem o apelido " + this.nickname + " e o nome " + this.name);
    };
    return CharAccount;
}(UserAccount));
var malu = new UserAccount("Malu", 30);
console.log(malu);
console.log(malu.age);
malu.logDetails();
var user1 = new CharAccount("Malu", 30, "Lu", 3);
//set não é chamado como função, aqui é passado algum valor para o atributo
user1.setLevel = 10;
//get não é chamado como uma função "getLevel()" e sim como uma propriedade
console.log(user1.getLevel);
