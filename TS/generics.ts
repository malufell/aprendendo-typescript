
//Forma usual de indicar o atributo que está sendo passado no método
// S => State
// T => Type
// K => Key
// V => Value
// E => Element

function useState<S extends number | string>(){
    let state: S

    function getState(){
        return state;
    }

    function setState(newState: S){
        state = newState
    }

    return { getState, setState }
}
 
const newState = useState();
newState.setState('foo') //funciona normalmente 
console.log(newState.getState())

newState.setState(123)
console.log(newState.getState()) 

newState.setState(true) //erro
console.log(newState.getState()) 
//Argument of type 'boolean' is not assignable to parameter of type 'string'.