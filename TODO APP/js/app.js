const item = document.querySelector("#item");
const todobox = document.querySelector("#to-do-box");

// loading existing data from local storage
window.addEventListener("load", () => loadtodofromlocalstorage());

item.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        const todotext = this.value.trim();
        if (todotext !== "") {
            addtodoandsave(todotext);
            this.value = "";
        }
    }
});

const addTodo = (item, done = false) => {
    const listitem = document.createElement("li");
    listitem.innerHTML = `
    ${item}
    <i class="fas fa-times"></i>
    `;
    
    if (done) {
        listitem.classList.add("done");
    }

    listitem.addEventListener("click", function () {
        this.classList.toggle("done");
        saveTodosToLocalStorage();
    });

    listitem.querySelector("i").addEventListener("click", function () {
        listitem.remove();
        saveTodosToLocalStorage();
    });

    todobox.appendChild(listitem);
};

const addtodoandsave = (item) => {
    addTodo(item);
    saveTodosToLocalStorage();
};

const saveTodosToLocalStorage = () => {
    const todos = Array.from(todobox.children).map((li) => ({
        text: li.textContent.trim(),
        done: li.classList.contains("done")
    }));
    localStorage.setItem("todos", JSON.stringify(todos));
};

const loadtodofromlocalstorage = () => {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.forEach((todo) => {
        addTodo(todo.text, todo.done);
    });
};
