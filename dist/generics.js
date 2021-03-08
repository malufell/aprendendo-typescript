"use strict";
//Forma usual de indicar o atributo que está sendo passado no método
// S => State
// T => Type
// K => Key
// V => Value
// E => Element
function useState() {
    var state;
    function getState() {
        return state;
    }
    function setState(newState) {
        state = newState;
    }
    return { getState: getState, setState: setState };
}
var newState = useState();
newState.setState('foo'); //funciona normalmente 
console.log(newState.getState());
newState.setState(123);
console.log(newState.getState());
// newState.setState(true)
// console.log(newState.getState()) 
//erro
//Argument of type 'boolean' is not assignable to parameter of type 'string'.
