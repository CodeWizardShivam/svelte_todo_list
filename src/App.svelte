<script>
  import Button from "./lib/Button.svelte";
  import IoIosAirplane from "svelte-icons/io/IoIosAirplane.svelte";
  import ToDoList from "./lib/ToDoList.svelte";
  import { v4 as uuid } from "uuid";
 
  let toDos = [
    {
      id: uuid(),//hi this is shivam
      title: "Todo 1",//hi this is shivam
      Completed: true,//hi this is shivam
    },
    {
      id: uuid(),
      title: "Todo 2",
      Completed: true,
    },
    {
      id: uuid(),
      title: "Todo 3",
      Completed: false,
    },
    {
      id: uuid(),
      title: "Todo 4",
      Completed: true,
    },
  ];
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

<ToDoList
  {toDos}
  on:RemoveTodo={handleRemoveTodo}
  on:ToggleTodo={handleToggleTodo}
  on:AddTodo={handleAddTodo}
/>
