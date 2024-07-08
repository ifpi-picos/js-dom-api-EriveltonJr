// Recupera tarefas do local storage ou inicializa um array vazio
let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
const inputTarefa = document.getElementById("todoInput");
const listaTarefas = document.getElementById("todoList");
const contadorTarefas = document.getElementById("todoCount");
const botaoAdicionar = document.getElementById("addButton");
const botaoExcluir = document.getElementById("deleteButton");

// Inicializa
document.addEventListener("DOMContentLoaded", function () {
  botaoAdicionar.addEventListener("click", adicionarTarefa);
  inputTarefa.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevê o comportamento padrão da tecla Enter
      adicionarTarefa();
    }
  });
  botaoExcluir.addEventListener("click", excluirTodasTarefas);
  exibirTarefas();
});

function adicionarTarefa() {
  const novaTarefa = inputTarefa.value.trim();
  if (novaTarefa !== "") {
    tarefas.push({ texto: novaTarefa, completada: false });
    salvarNoLocalStorage();
    inputTarefa.value = "";
    exibirTarefas();
  }
}

function exibirTarefas() {
  listaTarefas.innerHTML = "";
  tarefas.forEach((item, index) => {
    const li = document.createElement("li");
    li.className = "todo-item";
    if (item.completada) {
      li.classList.add("completed");
    }
    li.innerHTML = `
      <div class="todo-container">
        <input type="checkbox" class="todo-checkbox" id="input-${index}" ${item.completada ? "checked" : ""}>
        <p id="todo-${index}" class="${item.completada ? "completed" : ""}" onclick="editarTarefa(${index})">${item.texto}</p>
        <button onclick="alternarTarefa(${index})">Completa</button>
        <button onclick="removerTarefa(${index})">Remover</button>
      </div>
    `;
    li.querySelector(".todo-checkbox").addEventListener("change", () => alternarTarefa(index));
    listaTarefas.appendChild(li);
  });
  contadorTarefas.textContent = tarefas.length;
}

function editarTarefa(index) {
  const tarefaItem = document.getElementById(`todo-${index}`);
  const textoExistente = tarefas[index].texto;
  const elementoInput = document.createElement("input");

  elementoInput.value = textoExistente;
  tarefaItem.replaceWith(elementoInput);
  elementoInput.focus();

  elementoInput.addEventListener("blur", function () {
    const textoAtualizado = elementoInput.value.trim();
    if (textoAtualizado) {
      tarefas[index].texto = textoAtualizado;
      salvarNoLocalStorage();
    }
    exibirTarefas();
  });
}

function alternarTarefa(index) {
  tarefas[index].completada = !tarefas[index].completada;
  salvarNoLocalStorage();
  exibirTarefas();
}

function removerTarefa(index) {
  tarefas.splice(index, 1);
  salvarNoLocalStorage();
  exibirTarefas();
}

function excluirTodasTarefas() {
  tarefas = [];
  salvarNoLocalStorage();
  exibirTarefas();
}

function salvarNoLocalStorage() {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}
