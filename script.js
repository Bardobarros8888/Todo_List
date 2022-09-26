const getBanco = () => JSON.parse(localStorage.getItem('todoList')) ?? [];
const setBanco = (banco) => localStorage.setItem ('todoList', JSON.stringify(banco))

const newItem = (task, status, id) => {
    const item = document.createElement('label')
    item.classList.add('todo-item');
    item.innerHTML = `
        <input type="checkbox" ${status} data-indice=${id}>
        <div>${task}</div>
        <input type="button" value="X" data-indice=${id}>
    `
    document.getElementById('todoList').appendChild(item);

}
const clearTask = () => {
    const todoList = document.getElementById('todoList');
    while (todoList.firstChild)
        todoList.removeChild(todoList.lastChild);
}

const refresh = () => {
    clearTask();
    const banco = getBanco();
    banco.forEach((item, id) => newItem(item.task, item.status, id))

}


const addItem = (evento) => {
    const tecla = evento.key;
    const text = evento.target.value;
    if (tecla === 'Enter') {
        const banco = getBanco();
        banco.push({ 'task': text, 'status': '' });
        setBanco(banco);
        refresh();
        evento.target.value = '';    // parametro para limpar o input da tarefa, quando adicionar a tarefa, a caixinha vai limpar.
    }
}

const removerItem = (id) => {
    const banco = getBanco();
    banco.splice (id,1);
    setBanco(banco);
    refresh();
}

const refreshItem = (id) => {
    const banco = getBanco();
    banco[id].status = banco[id].status === '' ? 'checked' : '';
    setBanco(banco)
    refresh();
}

const clickItem = (evento) => {
    const elemento = evento.target;
    if (elemento.type === 'button'){
        const id = elemento.dataset.indice;
        removerItem(id);
    }else if (elemento.type === 'checkbox') {
        const id = elemento.dataset.indice;
        refreshItem (id);
    }
}


document.getElementById('newItem').addEventListener('keypress', addItem);
document.getElementById('todoList').addEventListener('click', clickItem);


refresh();
