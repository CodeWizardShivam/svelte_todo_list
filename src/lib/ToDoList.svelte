<script>
  import { v4 as uuid } from "uuid";
  import { createEventDispatcher } from "svelte";
  export let toDos = [];
  let inp;
  let checked;

  const dispatch = createEventDispatcher();
  console.table(toDos);

  function handleRemove(id) {
    console.log("In handleRemove:" + id);
    dispatch("RemoveTodo", { id });
  }

  function handleToggleTodo(id, completed) {
    dispatch("ToggleTodo", { id, completed });
  }
  function handleAddTodo(inp) {
    dispatch("AddTodo", { inp });
  }
</script>

<ul>
  {#each toDos as toDo}
    <li>
      <label>
        <input
          on:input={(event) => {
            event.currentTarget.checked = toDo.completed;
            console.log(toDo);
            handleToggleTodo(toDo.id, !toDo.completed);
          }}
          checked={toDo.completed}
          type="checkbox"
        />
        {toDo.title}
       
        <button on:click={() => handleRemove(toDo.id)}>Remove</button>
      </label>
    </li>
  {/each}
</ul>

<form action=""><input bind:value={inp} /></form>
<button
  on:click={() => {
    handleAddTodo(inp);
  }}>Add</button
>
