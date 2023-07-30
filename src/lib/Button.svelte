<script>
    import { v4 as uuid } from "uuid";
    import { createEventDispatcher } from "svelte";
    export let toDos = null;
    export let isLoading = false;
    export let error = null;
   
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
      console.log('Inside Handle ToDo Definition')
      console.log(inp)
      dispatch("AddTodo", { inp });
    }
  </script>
  
  
  {#if isLoading}
    <p>Loading......</p>
  {:else if error }
  <p>{error}</p>
  {:else if toDos }
    
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
      console.log(inp)
    }}>Add</button
  >
  {/if}