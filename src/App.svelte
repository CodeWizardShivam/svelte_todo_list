<script>
// @ts-nocheck

  import Button from "./lib/Button.svelte";
  import IoIosAirplane from "svelte-icons/io/IoIosAirplane.svelte";
  import ToDoList from "./lib/ToDoList.svelte";
  import { v4 as uuid } from "uuid";

  let toDos = null;

  function loadTodos() {
    return fetch("https://jsonplaceholder.typicode.com/todos").then((response) => {
      if(response.ok){
        console.log('Inside if');
        return response.json();
  // console.table(response.json());
       
      }
      else{
        console.log('Inside else');
        throw new Error('Error');
      }
    });
  }

  function handleRemoveTodo(event) {
    toDos = toDos.filter((t) => t.id != event.detail.id);
    console.table(toDos);
  }
  function handleToggleTodo(event) {
    toDos = toDos.map((t) => {
      if (t.id == event.detail.id) {
        return { ...t, Completed: event.detail.Completed };
      } else return { ...t };
    });
    console.table(toDos);
  }
  function handleAddTodo(event) {
    toDos.push({ id: uuid(), title: event.detail.inp, Completed: false });
    toDos = toDos;
    console.table(toDos);
  }
</script>
{#await loadTodos() then toDos}
<ToDoList
  {toDos}
  on:RemoveTodo={handleRemoveTodo}
  on:ToggleTodo={handleToggleTodo}
  on:AddTodo={handleAddTodo}
/>
{/await}
