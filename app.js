let section = document.querySelector("section");
let add = document.querySelector("form button");
add.addEventListener("click", (e) => {
  e.preventDefault();
  let form = e.target.parentElement;
  let todoText = form.children[0].value;
  let todoMonth = form.children[1].value;
  let todoDate = form.children[2].value;

  if (todoText === "") {
    alert("請勿留白");
    return;
  }

  let todo = document.createElement("div");
  todo.classList.add("todo");
  let text = document.createElement("p");
  text.innerText = todoText;
  text.classList.add("todo-text");
  let time = document.createElement("p");
  time.innerText = todoMonth + " / " + todoDate;
  time.classList.add("todo-tiem");
  let completeButton = document.createElement("button");
  completeButton.innerHTML = `<i class="fa-solid fa-check"></i>`;
  completeButton.classList.add("complete");
  let trashbutton = document.createElement("button");
  trashbutton.innerHTML = `<i class="fa-solid fa-trash"></i>`;
  trashbutton.classList.add("trash");
  completeButton.addEventListener("click", (e) => {
    todo.classList.toggle("done");
  });
  trashbutton.addEventListener("click", (e) => {
    let todoItem = e.target.parentElement;

    todoItem.style.animation = "scaleDown 0.3s forwards";
    todoItem.addEventListener("animationend", () => {
      let text = todoItem.children[0].innerText;
      let myArray = JSON.parse(localStorage.getItem("list"));
      myArray.forEach((item, index) => {
        if (text == item.todoText) {
          myArray.splice(index, 1);
          localStorage.setItem("list", JSON.stringify(myArray));
        }
      });
      todoItem.remove();
    });
  });

  let myTodo = { todoText, todoMonth, todoDate };
  let myList = localStorage.getItem("list");
  if (myList == null) {
    localStorage.setItem("list", JSON.stringify([myTodo]));
  } else {
    let myListArray = JSON.parse(myList);
    myListArray.push(myTodo);
    localStorage.setItem("list", JSON.stringify(myListArray));
  }
  //   console.log(JSON.parse(localStorage.getItem("list")));

  todo.appendChild(text);
  todo.appendChild(time);
  todo.appendChild(completeButton);
  todo.appendChild(trashbutton);

  section.appendChild(todo);
  form.children[0].value = "";
  form.children[1].value = "";
  form.children[2].value = "";
});

let myList = localStorage.getItem("list");
if (myList !== null) {
  let myListArray = JSON.parse(myList);

  myListArray.forEach((item) => {
    let todo = document.createElement("div");
    todo.classList.add("todo");
    let text = document.createElement("p");
    text.innerText = item.todoText;
    text.classList.add("todo-text");
    let time = document.createElement("p");
    time.innerText = item.todoMonth + " / " + item.todoDate;
    time.classList.add("todo-tiem");
    let completeButton = document.createElement("button");
    completeButton.innerHTML = `<i class="fa-solid fa-check"></i>`;
    completeButton.classList.add("complete");
    let trashbutton = document.createElement("button");
    trashbutton.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    trashbutton.classList.add("trash");
    completeButton.addEventListener("click", (e) => {
      todo.classList.toggle("done");
    });
    trashbutton.addEventListener("click", (e) => {
      let todoItem = e.target.parentElement;
      todoItem.style.animation = "scaleDown 0.3s forwards";
      todoItem.addEventListener("animationend", () => {
        let text = todoItem.children[0].innerText;
        let myArray = JSON.parse(localStorage.getItem("list"));
        myArray.forEach((item, index) => {
          if (text == item.todoText) {
            myArray.splice(index, 1);
            localStorage.setItem("list", JSON.stringify(myArray));
          }
        });
        todoItem.remove();
      });
    });
    todo.appendChild(text);
    todo.appendChild(time);
    todo.appendChild(completeButton);
    todo.appendChild(trashbutton);

    section.appendChild(todo);
  });
}
