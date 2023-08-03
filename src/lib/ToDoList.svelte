<script>
  import { createEventDispatcher } from "svelte";
  export let toDos = null;
  export let error = null;
  export let isLoading = null;
  let inp;
  let checked;

  const dispatch = createEventDispatcher();
  console.table(toDos);

  function handleRemove(id) {
    console.log("In handleRemove:" + id);
    dispatch("RemoveTodo", { id });
  }

  function handleToggleTodo(id, completed) {
    console.log("In handleToggleTodo:" + id);

    dispatch("ToggleTodo", { id, completed });
  }
  function handleAddTodo() {
    dispatch("AddTodo", { inp });
  }
</script>

{#if isLoading}
  <p class="state-text">Loading...</p>
{:else if error}
  <p class="state-text">{error}</p>
{:else if toDos}
  <ul>
    {#each toDos as toDo}
      <li>
        <slot {toDo}>
        <label>
          <input
            on:input={(event) => {
              event.currentTarget.checked = toDo.completed;
              handleToggleTodo(toDo.id, !toDo.completed);
            }}
            type="checkbox"
            checked={toDo.completed}
          />
          {toDo.title}

          <button on:click={() => handleRemove(toDo.id)}>Remove</button>
        </label>
      </slot>
      </li>
   
    {/each}
  </ul>
{/if}

<form action="" on:submit|preventDefault={handleAddTodo}>
  <input bind:value={inp} />
</form>
<button
  on:click={() => {
    handleAddTodo();
  }}>Add</button
>
