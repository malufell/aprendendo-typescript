type Todo = {
    title: string;
    description: string;
    completed: boolean;
}

//readonly
const todo: Readonly<Todo> = {
    title: "Assistir série",
    description: "Relaxar",
    completed: false,
}

//partial
function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
    return { ...todo, ...fieldsToUpdate }
}

const todo2 : Todo = updateTodo(todo, { completed: true })

//pick
type TodoPreview = Pick<Todo, "title" | "completed">

const todo3 : TodoPreview = {
    title: "Ler um livro",
    completed: false
}

//omit
type TodoPreview2 = Omit<Todo, "description">

const todo4 : TodoPreview2 = {
    title: "Ler um livro",
    completed: false
}
