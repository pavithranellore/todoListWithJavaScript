//selectors
const todoInput = document.querySelector("#input-get");
const todoButton = document.querySelector("#btn-get");
const todoList = document.querySelector(".todo-list");
const filterOption=document.querySelector(".filter-todo");
//Event Listeners
document.addEventListener("DOMContentLoaded",getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click",handleAction);
filterOption.addEventListener('change',filterTodo);


//functions
function addTodo(event){
  //prevent form from refresh
  event.preventDefault();
  //todoDiv
  const todoDiv=document.createElement("div");
  todoDiv.classList.add("todo");
  //create list
  const newTodo=document.createElement("li");
  newTodo.innerText=todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
//add todo to localstorage
   saveLocalTodos(todoInput.value);
  // Completed button
  const completedButton=document.createElement("button");
  completedButton.innerHTML='<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton)
  
  // Trash Button
  const trashButton=document.createElement("button");
  trashButton.innerHTML='<i class="fa-solid fa-trash"></i>';
  trashButton.classList.add("trash-button");
  // trashButton.addEventListener('click')
  todoDiv.appendChild(trashButton);

//append to list
  todoList.appendChild(todoDiv);
  //clear todo input value
  todoInput.value="";

  //newItem.addEventListener("click",deleteItem);
}

function handleAction(e){

  const item = e.target;
  
  if(item && item.classList.contains("trash-button")){
    e.target.parentElement.remove();
  }
  
  // console.log('e ===>' ,e.target.parentElement);
  
  // e.target.parentElement.remove();

  // 

  // console.log('e ===> ', item.classList);
  // //delete todo
  // if (item.classList[0] === "trash-btn"){

  //   let todo=item.parentElement;
  //   todo.remove();
  //   // todo.classList.add("fall");
  //   // console.log('todo', todo);
  //   // removelocalTodos(todo);

  //   // todo.addEventListener("transitionend",function(){
  //   //   // todo.remove();
  //   // });

  // }

  if(item.classList[0] === "complete-btn"){
    const todo=item.parentElement;
    todo.classList.toggle("completed"); 
  }

}

function filterTodo(e){

  const todos = todoList.childNodes;

  todos.forEach(function(todo){
    
    // console.log(' target value', e.target.value, 'todo', todo);

    switch(e.target.value){
      case "all":
        todo.style.display="flex";
        break;
      case "completed":
        console.log(' todo.classList ', todo,   todo.classList, todo.classList.contains('completed'));
        if(todo.classList.contains('completed')){
          todo.style.display='flex';
        }else{
          todo.style.display="none";
        }
        break;
      case "uncompleted":
        if(!todo.classList.contains('completed')){
          todo.style.display="flex";
        }else{
          todo.style.display="none";
        }
        break;
        
    }

  });
}

   //local storage

function saveLocalTodos(todo){
   let todos;
   if(localStorage.getItem('todos')===null){
    todos=[];
   }else{
      todos=JSON.parse(localStorage.getItem('todos'));
   } 
   todos.push(todo);
   localStorage.setItem("todos",JSON.stringify(todos));
}
function getTodos(){
  let todos;
  if(localStorage.getItem("todos")===null){
    todos=[];
  }else{
    todos=JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function(todo){
    const todoDiv=document.createElement("div");
    todoDiv.classList.add("todo");
    const newTodo=document.createElement("li");
    newTodo.innerText=todo;
  })
}
function removeLocalTodos(todo){
  let todos;
  if(localStorage.getItem("todos")==null){
    todos=[];
  } else{
    todos=JSON.parse(localStorage.getItem("todos")); 
  }
  const todoIndex=todo.children[0].innerText;
  todos.splice(todos.indexof(todoIndex),1);
  localStorage.setItem("todos",JSON.stringify(todos));
}