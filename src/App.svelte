<script>
  // @ts-nocheck

  import Button from "./lib/Button.svelte";
  import IoIosAirplane from "svelte-icons/io/IoIosAirplane.svelte";
  import ToDoList from "./lib/ToDoList.svelte";
  import { v4 as uuid } from "uuid";
  import { onMount } from "svelte";

  let toDos = null;

  onMount(() => {
    loadTodos();
  });

  function loadTodos() {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=10").then(async (response) => {
      if (response.ok) {
        console.log("Inside if");
        toDos = await response.json();
        // console.table(response.json());
      } else {
        console.log("Inside else");
        throw new Error("Error");
      }
    });
  }

  function handleRemoveTodo(event) {
    toDos = toDos.filter((t) => t.id != event.detail.id);
    console.table(toDos);
  }
  function handleToggleTodo(event) {
    console.table(toDos);
    toDos = toDos.map((todo) => {
      if (todo.id === event.detail.id) {
        return { ...todo, completed: event.detail.value };
      }
      return { ...todo };
    });
  }
  function handleAddTodo(event) {
    toDos.push({ id: uuid(), title: event.detail.inp, Completed: false });
    toDos = toDos;
    console.table(toDos);
  }
</script>

<ToDoList
  {toDos}
  on:RemoveTodo={handleRemoveTodo}
  on:ToggleTodo={handleToggleTodo}
  on:AddTodo={handleAddTodo}
/>
