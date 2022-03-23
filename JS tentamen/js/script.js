const inputAddTo = document.getElementById('add-to-input');
const btnAdd = document.querySelector('.add-btn');
const finalTodoUl = document.querySelector('.final-todo-ul');
const btnReset = document.getElementById('btn-reset');
const todoUl = document.querySelector('.todo-ul');
const errorMessages = document.getElementById('error-messages');

btnAdd.addEventListener('click', function (e) {
  e.preventDefault();
  if (inputAddTo.value === '') {
    errorMessages.innerHTML = `Du får inte skapa en tom lista!`;
  } else {
    errorMessages.innerHTML = '';
    const list = document.createElement('li');
    const inputList = document.createElement('input');
    inputList.disabled = 'disable';
    inputList.placeholder = inputAddTo.value;
    inputAddTo.value = '';

    const btnChange = document.createElement('button');
    btnChange.id = 'btn-change';
    btnChange.innerHTML = `Ändra`;
    const btnDone = document.createElement('button');
    btnDone.id = 'btn-klar';
    btnDone.innerHTML = `Färdig`;
    const btnDelete = document.createElement('button');
    btnDelete.id = 'btn-delete';
    btnDelete.innerHTML = `Radera`;

    // appending
    list.append(inputList, btnChange, btnDone, btnDelete);
    todoUl.appendChild(list);

    const button = new Buttons();
    button.change(btnChange, inputList, errorMessages);
    button.finish(btnDone, finalTodoUl, list);
    button.delete(btnDelete);
    button.reset(btnReset, list);
  }
});

class Buttons {
  constructor() {}

  delete(btnDelete) {
    btnDelete.addEventListener('click', function (e) {
      e.target.parentNode.remove();
    });
  }
  finish(btnDone, finalTodoUl, list) {
    btnDone.addEventListener('click', function () {
      finalTodoUl.append(list);
      btnDone.remove();
    });
  }

  reset(btnReset, list) {
    btnReset.addEventListener('click', function () {
      list.remove();
    });
  }

  change(btnChange, inputList, errorMessages) {
    btnChange.addEventListener('click', function (e) {
      e.preventDefault();
      const clicked = e.target;
      if (clicked.textContent === 'Ändra') {
        inputList.disabled = false;
        btnChange.textContent = `Spara`;
      } else if (clicked.textContent === 'Spara' && inputList.value.trim()) {
        inputList.disabled = true;
        btnChange.textContent = 'Ändra';
        errorMessages.textContent = '';
      } else {
        errorMessages.textContent = `Du får inte spara en tom lista!`;
      }
    });
  }
}
