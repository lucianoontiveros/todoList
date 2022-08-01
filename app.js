const todos = JSON.parse(localStorage.getItem('todos')) || [];


const render = () => {
// lo primero que debemos hacer es seleccionar nuestros elementos en html.
    const todoList = document.getElementById('toDoList');
    const todosTemplate = todos.map(item => '<li>' + item + '</li>')
    todoList.innerHTML  = todosTemplate.join(''); // esto es un arreglo por lo tanta necesitamos ponerles comillas al principio para que string .join nos permite esto
    const elementos = document.querySelectorAll('#toDoList li');
    elementos.forEach((elemento, i) => {
        elemento.addEventListener('click', () => { // esto nos sirve para hacer click sobre la tarea para eliminarla.
            elemento.parentNode.removeChild(elemento);
            todos.splice(i, 1); // Aqui eliminamos un elemento del TodoList
            actualizarLista(todos)
            render() // creamos la funcion render porque elemento.parentNode.removeChild(elemento); al remover un elemento no actualiza los indices, con render creamos la funcion y la volvemos a llamar en la misma funcion

        })
        
    });
}

// Esta funcion nos permite agregar cada tarea a la lista
const actualizarLista = (todos) => {
    const todostrings = JSON.stringify(todos)
    localStorage.setItem('todos', todostrings);
}

window.onload = () => {
    render();
    const form = document.getElementById('toDo-form'); //Aquí enviamos nuestro formulario
    form.onsubmit = (e) => {
        e.preventDefault(); //Evitamos que la aplicación se refresque. 
        const todo = document.getElementById('toDo') // captamos la informacion del furmulario
        const todoText = todo.value; 
        todo.value = ''; //reemplezamos el valor por un stream vacio.  
        todos.push(todoText);
        actualizarLista(todos)
        render();
    }
    
}