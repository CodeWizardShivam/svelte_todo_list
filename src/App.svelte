<script>
  import { onMount } from "svelte";
  import { v4 as uuid } from "uuid";
  import ToDoList from "./lib/ToDoList.svelte";

  let isLoading = false;
  let error = "";

  let toDos = [];
  onMount(() => {
    loadTodos();
  });

  async function loadTodos() {
    isLoading = true;
    await fetch(
      "https://my-json-server.typicode.com/ShivamPandey10/FakeJson/todos/"
    ).then(async (response) => {
      if (response.ok) {
        toDos = await response.json();
      } else {
        error = "An error has occurred";
      }
    });
    isLoading = false;
  }

  function handleRemoveTodo(event) {
    fetch("https://jsonplaceholder.typicode.com/todos/" + event.detail.id, {
      method: "DELETE",
      redirect: "follow",
    }).then((response) => {
      if (response.ok) {
        toDos = toDos.filter((t) => t.id != event.detail.id);
        console.table(toDos);
      }
    });
  }
  function handleToggleTodo(event) {
    fetch("https://jsonplaceholder.typicode.com/todos/" + event.detail.id, {
      method: "PATCH",
      redirect: "follow",
    }).then((response) => {
      if (response.ok) {
        toDos = toDos.map((t) => {
          if (t.id == event.detail.id) {
            return { ...t, completed: event.detail.completed };
          } else return { ...t };
        });
        console.table(toDos);
      }
    });
  }
  function handleAddTodo(event) {
    console.log("Inside App.Svelte Handle add todo definition");
    console.log(event);

    console.log(event.detail.inp);
    fetch("https://jsonplaceholder.typicode.com/todos/", {
      method: "POST",
      body: JSON.stringify({
        title: event.detail.inp,
        completed: false,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (res) => {
      if (res.ok) {
        const toDo = await res.json();
        console.log("From Post");
        console.log(toDo);
        console.log([...toDos, { ...toDo, id: uuid() }]);
        toDos = [...toDos, { ...toDo, id: uuid() }];
        toDos = toDos;
      }
    });

    console.table(toDos);
  }
</script>

<ToDoList
  {toDos}
  {error}
  {isLoading}
  let:toDo
  on:RemoveTodo={handleRemoveTodo}
  on:ToggleTodo={handleToggleTodo}
  on:AddTodo={handleAddTodo}
>
  <!-- p<div class="todo">{toDo.title}</div> -->
</ToDoList>
